import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import VerticalEqSlider from '../app/components/Player/VerticalEqSlider.vue';

const meta: Meta<typeof VerticalEqSlider> = {
  title: 'Player/VerticalEqSlider',
  component: VerticalEqSlider,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'ラベル' },
    min: { control: 'number', description: '最小値' },
    max: { control: 'number', description: '最大値' },
    step: { control: 'number', description: 'ステップ' },
    modelValue: { control: 'number', description: '値' },
  },
  args: {
    label: 'LOW',
    min: 0,
    max: 100,
    step: 1,
    modelValue: 50,
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => ({
    components: { VerticalEqSlider },
    setup() {
      const value = ref(args.modelValue)
      return { args, value }
    },
    template: `<VerticalEqSlider v-bind="args" v-model="value" />`
  }),
};
