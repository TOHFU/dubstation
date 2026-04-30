import type { Meta, StoryObj } from '@storybook/vue3';
import StationList from '../app/components/Station/StationList.vue';

const meta: Meta<typeof StationList> = {
  title: 'Station/StationList',
  component: StationList,
  tags: ['autodocs'],
  argTypes: {
    stations: { control: 'object', description: 'ラジオ局リスト' },
    selectedStationId: { control: 'text', description: '選択中のstation id' },
  },
  args: {
    stations: [
      { id: '1', name: 'Dub London', about: 'The urban sound of UK dub and jungle influences.' },
      { id: '2', name: 'Roots FM', about: 'Classic roots reggae and dub.' },
      { id: '3', name: 'Kingston Vibes', about: 'Jamaican classics and new school.' },
    ],
    selectedStationId: '1',
  }
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => ({
    components: { StationList },
    setup: () => ({ args }),
    template: `<StationList v-bind="args" />`
  }),
};
