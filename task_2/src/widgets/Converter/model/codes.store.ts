import { AxiosError } from 'axios'
import { writable } from 'svelte/store'
import { getCodes } from '../../../shared/api'

export const codes = writable<string[]>()

export const fetchGetCodes = async (): Promise<void> => {
  try {
    const { data } = await getCodes()

    if (data) {
      const formatted = data.supported_codes.map((codes) => {
        return `${codes[0]} (${codes[1]})`
      })

      codes.set(formatted)
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error.message)
    }
  }
}
