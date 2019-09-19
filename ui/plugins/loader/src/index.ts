import { i18n as i18nType } from 'i18next';
import pino from 'pino';
import * as singleSpa from 'single-spa';
import fourOhFour from './404';
import TranslationManager from './i18n';
import { setPageTitle } from './setPageMetadata';

export interface II18nConfig {
  use: any[];
  loadNS?: string[];
  ns?: string;
}

export interface IPlugin {
  name: string;
  services: any[];
  i18nConfig: II18nConfig;
  loadingFn: () => Promise<any>;
  activeWhen: {
    exact?: boolean;
    path: string;
  };
  title?: string;
}

export interface IWidget {
  name: string;
  loadingFn: () => Promise<any>;
}

export interface IPluginConfig {
  activeWhen?: {
    exact?: boolean;
    path: string;
  };
  title?: string;
}

export interface ILoaderConfig {
  rootNodeId: string;
}

interface IWidgetInfo {
  widget: IWidget;
  sdkModules: any[];
}

export default class AppLoader {
  public config: ILoaderConfig;
  public plugins: IPlugin[];
  public rootWidgets: Map<string, IWidgetInfo>;
  private appLogger;
  private translationManager;
  constructor(config: ILoaderConfig) {
    this.config = config;
    this.plugins = [];
    this.appLogger = pino({ browser: { asObject: true } });
    this.translationManager = new TranslationManager(this.appLogger);
    this.rootWidgets = new Map();
  }

  public async registerPlugin(
    plugin: IPlugin,
    pluginConfig: IPluginConfig,
    sdkModules?: any[],
  ): Promise<void> {
    if (this._validatePlugin(plugin)) {
      if (pluginConfig && pluginConfig.activeWhen && pluginConfig.activeWhen.path) {
        plugin.activeWhen = pluginConfig.activeWhen;
      }
      if (pluginConfig && pluginConfig.title) {
        plugin.title = pluginConfig.title;
      }
      this.plugins.push(plugin);
      const pluginId = plugin.name.toLowerCase().replace(' ', '-');
      const domEl = await this.createRootNodes(pluginId);
      const i18nInstance: i18nType = this.translationManager.createInstance(plugin);
      try {
        singleSpa.registerApplication(
          plugin.name,
          this.beforeLoading(plugin.loadingFn, plugin),
          // plugin.loadingFn,
          (location: Location): boolean => {
            return this._pathPrefix(location, plugin.activeWhen);
          },
          {
            ...this.config,
            ...pluginConfig,
            domElement: domEl,
            i18n: i18nInstance,
            i18nConfig: plugin.i18nConfig,
            logger: this.appLogger.child({ plugin: pluginId }),
            sdkModules: sdkModules ? Object.fromEntries(sdkModules) : [],
          },
        );
        this.appLogger.info(`[@akashaproject/ui-plugin-loader]: ${plugin.name} registered!`);
      } catch (ex) {
        this.appLogger.error('Error registering plugin:', plugin.name, 'error:', ex);
        throw new Error(ex.message);
      }
    } else {
      throw new Error(`[@akashaproject/ui-plugin-loader]: Plugin ${plugin.name} is not valid`);
    }
  }

  public async registerWidget(widget: IWidget, sdkModules: any[]) {
    this.appLogger.info(`[@akashaproject/ui-plugin-loader] registering widget ${widget.name}`);
    this.rootWidgets.set(widget.name, { widget, sdkModules });
  }

  public async loadRootWidgets() {
    const promises = Array.from(this.rootWidgets.values()).map(async widgetInfo => {
      const { widget } = widgetInfo;
      const domEl = await this.createRootNodes(widget.name);
      const i18nInstance = await this.translationManager.createInstance(widget);
      try {
        singleSpa.mountRootParcel(this.beforeLoading(widget.loadingFn, widget), {
          ...this.config,
          ...widgetInfo.widget,
          domElement: domEl,
          i18n: i18nInstance,
        });
        return Promise.resolve();
      } catch (ex) {
        return Promise.reject(
          `[AppLoader] cannot load widget ${widgetInfo.widget.name}: ${ex.message}`,
        );
      }
    });
    return Promise.all(promises);
  }

  public start() {
    this.appLogger.info('[@akashaproject/ui-plugin-loader]: starting single spa');
    this._registerSpaListeners();
    this.loadRootWidgets()
      .then(() => {
        singleSpa.start();
      })
      .catch(err => {
        this.appLogger.error(err.message);
        throw new Error(err.message);
      });
  }

  public getPluginsForLocation(location: Location) {
    return singleSpa.checkActivityFunctions(location);
  }

  public getRegisteredPlugins() {
    return this.plugins;
  }

  protected _onFirstMount() {
    const mountTimeEnd = performance.now();
    this.appLogger.info(
      '[AppLoader]: took',
      // @ts-ignore
      (mountTimeEnd - mountTimeStart) / 1000,
      'seconds to load plugins:',
      this.getPluginsForLocation(window.location),
    );
  }

  protected _beforeRouting() {
    const plugins = this.getPluginsForLocation(window.location);
    if (!plugins.length) {
      const rootEl = document.getElementById(this.config.rootNodeId);
      const FourOhFourString: string = fourOhFour(
        this.plugins.reduce((prev, curr): IPlugin[] => {
          prev.push({ title: curr.title, activeWhen: curr.activeWhen });
          return prev;
        }, []),
      );
      if (rootEl) {
        rootEl.innerHTML = FourOhFourString;
      }
    } else {
      setPageTitle(
        this.plugins.filter(
          plugin =>
            this.getPluginsForLocation(window.location).includes(plugin.name) && plugin.title,
        ),
      );
    }
  }

  protected _registerSpaListeners() {
    window.addEventListener('single-spa:first-mount', this._onFirstMount.bind(this));
    window.addEventListener('single-spa:before-routing-event', this._beforeRouting.bind(this));
  }

  protected _pathPrefix(location: Location, activeWhen: IPluginConfig['activeWhen']) {
    if (activeWhen && activeWhen.exact) {
      return location.pathname === activeWhen.path;
    }
    return location.pathname.startsWith(`${activeWhen.path}`);
  }

  protected _validatePlugin(plugin: IPlugin): boolean {
    if (Array.isArray(plugin.services)) {
      // check services and return false if they are not ok
      return true;
    }
    return true;
  }

  private async createRootNodes(name: string) {
    let domEl = document.getElementById(`${name}`);
    const rootEl = document.getElementById(this.config.rootNodeId);
    if (!domEl && rootEl) {
      domEl = document.createElement('div');
      domEl.id = name;
      domEl.style.display = 'flex';
      domEl.style.flexDirection = 'column';
      rootEl.appendChild(domEl);
    }
    return Promise.resolve(domEl);
  }

  private beforeLoading(
    loadingFn: { (): Promise<any>; (): void },
    plugin: IPlugin | IWidget,
  ): () => Promise<any> {
    return () => {
      return this.translationManager.initI18nFor(plugin).then(() => loadingFn());
    };
  }
}