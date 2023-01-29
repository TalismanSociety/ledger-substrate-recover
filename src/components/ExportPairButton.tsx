import { Keypair } from "@polkadot/util-crypto/types"
import { FC, FormEventHandler, useCallback, useMemo, useState } from "react"
import { useOpenClose } from "../hooks/useOpenClose"
import { Modal } from "./Modal"
import { getJsonFromPair } from "../util/getJsonFromPair"
import clsx from "clsx"

type ExportPairProps = {
  pair: Keypair
}

const downloadJson = (json: unknown, name: string) => {
  const blob = new Blob([JSON.stringify(json)], { type: "text/json" })
  const link = document.createElement("a")

  link.download = `${name}.json`
  link.href = window.URL.createObjectURL(blob)
  link.dataset.downloadurl = ["text/json", link.download, link.href].join(":")

  const evt = new MouseEvent("click", {
    view: window,
    bubbles: true,
    cancelable: true,
  })

  link.dispatchEvent(evt)
  link.remove()
}

export const ExportPairButton: FC<ExportPairProps> = ({ pair }) => {
  const { isOpen, open, close } = useOpenClose()
  const [password, setPassword] = useState<string>()
  const [passwordConfirm, setPasswordConfirm] = useState<string>()
  const [error, setError] = useState<string>()

  const canExport = useMemo(() => {
    return password && password === passwordConfirm
  }, [password, passwordConfirm])

  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      try {
        e.preventDefault()
        if (!pair || !password || !canExport) return
        const json = getJsonFromPair(pair, password)
        console.log({ json })
        downloadJson(json, "account.json")

        close()
      } catch (err) {
        setError((err as Error).message)
      }
    },
    [pair, password, canExport, close]
  )

  return (
    <>
      <button
        className="h-16 w-[200px] rounded-xl bg-primary-500 text-xl text-black"
        onClick={open}
      >
        Export JSON
      </button>
      <Modal isOpen={isOpen} title="Export as JSON" onClose={close}>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <p>
            Input a strong password that will be used to protect the JSON file. We recommend a
            minimum of 12 characters to prevent the file from beeing hacked.
          </p>
          <div className="space-y-4">
            <input
              className={clsx(
                "w-full rounded-lg bg-grey-800 p-2 placeholder:text-grey-600",
                !password && "border border-alert-warn  "
              )}
              type="password"
              autoComplete="off"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter a password"
            />
            <input
              className={clsx(
                "w-full rounded-lg bg-grey-800 p-2 placeholder:text-grey-600",
                !!password &&
                  passwordConfirm !== password &&
                  "border border-alert-warn text-alert-warn "
              )}
              type="password"
              autoComplete="off"
              onChange={(e) => setPasswordConfirm(e.target.value)}
              placeholder="Confirm the password"
            />
          </div>
          <div className="h-8 text-alert-warn">{error}</div>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              className="h-16 rounded-xl border text-lg text-white"
              disabled={!pair.publicKey}
              onClick={close}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-16 rounded-xl bg-primary-500 text-lg text-black disabled:cursor-not-allowed disabled:opacity-50"
              disabled={!canExport}
            >
              Export JSON
            </button>
          </div>
        </form>
      </Modal>
    </>
  )
}
