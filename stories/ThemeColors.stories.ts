import ThemeColors from './ThemeColors.vue';

export default {
  title: 'Theme/Colors',
  component: ThemeColors,
  parameters: {
    docs: {
      description: {
        component: 'DubStationテーマのカラーパレット一覧です。'
      }
    }
  }
};

export const Colors = () => ({
  components: { ThemeColors },
  template: '<ThemeColors />',
});
