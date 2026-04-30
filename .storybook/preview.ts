

import { setup } from '@storybook/vue3';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import 'vuetify/styles';
import '../app/assets/styles/layers.css';
import '../app/assets/styles/tailwind.css';
import StoryWrapper from './StoryWrapper.vue';

const vuetify = createVuetify({
  components,
  directives,
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