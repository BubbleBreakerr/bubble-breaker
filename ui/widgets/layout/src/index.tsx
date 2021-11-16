import {
  LayoutConfig,
  IntegrationRegistrationOptions,
} from '@akashaproject/ui-awf-typings/lib/app-loader';

export const register: (props: IntegrationRegistrationOptions) => LayoutConfig = props => {
  return {
    loadingFn: () => import('./components'),
    title: props.worldConfig.title,
    name: 'ui-widget-layout',
    pluginSlotId: 'plugin-slot',
    topbarSlotId: 'topbar-slot',
    sidebarSlotId: 'sidebar-slot',
    focusedPluginSlotId: 'focused-plugin-slot',
    rootWidgetSlotId: 'root-widget-slot',
    widgetSlotId: 'widget-slot',
    modalSlotId: 'modal-slot',
    mountsIn: 'root',
  };
};
