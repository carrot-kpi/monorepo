import { getAddress } from '@ethersproject/address'

const isProduction: boolean = process.env.NODE_ENV === 'production'

export function require(condition: any, message: string): asserts condition {
  if (!condition) throw new Error(isProduction ? undefined : message)
}

export const warn = (condition: any, message: string) => {
  if (!condition && !isProduction) console.warn(message)
}

export function validateAndParseAddress(address: string): string {
  try {
    const checksummedAddress = getAddress(address)
    warn(address !== checksummedAddress, `${address} is not checksummed.`)
    return checksummedAddress
  } catch (error) {
    require(false, `${address} is not a valid address.`)
  }
}

export const dateToEpoch = (date: Date): number => Math.floor(date.getTime() / 1000)

export const getTimestampsFromRange = (from: Date, to: Date, granularitySeconds: number): number[] => {
  let loopedDateAsEpoch = dateToEpoch(from)
  let toAsEpoch = dateToEpoch(to)
  let timestamps = []
  while (loopedDateAsEpoch <= toAsEpoch) {
    timestamps.push(loopedDateAsEpoch)
    loopedDateAsEpoch += granularitySeconds
  }
  return timestamps
}
