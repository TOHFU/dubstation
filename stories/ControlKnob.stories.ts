import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import ControlKnob from '../app/components/Player/ControlKnob.vue';

const meta: Meta<typeof ControlKnob> = {
  title: 'Player/ControlKnob',
  component: ControlKnob,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'ラベル' },
    min: { control: 'number', description: '最小値' },
    max: { control: 'number', description: '最大値' },
    step: { control: 'number', description: 'ステップ' },
    modelValue: { control: 'number', description: '値' },
    size: {
      control: { type: 'radio' },
      options: ['large', 'medium'],
      description: 'ノブのサイズ',
    },
  },
  args: {
    label: 'ボリューム',
    min: 0,
    max: 100,
    step: 1,
    modelValue: 50,
    size: 'large',
  }
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => ({
    components: { ControlKnob },
    setup() {
      const value = ref(args.modelValue)
      return { args, value }
    },
    template: `<ControlKnob v-bind="args" v-model="value" />`
  }),
};
