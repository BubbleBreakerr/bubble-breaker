import React from 'react';

import Sidebar, { ISidebarProps } from '.';
import { sidebarItems } from '../../utils/dummy-data';

export default {
  title: 'Sidebar/Sidebar',
  component: Sidebar,
};

const Template = (args: ISidebarProps) => (
  <div style={{ width: '25%' }}>
    <Sidebar {...args} />
  </div>
);

export const BaseSidebar = Template.bind({});

BaseSidebar.args = {
  guestTitle: 'Guest',
  guestSubtitle: 'Connect to see exclusive member only features.',
  ctaText: 'Add magic to your world by installing cool apps developed by the community',
  ctaButtonLabel: 'Check them out!',
  footerLabel: 'Get in Touch',
  listItems: sidebarItems,
  footerIcons: [
    { name: 'Github', link: '' },
    { name: 'Discord', link: '' },
    { name: 'Telegram', link: '' },
    { name: 'Twitter', link: '' },
  ],
};