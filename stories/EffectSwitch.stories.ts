import type { Meta, StoryObj } from '@storybook/vue3'
import EffectSwitch from '../app/components/Player/EffectSwitch.vue'

const meta: Meta<typeof EffectSwitch> = {
  title: 'Player/EffectSwitch',
  component: EffectSwitch,
  argTypes: {
    modelValue: { control: 'boolean', description: 'ON/OFF状態' },
    onSrc: { control: 'text', description: 'ON時の画像パス' },
    offSrc: { control: 'text', description: 'OFF時の画像パス' },
  },
}
export default meta

type Story = StoryObj<typeof EffectSwitch>

export const Default: Story = {
  args: {
    modelValue: true,
    onSrc: undefined,
    offSrc: undefined,
  },
}
