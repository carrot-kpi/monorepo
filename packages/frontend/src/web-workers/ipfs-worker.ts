import { create, IPFS } from 'ipfs-core'

let ipfs: IPFS | null = null

const fileToString = async (source: AsyncIterable<Uint8Array>) => {
  const contents: Uint8Array[] = []
  for await (const chunk of source) contents.push(chunk)
  if (contents.length !== 1) throw new Error('unexpected contents length')
  return new String(contents[0])
}

onmessage = async (event: MessageEvent) => {
  try {
    if (!!!ipfs) ipfs = await create()
    const stat = await ipfs.files.stat(
      '/ipfs/QmYZ89fiCjtDP3w4Am1XhTSmhTxzB4BnQnmtp8TeJp6vvj'
    )
    switch (stat.type) {
      case 'file': {
        console.log(
          await fileToString(
            ipfs.cat('/ipfs/QmYZ89fiCjtDP3w4Am1XhTSmhTxzB4BnQnmtp8TeJp6vvj')
          )
        )
      }
    }
  } catch (error) {
    console.error(error)
  }
}
