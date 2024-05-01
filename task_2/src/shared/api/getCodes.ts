import type { AxiosResponse } from 'axios'
import type { ICodesResponse } from './types/codes.response.interface'
import { API } from './base'

export const getCodes = async (): Promise<AxiosResponse<ICodesResponse>> => {
  return await API({
    url: '/codes',
    method: 'GET',
  })
}
