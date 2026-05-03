export type Station = {
  id: string
  name: string
  about: string
  streamUrl: string
  streamType: 'hls' | 'mp3'
}

export const STATIONS: Station[] = [
  {
    id: 'fip-reggae',
    name: 'Radio FIP Reggae',
    about: '高音質のルーツ/レゲエ系プログラムを配信するラジオステーション。',
    streamUrl: 'https://stream.radiofrance.fr/fipreggae/fipreggae.m3u8',
    streamType: 'hls',
  },
  {
    id: 'somafm-heavyweight-reggae',
    name: 'SomaFM: Heavyweight Reggae',
    about: 'ダブ/ステッパーズ寄りのレゲエを配信するラジオステーション。',
    streamUrl: 'https://ice1.somafm.com/reggae-128-mp3',
    streamType: 'mp3',
  },
  {
    id: 'npo-funx-reggae',
    name: 'NPO FunX Reggae',
    about: 'NPO FunXのレゲエチャンネルを配信するラジオステーション。',
    streamUrl: 'https://icecast.omroep.nl/funx-reggae-bb-mp3',
    streamType: 'mp3',
  },
  {
    id: 'nhk-fm-tokyo',
    name: 'NHK-FM (東京)',
    about: 'NHK-FM東京のラジオステーション。',
    streamUrl: 'https://simul.drdi.st.nhk/live/7/joined/master.m3u8',
    streamType: 'hls',
  },
  {
    id: 'shonan-beach-fm',
    name: 'Shonan Beach FM',
    about: '湘南エリアのコミュニティFMラジオステーション。',
    streamUrl: 'https://sbfm.ice.infomaniak.ch/sbfm-128.mp3',
    streamType: 'mp3',
  },
  {
    id: 'fm-karuizawa',
    name: 'FM Karuizawa',
    about: '軽井沢のコミュニティFMラジオステーション。',
    streamUrl: 'https://fm-karuizawa.hosting-radio.com/8120/stream',
    streamType: 'mp3',
  },
  {
    id: 'jp-radio-jpop',
    name: 'JP-Radio (J-Pop)',
    about: 'J-Popを配信するラジオステーション。',
    streamUrl: 'http://listen.shoutcast.com/j-pop-world',
    streamType: 'mp3',
  },
  {
    id: 'jpop-project-radio',
    name: 'J-Pop Project Radio',
    about: 'J-Popプロジェクトのラジオステーション。',
    streamUrl: 'http://91.121.134.23:8100/stream',
    streamType: 'mp3',
  },
]
