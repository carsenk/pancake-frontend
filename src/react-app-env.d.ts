/// <reference types="react-scripts" />

import { Web3Provider } from '@ethersproject/providers'

declare module 'jazzicon' {
  export default function (diameter: number, seed: number): HTMLElement
}

declare module 'fortmatic'

declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: true
      on?: (...args: any[]) => void
      removeListener?: (...args: any[]) => void
    }
    web3?: any
    BinanceChain?: BinanceChain
    library: Web3Provider
    account: string | null
    chainId: number
  }
}

declare module 'content-hash' {
  declare function decode(x: string): string
  declare function getCodec(x: string): string
}

declare module 'multihashes' {
  declare function decode(buff: Uint8Array): { code: number; name: string; length: number; digest: Uint8Array }
  declare function toB58String(hash: Uint8Array): string
}

interface BinanceChain {
  send: unknown
  enable: () => Promise<string[]>
  on?: (method: string, listener: (...args: any[]) => void) => void
  removeListener?: (method: string, listener: (...args: any[]) => void) => void
}
