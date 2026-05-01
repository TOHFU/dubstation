import type { Meta, StoryObj } from '@storybook/vue3'
import IndexPage from '../app/pages/index.vue'

const meta: Meta<typeof IndexPage> = {
  title: 'Pages/Index',
  component: IndexPage,
  tags: ['autodocs'],
  argTypes: {
    loading: { control: 'boolean' },
    error: { control: 'boolean' },
  },
  args: {
    loading: false,
    error: false,
  },
}

export default meta
type Story = StoryObj<typeof IndexPage>

export const Default: Story = {}

export const Loading: Story = {
  args: {
    loading: true,
    error: false,
  },
}

export const Error: Story = {
  args: {
    loading: false,
    error: true,
  },
}
