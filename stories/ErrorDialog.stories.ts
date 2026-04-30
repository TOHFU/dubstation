import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import ErrorDialog from '../app/components/Common/ErrorDialog.vue';

const meta: Meta<typeof ErrorDialog> = {
  title: 'Common/ErrorDialog',
  component: ErrorDialog,
  tags: ['autodocs'],
  argTypes: {
    'v-model': { control: 'boolean', description: '表示状態' },
    title: { table: { disable: true }, description: 'タイトル（固定）' },
    message: { table: { disable: true }, description: 'メッセージ（固定）' },
    hint: { table: { disable: true }, description: 'ヒント（固定）' },
  },
  args: {
    'v-model': true,
  }
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => ({
    components: { ErrorDialog },
    setup() {
      const show = ref(args['v-model']);
      return { args, show };
    },
    template: `<ErrorDialog v-model="show" />`
  }),
};
