import { hdLedger } from "@polkadot/util-crypto"
import { Keypair } from "@polkadot/util-crypto/types"
import { useState } from "react"
import { useDebounce } from "react-use"
import { DEFAULT_MNEMONIC, LEDGER_NETWORKS } from "../util/constants"

export const useLedgerKeypair = () => {
  const [mnemonic, setMnemonic] = useState(DEFAULT_MNEMONIC)
  const [networkId, setNetworkId] = useState(LEDGER_NETWORKS[0].network)
  const [accountIndex, setAccountIndex] = useState(0)
  const [addressIndex, setAddressIndex] = useState(0)
  const [error, setError] = useState<string>()

  const [pair, setPair] = useState<Keypair>()

  useDebounce(
    () => {
      try {
        setError(undefined)
        const network = LEDGER_NETWORKS.find((n) => n.network === networkId)
        setPair(
          hdLedger(mnemonic, `m/44'/${network?.slip44}'/${accountIndex}'/0'/${addressIndex}'`)
        )
      } catch (err) {
        console.error(err)
        setError((err as Error).message)
        setPair(undefined)
      }
    },
    250,
    [mnemonic, networkId, accountIndex, addressIndex]
  )

  return {
    mnemonic,
    setMnemonic,
    networkId,
    setNetworkId,
    accountIndex,
    setAccountIndex,
    addressIndex,
    setAddressIndex,
    error,
    pair,
  }
}
