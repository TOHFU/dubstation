import '../app/assets/styles/main.scss';


import { setup } from '@storybook/vue3';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import 'vuetify/styles';
import '../app/assets/styles/layers.css';
import '../app/assets/styles/tailwind.css';
import StoryWrapper from './StoryWrapper.vue';

// Google FontsをStorybookプレビューに追加
if (typeof window !== 'undefined') {
  const id = 'dubstation-google-fonts';
  if (!document.getElementById(id)) {
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Quicksand:wght@400;700&family=Noto+Sans+JP:wght@400;700&display=swap';
    document.head.appendChild(link);
  }
}


import { dubStationTheme } from '../app/theme/vuetify.theme';
const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'dubStationTheme',
    themes: {
      dubStationTheme,
    },
  },
});
setup((app) => {
  app.use(vuetify);
});

const preview = {
  decorators: [
    () => ({
      components: { StoryWrapper },
      template: '<StoryWrapper><story /></StoryWrapper>',
    }),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
};

export default preview;