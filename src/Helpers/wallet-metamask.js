// wallet-metamask.ts

// Injected wallet
// Works with MetaMask in browser or in in-app browser

import { ethers } from "ethers"; // npm install ethers

import * as config from "../Config/config";
import * as utils from "./utils";
import { defaultWallet } from "../enums";

// One feature of MetaMask is that the Dapp developer
// can programmatically
// change the network that the browser
// extension is connected to.
// This feature is implemented below,
// to automatically set - up Cronos
export const switchNetwork = async () => {
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: config.configVars.rpcNetwork_mainnet.chainIdHex }],
    });
  } catch (e) {
    console.log(e);
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: config.configVars.rpcNetwork_mainnet.chainIdHex,
          chainName: config.configVars.rpcNetwork_mainnet.chainName,
          rpcUrls: [config.configVars.rpcNetwork_mainnet.rpcUrl],
          nativeCurrency: config.configVars.rpcNetwork_mainnet.nativeCurrency,
          blockExplorerUrls: [
            config.configVars.rpcNetwork_mainnet.blockExplorerUrl,
          ],
        },
      ],
    });
  }
};

// Main login flow for injected wallet like MetaMask
export const connect = async () => {
  try {
    let chainId = await window.ethereum.request({ method: "eth_chainId" });
    if (!(chainId === config.configVars.rpcNetwork_mainnet.chainIdHex)) {
      await switchNetwork();
      await utils.delay(2000);
      return defaultWallet;
    }
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const newWallet = {
      ...defaultWallet,
      walletProviderName: "metamask",
      address: accounts[0],
      browserWeb3Provider: new ethers.providers.Web3Provider(window.ethereum),
      serverWeb3Provider: new ethers.providers.JsonRpcProvider(
        config.configVars.rpcNetwork_mainnet.rpcUrl
      ),
      connected: true,
      chainId: utils.hexToInt(
        await window.ethereum.request({ method: "eth_chainId" })
      ),
    };
    // It is possible to subscribe to events chainChanged,
    // accountsChanged or disconnect,
    // and reload the Dapp whenever one of these events occurs
    window.ethereum.on("chainChanged", (x) => {
      utils.actionWhenWalletChange("chainChanged", x, newWallet);
    });
    window.ethereum.on("accountsChanged", (x) => {
      utils.actionWhenWalletChange("accountsChanged", x, newWallet);
    });
    window.ethereum.on("disconnect", (x) => {
      utils.actionWhenWalletChange("disconnect", x, newWallet);
    });

    return newWallet;
  } catch (e) {
    // window.alert(e);
    return defaultWallet;
  }
};
