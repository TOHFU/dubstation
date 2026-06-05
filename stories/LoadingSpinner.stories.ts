import type { Meta, StoryObj } from '@storybook/vue3';
import LoadingSpinner from '../app/components/Common/LoadingSpinner.vue';

const meta: Meta<typeof LoadingSpinner> = {
  title: 'Common/LoadingSpinner',
  component: LoadingSpinner,
  tags: ['autodocs'],
  // propsは不要のためcontrolを削除
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => ({
    components: { LoadingSpinner },
    setup: () => ({ args }),
    template: `<LoadingSpinner v-bind="args">{{ args.default }}</LoadingSpinner>`
  }),
};
