export type Station = {
  id: string
  name: string
  about: string
  streamUrl: string
  streamType: 'hls' | 'mp3'
}

export const STATIONS: Station[] = [
  {
    id: 'somafm-heavyweight-reggae',
    name: 'SomaFM: Heavyweight Reggae',
    about: 'ダブ/ステッパーズ寄りのレゲエを配信するラジオステーション。',
    streamUrl: 'https://ice1.somafm.com/reggae-128-mp3',
    streamType: 'mp3',
  },
  {
    id: 'fip-reggae',
    name: 'Radio FIP Reggae',
    about: '高音質のルーツ/レゲエ系プログラムを配信するラジオステーション。',
    streamUrl: 'https://stream.radiofrance.fr/fipreggae/fipreggae.m3u8',
    streamType: 'hls',
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
]
