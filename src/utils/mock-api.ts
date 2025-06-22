export type TMockApi<T> = {
  data?: T
  error?: any
  duration?: number
}

export const MockApi = <T>({
  data,
  error,
  duration,
}: TMockApi<T>): Promise<T> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (error) reject({ response: { status: 500, data: error } })
      else if (data) resolve(data)
      else reject({ response: { status: 404 } })
    }, duration || 300)
  })
}
