# Talisman - Ledger Substrate Recover tool

This tool can be used to export substrate accounts from a Ledger device using it's mnemonic.

Example use cases :

- Get crowdloan rewards for networks that don't support Ledger
- Recover funds that were sent accidentally to a ledger address on an incorrect network

## Disclaimer

This tool is provided as is, and is not affiliated with Ledger or Parity. Use at your own risk.

If the Ledger mnemonic is typed into a computer, that ledger's security should be considered compromised. After funds are recovered, we recommend reseting the ledger device with a new mnemonic. Make sure to empty all accounts before resetting the device.

## Usage

We recommend using the tool on an air-gapped computer, or at least a computer that is not connected to the internet.

- Download the offline tool from this link: [offline.html](https://github.com/TalismanSociety/ledger-substrate-recover/releases/latest/download/offline.html)
- Open the file in chrome
- Select the network for which the account has originally been created
- Type your mnemonic into the text area
- Select the appropriate account index and address index.
- Click the export button, and set a strong password to encrypt the json file
- Import the json file in Talisman, and recover the funds (send all tokens to another account)
