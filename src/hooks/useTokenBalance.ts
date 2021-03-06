import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { getTokenBalance } from 'utils/erc20'
import useRefresh from './useRefresh'
import { useCakeContract } from './useContract'

const useTokenBalance = (tokenAddress: string) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account, library: ethereum } = useWeb3React()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const res = await getTokenBalance(ethereum, tokenAddress, account)
      setBalance(new BigNumber(res.toString()))
    }

    if (account && ethereum) {
      fetchBalance()
    }
  }, [account, ethereum, tokenAddress, fastRefresh])

  return balance
}

export const useTotalSupply = () => {
  const { slowRefresh } = useRefresh()
  const [totalSupply, setTotalSupply] = useState<BigNumber>()
  const cakeContract = useCakeContract()

  useEffect(() => {
    async function fetchTotalSupply() {
      const supply = await cakeContract.totalSupply()
      setTotalSupply(new BigNumber(supply.toString()))
    }

    fetchTotalSupply()
  }, [slowRefresh, cakeContract])

  return totalSupply
}

export const useBurnedBalance = (tokenAddress: string) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account, library: ethereum } = useWeb3React()
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const res = await getTokenBalance(ethereum, tokenAddress, '0x000000000000000000000000000000000000dEaD')
      setBalance(new BigNumber(res.toString()))
    }

    if (account && ethereum) {
      fetchBalance()
    }
  }, [account, ethereum, tokenAddress, slowRefresh])

  return balance
}

export default useTokenBalance
