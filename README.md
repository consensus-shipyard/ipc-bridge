## IPC Example Bridge Web App

**‼️ All the modules in the IPC stack (including the contracts) haven't been audited, tested in depth, or otherwise verified. Moreover, the system is missing critical recovery functionality in case of crashes. There are multiple ways in which you may lose funds moved into an IPC subnet, and we strongly advise against deploying IPC on mainnet and/or using it with tokens with real value.**


## Development 🛠️

```bash
npm run dev
# or
yarn dev
```


## Setup

Get a wallet connect project id from https://cloud.walletconnect.com

create `packages/app/.env` with the value from wallet connect


```
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=
```


create a token on  https://testnet.interchain.axelar.dev/polygon that will serve as the test ERC20 token.

Bridge the token using axelar to filecoin calibration.
                                                                                                                         
                                                                                                                         
                                                                                                                         
# Nexth

A Next.js + Ethereum starter kit to quickly ship Web3 Apps ⚡

## Features ✅

- [Next.js](https://nextjs.org/docs)
- [viem](https://viem.sh/)
- [wagmi](https://wagmi.sh/)
- [Web3Modal from WalletConnect](https://docs.walletconnect.com/)
- [Sign-In with Ethereum](https://www.login.xyz/)
- [Hardhat](https://hardhat.org/)
- [DaisyUI](https://chakra-ui.com/)

## Developer Experience 🧰

- [TypeScript](https://www.typescriptlang.org/)
- [eslint](https://eslint.org/)
- [prettier](https://prettier.io/)
- [Husky](https://typicode.github.io/husky/)
