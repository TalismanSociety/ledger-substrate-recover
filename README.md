# Talisman - Ledger Substrate Recover tool

This tool can be used to export a substrate account from a Ledger device using it's mnemonic.

Example use cases :

- Get crowdloan rewards for networks that don't support Ledger
- Recover funds that were sent accidentally to a ledger address on an incorrect network

## Disclaimer

This tool is provided as is, and is not affiliated with Ledger or Parity. Use at your own risk.

If a Ledger mnemonic is typed into a computer, it should be considered compromised. This tool is provided as a convenience to recover funds from a Ledger device, but it is not recommended to use it for any other purpose.

The associated ledger device should be reset with a new mnemonic after funds are recovered.

## Usage

We recommend using the tool on an air-gapped computer, or at least a computer that is not connected to the internet.

- Download the offline tool here, provided as a standalone html file : [](./build/offline.html)
- Open the file in chrome
- Select the network for which the account has originally been created
- Type your mnemonic into the text area
- Select the appropriate account index and address index.
- Click the export button, and set a strong password to encrypt the json file
- Import the json file in Talisman, and recover the funds (send them to an uncompromise account)
