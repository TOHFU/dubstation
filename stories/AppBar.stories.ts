import type { Meta, StoryObj } from '@storybook/vue3';
import AppBar from '../app/components/Common/AppBar.vue';

const meta: Meta<typeof AppBar> = {
  title: 'Common/AppBar',
  component: AppBar,
  tags: ['autodocs'],
  argTypes: {
    default: { control: 'text', description: 'タイトルや内容（スロット）' },
  },
  args: {
    default: 'DUB STATION'
  }
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => ({
    components: { AppBar },
    setup: () => ({ args }),
    template: `<AppBar v-bind="args">{{ args.default }}</AppBar>`
  }),
};
