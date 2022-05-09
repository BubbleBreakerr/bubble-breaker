# My Apps widget

> Shows world apps and installed apps in the integration center.

## Usage

```tsx
const { default: startLoader } = await System.import('@akashaorg/ui-app-loader');

startLoader({
  defaultWidgets: [
    '@akashaorg/ui-widget-my-apps',
  ]
});

```