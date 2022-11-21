import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";

import { Web3Modal } from "@web3modal/react";

import { chain, configureChains, createClient, WagmiConfig } from "wagmi";

import Dashboard from "./Pages/Dashboard/Dashboard";

function App() {
  const chains = [chain.mainnet];

  // Wagmi client
  const { provider } = configureChains(chains, [
    walletConnectProvider({
      projectId: "73536459901b3fe8cd361f9041096ab3",
    }),
  ]);
  const wagmiClient = createClient({
    autoConnect: true,
    connectors: modalConnectors({ appName: "web3Modal", chains }),
    provider,
  });

  // Web3Modal Ethereum Client
  const ethereumClient = new EthereumClient(wagmiClient, chains);

  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <Dashboard />
      </WagmiConfig>

      <Web3Modal
        projectId={"73536459901b3fe8cd361f9041096ab3"}
        theme="dark"
        accentColor="default"
        ethereumClient={ethereumClient}
      />
    </>
  );
}

export default App;
