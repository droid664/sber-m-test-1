import { AxiosError } from 'axios'
import { writable } from 'svelte/store'
import { getPairConversion, type IPairConversion } from '../../../shared/api'

export const pairData = writable<IPairConversion>()

export const fetchGetPairConversion = async (
  firstCurrency: string,
  secondCurrency: string,
): Promise<void> => {
  try {
    const { data } = await getPairConversion(firstCurrency, secondCurrency)

    if (data) {
      pairData.set(data)
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error.message)
    }
  }
}
