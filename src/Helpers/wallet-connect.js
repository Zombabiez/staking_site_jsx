// wallet-connect.ts
import { ethers } from "ethers"; // npm install ethers

// This is the SDK provided by Wallet Connect
import WalletConnectProvider from "@walletconnect/web3-provider";

import * as config from "../Config/config";
import * as utils from "./utils";
import { defaultWallet } from "../enums";

// The connector must be activated, then it exposes a provider
// that is used by the ethers Web3Provider constructor.
export const connect = async () => {
  try {
    // Reset cache
    localStorage.clear();
    const provider = new WalletConnectProvider({
      rpc: {
        [config.configVars.rpcNetwork_mainnet.chainId]:
          config.configVars.rpcNetwork_mainnet.rpcUrl,
      },
      // This chainId parameter is not mentioned
      // in the WalletConnect documentation,
      // But is necessary otherwise
      // WalletConnect will connect to Ethereum mainnet
      chainId: config.configVars.rpcNetwork_mainnet.chainId,
      qrcodeModalOptions: {
        mobileLinks: ["crypto.com"],
      },
    });
    await provider.enable();
    const ethersProvider = new ethers.providers.Web3Provider(provider);
    if (!(provider.chainId === config.configVars.rpcNetwork_mainnet.chainId)) {
      window.alert(
        "Switch your Wallet to blockchain network " +
          config.configVars.rpcNetwork_mainnet.chainName
      );
      return defaultWallet;
    }
    const newWallet = {
      ...defaultWallet,
      walletProviderName: "walletconnect",
      address: (await ethersProvider.listAccounts())[0],
      browserWeb3Provider: ethersProvider,
      serverWeb3Provider: new ethers.providers.JsonRpcProvider(
        config.configVars.rpcNetwork_mainnet.rpcUrl
      ),
      connected: true,
      chainId: provider.chainId,
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
