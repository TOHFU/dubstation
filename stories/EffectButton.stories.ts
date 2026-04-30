import type { Meta, StoryObj } from '@storybook/vue3';
import EffectButton from '../app/components/Player/EffectButton.vue';

const meta: Meta<typeof EffectButton> = {
  title: 'Player/EffectButton',
  component: EffectButton,
  tags: ['autodocs'],
  argTypes: {
    default: { control: 'text', description: 'ボタンラベル（スロット）' },
    color: {
      control: { type: 'select' },
      options: ['siren', 'beam1', 'beam2'],
      description: 'ボタンの色バリエーション（赤: siren, 黄: beam1, 緑: beam2）',
      table: { category: 'Props' }
    },
  },
  args: {
    default: 'サイレン',
    color: 'siren',
  }
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => ({
    components: { EffectButton },
    setup: () => ({ args }),
    template: `<EffectButton v-bind="args">{{ args.default }}</EffectButton>`
  }),
};
