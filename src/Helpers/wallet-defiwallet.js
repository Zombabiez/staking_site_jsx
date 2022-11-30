// wallet-defiwallet.ts
import { ethers } from "ethers"; // npm install ethers

// This is the SDK provided by Crypto.com DeFi Wallet
import { DeFiWeb3Connector } from "@deficonnect/web3-connector"; // npm install "@deficonnect/web3-connector"
// If you are not using React, you may need to access the provider directly (included in the connector)
// import { DeFiConnectProvider } from "@deficonnect/provider"; // npm install "@deficonnect/provider"

import * as config from "../Config/config";
import * as utils from "./utils";
import { defaultWallet } from "../enums";

// Main login flow for Crypto.com DeFi Wallet with Wallet Extension
// The connector must be activated, then it exposes a provider
// that is used by the ethers Web3Provider constructor.
export const connect = async () => {
  try {
    const connector = new DeFiWeb3Connector({
      supportedChainIds: [config.configVars.rpcNetwork_mainnet.chainId],
      appName: "My Dapp",
      chainType: "eth", // Same value for any EVM chains
      chainId: [config.configVars.rpcNetwork_mainnet.chainId].toString(),
      rpcUrls: {
        [config.configVars.rpcNetwork_mainnet.chainId]:
          config.configVars.rpcNetwork_mainnet.rpcUrl,
      },
    });
    connector.activate();
    const provider = await connector.getProvider();

    // // If you are not using React, you may need to remove the connector and access the provider directly
    // const provider = new DeFiConnectProvider({
    //   appName: "My Dapp",
    //   chainType: "eth", // Same value for any EVM chains
    //   chainId: [config.configVars.rpcNetwork_mainnet.chainId].toString(),
    //   rpcUrls: {
    //     [config.configVars.rpcNetwork_mainnet.chainId]:
    //       config.configVars.rpcNetwork_mainnet.rpcUrl,
    //   },
    // });
    const web3Provider = new ethers.providers.Web3Provider(provider);
    if (
      !(
        parseInt(provider.networkConfig.chainId) ===
        config.configVars.rpcNetwork_mainnet.chainId
      )
    ) {
      window.alert(
        "Switch your Wallet to blockchain network " +
          config.configVars.rpcNetwork_mainnet.chainName +
          ". Chain ID is " +
          parseInt(provider.chainId) +
          " instead of " +
          config.configVars.rpcNetwork_mainnet.chainId
      );
      return defaultWallet;
    }
    const accounts = await provider.request({
      method: "eth_requestAccounts",
    });
    console.log("Accounts", JSON.stringify(accounts)); // For debugging purposes
    const newWallet = {
      ...defaultWallet,
      walletProviderName: "defiwallet",
      address: accounts[0],
      browserWeb3Provider: web3Provider,
      serverWeb3Provider: new ethers.providers.JsonRpcProvider(
        config.configVars.rpcNetwork_mainnet.rpcUrl
      ),
      connected: true,
      chainId: parseInt(provider.chainId),
    };
    // Subscribe to events that reload the app
    provider.on("accountsChanged", (x) => {
      utils.actionWhenWalletChange("accountsChanged", x, newWallet);
    });
    provider.on("chainChanged", (x) => {
      utils.actionWhenWalletChange("chainChanged", x, newWallet);
    });
    provider.on("disconnect", (x) => {
      utils.actionWhenWalletChange("disconnect", x, newWallet);
    });
    return newWallet;
  } catch (e) {
    // window.alert(e);
    return defaultWallet;
  }
};
