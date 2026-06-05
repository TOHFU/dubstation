import type { Meta, StoryObj } from '@storybook/vue3';
import SecondaryButton from '../app/components/Common/SecondaryButton.vue';

const meta: Meta<typeof SecondaryButton> = {
  title: 'Common/SecondaryButton',
  component: SecondaryButton,
  tags: ['autodocs'],
  argTypes: {
    block: { control: 'boolean', description: 'Block (full width)' },
    disabled: { control: 'boolean', description: 'Disabled' },
    default: { control: 'text', description: 'Button label (slot)' },
  },
  args: {
    block: false,
    disabled: false,
    default: 'Go Home'
  }
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => ({
    components: { SecondaryButton },
    setup: () => ({ args }),
    template: `<SecondaryButton v-bind="args">{{ args.default }}</SecondaryButton>`
  }),
};
