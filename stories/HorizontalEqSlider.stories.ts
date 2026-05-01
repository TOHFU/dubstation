import type { Meta, StoryObj } from '@storybook/vue3'
import HorizontalEqSlider from '../app/components/Player/HorizontalEqSlider.vue'

const meta: Meta<typeof HorizontalEqSlider> = {
  title: 'Player/HorizontalEqSlider',
  component: HorizontalEqSlider,
  argTypes: {
    modelValue: { control: 'number', description: '現在値' },
    min: { control: 'number', description: '最小値' },
    max: { control: 'number', description: '最大値' },
    step: { control: 'number', description: 'ステップ' },
  },
}
export default meta

type Story = StoryObj<typeof HorizontalEqSlider>

export const Default: Story = {
  args: {
    modelValue: 50,
    min: 0,
    max: 100,
    step: 1,
  },
}

