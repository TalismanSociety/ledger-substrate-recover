import { encodeAddress } from "@polkadot/util-crypto"
import { ExportPairButton } from "./components/ExportPairButton"
import { useLedgerKeypair } from "./hooks/useLedgerKeypair"
import { LEDGER_NETWORKS } from "./util/constants"

function App() {
  const {
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
  } = useLedgerKeypair()

  return (
    <div className="container mx-auto max-w-screen-sm space-y-8 py-8">
      <h1 className="text-center text-4xl font-bold text-white">Ledger account recovery tool</h1>
      <div>
        <p>
          This tool will allow you to export your ledger account as JSON so it can be imported in
          Talisman and used without any network constraint.
        </p>
        <p>Please use at your own risk, ideally on an air-gapped computer.</p>
        <p>
          After recovering your account, we recommend moving all your funds out of all accounts from
          this ledger, and reset the Ledger with a new mnemonic.
        </p>
      </div>
      <div className="space-y-4">
        <div>
          <div className="text-grey-300">AccountType</div>
          <select
            onChange={(e) => setNetworkId(e.target.value)}
            className="w-full rounded-lg bg-grey-800 p-2"
            defaultValue={networkId}
          >
            {LEDGER_NETWORKS.map((network) => (
              <option key={network.network} value={network.network}>
                {network.displayName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <div className="text-grey-300">Mnemonic (usually 25 words)</div>
          <textarea
            className="w-full rounded-lg bg-grey-800 p-2 placeholder:text-grey-600"
            placeholder="Enter the mnemonic of your ledger"
            rows={4}
            defaultValue={mnemonic}
            onChange={(e) => setMnemonic(e.target.value)}
          ></textarea>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <div className="text-grey-300">Account Index</div>
            <div>
              <input
                className="w-full rounded-lg bg-grey-800 p-2 placeholder:text-grey-600"
                type="number"
                step={1}
                min={0}
                defaultValue={accountIndex}
                onChange={(e) => setAccountIndex(e.target.valueAsNumber)}
              />
            </div>
          </div>
          <div>
            <div className="text-grey-300">Address Index</div>
            <div>
              <input
                className="w-full rounded-lg bg-grey-800 p-2 placeholder:text-grey-600"
                type="number"
                step={1}
                min={0}
                defaultValue={addressIndex}
                onChange={(e) => setAddressIndex(e.target.valueAsNumber)}
              />
            </div>
          </div>
        </div>
      </div>
      {error && <div className="text-alert-warn">{error}</div>}
      {!!pair && (
        <>
          <div>
            <p className="mb-2">Account addresses :</p>
            {LEDGER_NETWORKS.map((network) => (
              <div key={network.network} className="flex w-full justify-between">
                <div>{network.displayName}</div>
                <div className="font-mono">{encodeAddress(pair.publicKey, network.prefix)}</div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <ExportPairButton pair={pair} />
          </div>
        </>
      )}
    </div>
  )
}

export default App
