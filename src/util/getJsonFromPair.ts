import { Keyring } from "@polkadot/keyring"
import { Keypair } from "@polkadot/util-crypto/types"

export const getJsonFromPair = (pair: Keypair, password: string) => {
  const keyring = new Keyring({ type: "sr25519" })
  const acc = keyring.addFromPair(pair)
  return acc.toJson(password)
}
