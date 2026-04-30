import ThemeTypography from './ThemeTypography.vue';

export default {
  title: 'Theme/Typography',
  component: ThemeTypography,
  parameters: {
    docs: {
      description: {
        component: 'DubStationテーマのタイポグラフィ見本です。'
      }
    }
  }
};

export const Typography = () => ({
  components: { ThemeTypography },
  template: '<ThemeTypography />',
});
