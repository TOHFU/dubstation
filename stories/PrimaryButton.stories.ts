import type { Meta, StoryObj } from '@storybook/vue3';
import PrimaryButton from '../app/components/Common/PrimaryButton.vue';

const meta: Meta<typeof PrimaryButton> = {
  title: 'Common/PrimaryButton',
  component: PrimaryButton,
  tags: ['autodocs'],
  argTypes: {
    block: { control: 'boolean', description: 'Block (full width)' },
    disabled: { control: 'boolean', description: 'Disabled' },
    default: { control: 'text', description: 'Button label (slot)' },
  },
  args: {
    block: false,
    disabled: false,
    default: 'Try Again'
  }
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => ({
    components: { PrimaryButton },
    setup: () => ({ args }),
    template: `<PrimaryButton v-bind="args">{{ args.default }}</PrimaryButton>`
  }),
};
