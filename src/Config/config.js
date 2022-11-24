export const configVars = {
  rpcNetwork: {
    rpcUrl: "https://evm-t3.cronos.org/",
    chainId: 338,
    chainIdHex: "0x152",
    chainName: "Cronos Testnet",
    chainType: "mainnet",
    nativeCurrency: {
      name: "tCRO",
      symbol: "tCRO",
      decimals: 18,
    },
    blockExplorerUrl: "https://cronos.crypto.org/explorer/testnet3/",
  },
  rpcNetwork_mainnet: {
    rpcUrl: "https://evm.cronos.org/",
    chainId: 25,
    chainIdHex: "0x19",
    chainName: "Cronos Mainnet Beta",
    chainType: "mainnet",
    nativeCurrency: {
      name: "CRO",
      symbol: "CRO",
      decimals: 18,
    },
    blockExplorerUrl: "https://cronoscan.com/",
  },
};
// Mainnet config
// export const mainNetConfigVars = {
//   mode: "normal",
//   activateAutoLoginDefiWallet: false,
//   rpcNetwork: {
//     rpcUrl: "https://evm.cronos.org/",
//     chainId: 25,
//     chainIdHex: "0x19",
//     chainName: "Cronos Mainnet Beta",
//     chainType: "mainnet",
//     nativeCurrency: {
//       name: "CRO",
//       symbol: "CRO",
//       decimals: 18,
//     },
//     blockExplorerUrl: "https://cronoscan.com/",
//   },
//   rpcURLs: {
//     25: "https://evm.cronos.org/",
//   },
// };

// // Testnet config
// export const testNetConfigVars = {
//   mode: "normal",
//   activateAutoLoginDefiWallet: false,
//   rpcNetwork: {
//     rpcUrl: "https://evm-t3.cronos.org/",
//     chainId: 338,
//     chainIdHex: "0x152",
//     chainName: "Cronos Tesnet",
//     chainType: "testnet",
//     nativeCurrency: {
//       name: "CRO",
//       symbol: "CRO",
//       decimals: 18,
//     },
//     blockExplorerUrl: "https://testnet.cronoscan.com/",
//   },
//   rpcURLs: {
//     338: "https://evm-t3.cronos.org/",
//   },
// };
