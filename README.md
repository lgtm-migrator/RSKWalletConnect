# RSK Wallet Connect

This is a demo of how to correctly use Wallet Connect with RSK networks (mainnet or testnet)

Features:
- Use RSK Mainnet or Testnet
- Use multuple accounts
- Connect to WalletConnect using public bridge
- Sign JWTs when `eth_sign` is requested

> App reponse in form of JWT does not respect `eth_sign` standard

The app has most of the flows explained with comments over the code. The flows that were not implemented yet are also explained.

To test the app, it is recommended to use a dApp that already supports WalletConnect. [WalletConnect example app](https://example.walletconnect.org/) is a good way to start testing.

For more information and help do not hesitate to contact us. Please post an issue on this repo.

## Run the wallet

1. Setup React Native for Android - https://reactnative.dev/docs/environment-setup
2. Setup device for USB or WiFi debugging (necessary, because this uses QR codes :)) - https://reactnative.dev/docs/running-on-device
3. Install deps

  ```
  yarn
  ```

4. Run app (ensure you are using USB/WiFi bridge)

  ```
  yarn android
  ```

5. Enjoy!
