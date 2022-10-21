import { Web3Storage } from 'web3.storage'

export type DecentralizedStorage = 'ipfs'
export type DecentralizedStorageUploader = (content: string) => Promise<void>

const web3Storage = new Web3Storage({
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDNBNzU3RjVlNzUyRUE1M2IwYTE1QzA3MDJhODcyMTFjOUJGQTM5N0QiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NDE4NDI5NTIzOTEsIm5hbWUiOiJqb2x0LXByZXZpZXctYnVpbGRzIn0.GMPv4WC8q-CIyCRjkIgG2EV2DnmD10bXd7sZoMcEVrs',
})

const UPLOADER: Record<DecentralizedStorage, DecentralizedStorageUploader> = {
  ipfs: async (content: string) => {
    await web3Storage.put([new File([content], 'spec', { type: 'text/plain' })])
  },
}

export const useDecentralizedStorageUploader = (
  decentralizedStorage: DecentralizedStorage
): DecentralizedStorageUploader => {
  return UPLOADER[decentralizedStorage]
}
