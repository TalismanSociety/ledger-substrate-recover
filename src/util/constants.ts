import { allNetworks } from "@polkadot/networks"

export const LEDGER_NETWORKS = allNetworks.filter((n) => n.hasLedgerSupport)

export const DEFAULT_MNEMONIC =
  "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about"
