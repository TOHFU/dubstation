import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import RadioDisplaySection from '../app/components/Player/RadioDisplaySection.vue';

const meta: Meta<typeof RadioDisplaySection> = {
  title: 'Player/RadioDisplaySection',
  component: RadioDisplaySection,
  tags: ['autodocs'],
  argTypes: {
    songName: { control: 'text', description: '曲名（SONG NAME）' },
    artistName: { control: 'text', description: 'アーティスト名（ARTIST NAME）' },
    stationName: { control: 'text', description: 'ステーション名（STATION NAME）' },
    modelValue: { control: 'number', description: 'ボリューム値' },
  },
  args: {
    songName: 'ROOTS REVIVAL',
    artistName: 'King Tubby & The Aggrovators',
    stationName: 'DUBBING MY WAY',
    modelValue: 50,
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => ({
    components: { RadioDisplaySection },
    setup() {
      const value = ref(args.modelValue)
      return { args, value }
    },
    template: `<RadioDisplaySection v-bind="args" v-model="value" />`
  }),
};
