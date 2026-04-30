import type { Meta, StoryObj } from '@storybook/vue3';
import Button from './Button.vue';

const meta: Meta<typeof Button> = {
  title: 'Example/DubStationThemeButton',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'ボタンのラベル' },
    primary: { control: 'boolean', description: 'プライマリボタン' },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'サイズ',
    },
    backgroundColor: { control: 'color', description: '背景色（任意）' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'DubStationテーマに沿ったボタンのサンプルです。Vuetifyテーマのカラーパレットやフォントを反映してください。',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    label: 'プライマリ',
    primary: true,
    size: 'medium',
  },
};

export const Secondary: Story = {
  args: {
    label: 'セカンダリ',
    primary: false,
    size: 'medium',
  },
};

export const Large: Story = {
  args: {
    label: 'ラージ',
    primary: true,
    size: 'large',
  },
};

export const Small: Story = {
  args: {
    label: 'スモール',
    primary: true,
    size: 'small',
  },
};
