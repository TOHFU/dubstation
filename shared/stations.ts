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
    about: '高音質のルーツ/レゲエ系プログラムを配信するHLSステーション。',
    streamUrl: 'https://stream.radiofrance.fr/fipreggae/fipreggae.m3u8',
    streamType: 'hls',
  },
  {
    id: 'somafm-heavyweight-reggae',
    name: 'SomaFM: Heavyweight Reggae',
    about: 'ダブ/ステッパーズ寄りのレゲエを配信するMP3ストリーム。',
    streamUrl: 'https://ice1.somafm.com/reggae-128-mp3',
    streamType: 'mp3',
  },
  {
    id: 'radio-art-roots-reggae',
    name: 'Radio Art: Roots Reggae',
    about: 'ルーツレゲエ中心のMP3ストリーム。',
    streamUrl: 'https://live.radioart.com/fRoots_reggae.mp3',
    streamType: 'mp3',
  },
  {
    id: 'npo-funx-reggae',
    name: 'NPO FunX Reggae',
    about: 'NPO FunXのレゲエチャンネルMP3ストリーム。',
    streamUrl: 'https://icecast.omroep.nl/funx-reggae-bb-mp3',
    streamType: 'mp3',
  },
]
