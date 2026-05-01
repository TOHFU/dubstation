import type { Meta, StoryObj } from '@storybook/vue3'
import { reactive, watch } from 'vue'
import EffectsPanel from '../app/components/Player/EffectsPanel.vue'

const meta: Meta<typeof EffectsPanel> = {
  title: 'Player/EffectsPanel',
  component: EffectsPanel,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text', description: 'セクションタイトル' },
    masterVolume: { control: 'number', description: 'マスター音量' },
    volumeMin: { control: 'number', description: '音量最小値' },
    volumeMax: { control: 'number', description: '音量最大値' },
    volumeStep: { control: 'number', description: '音量ステップ' },
    equalizerEnabled: { control: 'boolean', description: 'EQのON/OFF' },
    equalizerLow: { control: 'number', description: 'LOW値' },
    equalizerMid: { control: 'number', description: 'MID値' },
    equalizerHigh: { control: 'number', description: 'HIGH値' },
    eqMin: { control: 'number', description: 'EQ最小値' },
    eqMax: { control: 'number', description: 'EQ最大値' },
    eqStep: { control: 'number', description: 'EQステップ' },
    delayEnabled: { control: 'boolean', description: 'DelayのON/OFF' },
    delayAmount: { control: 'number', description: 'Delay値' },
    delayMin: { control: 'number', description: 'Delay最小値' },
    delayMax: { control: 'number', description: 'Delay最大値' },
    delayStep: { control: 'number', description: 'Delayステップ' },
    delayDisplay: { control: 'text', description: 'Delay表示文言' },
    reverbEnabled: { control: 'boolean', description: 'ReverbのON/OFF' },
    reverbAmount: { control: 'number', description: 'Reverb値' },
    reverbMin: { control: 'number', description: 'Reverb最小値' },
    reverbMax: { control: 'number', description: 'Reverb最大値' },
    reverbStep: { control: 'number', description: 'Reverbステップ' },
    reverbDisplay: { control: 'text', description: 'Reverb表示文言' },
  },
  args: {
    title: 'Echo Chamber',
    masterVolume: 82,
    volumeMin: 0,
    volumeMax: 100,
    volumeStep: 1,
    equalizerEnabled: true,
    equalizerLow: 72,
    equalizerMid: 46,
    equalizerHigh: 68,
    eqMin: 0,
    eqMax: 100,
    eqStep: 1,
    delayEnabled: false,
    delayAmount: 450,
    delayMin: 0,
    delayMax: 1000,
    delayStep: 10,
    delayDisplay: '450ms',
    reverbEnabled: true,
    reverbAmount: 80,
    reverbMin: 0,
    reverbMax: 100,
    reverbStep: 1,
    reverbDisplay: 'Deep',
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: args => ({
    components: { EffectsPanel },
    setup() {
      const state = reactive({ ...args })

      watch(
        () => args,
        nextArgs => {
          Object.assign(state, nextArgs)
        },
        { deep: true },
      )

      return { args, state }
    },
    template: `
      <div style="max-width: 390px; padding: 16px; background: #f6f2ec;">
        <EffectsPanel
          v-bind="args"
          :master-volume="state.masterVolume"
          :equalizer-enabled="state.equalizerEnabled"
          :equalizer-low="state.equalizerLow"
          :equalizer-mid="state.equalizerMid"
          :equalizer-high="state.equalizerHigh"
          :delay-enabled="state.delayEnabled"
          :delay-amount="state.delayAmount"
          :reverb-enabled="state.reverbEnabled"
          :reverb-amount="state.reverbAmount"
          @update:master-volume="state.masterVolume = $event"
          @update:equalizer-enabled="state.equalizerEnabled = $event"
          @update:equalizer-low="state.equalizerLow = $event"
          @update:equalizer-mid="state.equalizerMid = $event"
          @update:equalizer-high="state.equalizerHigh = $event"
          @update:delay-enabled="state.delayEnabled = $event"
          @update:delay-amount="state.delayAmount = $event"
          @update:reverb-enabled="state.reverbEnabled = $event"
          @update:reverb-amount="state.reverbAmount = $event"
        />
      </div>
    `,
  }),
}