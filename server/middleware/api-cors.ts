function isSameOriginRequest(event: Parameters<typeof defineEventHandler>[0] extends (event: infer E) => any ? E : never, origin: string): boolean {
  try {
    const requestUrl = getRequestURL(event)
    const originUrl = new URL(origin)

    return requestUrl.protocol === originUrl.protocol
      && requestUrl.host === originUrl.host
  }
  catch {
    return false
  }
}

export default defineEventHandler((event) => {
  const { pathname } = getRequestURL(event)
  if (!pathname.startsWith('/api/')) {
    return
  }

  const origin = getRequestHeader(event, 'origin')
  if (!origin) {
    return
  }

  if (!isSameOriginRequest(event, origin)) {
    throw createError({
      statusCode: 403,
      statusMessage: 'CORS origin denied',
    })
  }

  setResponseHeader(event, 'Access-Control-Allow-Origin', origin)
  setResponseHeader(event, 'Vary', 'Origin')
  setResponseHeader(event, 'Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS')

  const requestedHeaders = getRequestHeader(event, 'access-control-request-headers')
  if (requestedHeaders) {
    setResponseHeader(event, 'Access-Control-Allow-Headers', requestedHeaders)
  }

  if (getMethod(event) === 'OPTIONS') {
    setResponseStatus(event, 204)
    return ''
  }
})
