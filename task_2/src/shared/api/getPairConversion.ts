import type { AxiosResponse } from 'axios'
import type { IPairConversion } from './types/pairConversion.interface'
import { API } from './base'

export const getPairConversion = async (
  code1: string,
  code2: string,
): Promise<AxiosResponse<IPairConversion>> => {
  return await API({
    url: `pair/${code1}/${code2}`,
    method: 'GET',
  })
}
