import { apiUrl } from '../env.js'

export async function baseAPI({ endpoint, options = { auth: true }, method = 'GET', body }) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => {
    controller.abort()
  }, options.timeout || 10 * 1000) // デフォルトでは10秒でタイムアウト

  const res = await fetch(`${apiUrl}/${endpoint}`, {
    method,
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    signal: controller.signal,
    ...(body && { body: JSON.stringify(body) }),
  }).finally(() => clearTimeout(timeoutId))

  if (!res.ok) {
    let err
    try {
      err = await res.json()
    } catch {
      err = {
        statusCode: res.status,
        message: res.statusText,
      }
    }
    throw err
  }

  try {
    return await res.json()
  } catch {
    return {}
  }
}
