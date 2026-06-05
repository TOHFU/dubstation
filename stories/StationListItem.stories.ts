import type { Meta, StoryObj } from '@storybook/vue3';
import StationListItem from '../app/components/Station/StationListItem.vue';

const meta: Meta<typeof StationListItem> = {
  title: 'Station/StationListItem',
  component: StationListItem,
  tags: ['autodocs'],
  argTypes: {
    station: { control: 'object', description: 'ラジオ局情報' },
    selected: { control: 'boolean', description: '選択状態' },
  },
  args: {
    station: { id: '1', name: 'Dub London', about: 'The urban sound of UK dub and jungle influences.' },
    selected: false
  }
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => ({
    components: { StationListItem },
    setup: () => ({ args }),
    template: `<StationListItem v-bind="args" />`
  }),
};
