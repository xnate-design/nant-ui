import { defineConfig } from '@nant-design/cli';

export default defineConfig({
  title: 'Nant ui',
  description: 'nant react component d ui',
  themeConfig: {
    logo: '',
    nav: [
      { text: 'Guide', link: '/docs/intro', activeMatch: '/docs' },
      { text: 'Components', link: '/components/button', activeMatch: '/components' },
    ],

    sidebar: {
      '/docs': [
        {
          text: 'Guide',
          items: [
            {
              text: 'intro',
              link: '/docs/intro',
            },
            {
              text: 'start',
              link: '/docs/start',
            },
          ],
        },
      ],
      '/components': [
        {
          text: '基础组件',
          items: [
            {
              text: 'Button 按钮',
              link: '/components/button',
            },
          ],
        },
      ],
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],
  },
});
