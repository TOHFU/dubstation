import { STATIONS } from '~~/shared/stations'

export default defineEventHandler(() => {
  return STATIONS.map(({ id, name, about, streamType }) => ({
    id,
    name,
    about,
    streamType,
  }))
})
