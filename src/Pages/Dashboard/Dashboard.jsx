import React, { useCallback, useContext, useEffect, useState } from "react";

import logo from "../../Assets/Images/StakeMock/logo.png";
import layer from "../../Assets/Images/StakeMock/layer.png";

import PoolFirst from "../../Components/Dashboard/PoolFirst";
import PoolSecond from "../../Components/Dashboard/PoolSecond";

import { Store } from "../../Store/store-reducer";
import * as config from "../../Config/config";
import * as utils from "../../Helpers/utils";
import * as walletConnect from "../../Helpers/wallet-connect";
import * as walletMetamask from "../../Helpers/wallet-metamask";
import * as walletDefiwallet from "../../Helpers/wallet-defiwallet";

import metamask from "../../Assets/Images/wallet/metamask.png";
import defi from "../../Assets/Images/wallet/defi.png";
import wallet_connect from "../../Assets/Images/wallet/walletconnect.png";

import {
  updateChainDataAction,
  updateRefreshingAction,
  updateWalletAction,
} from "../../Store/actions";

import { defaultWallet, defaultChainData } from "../../enums";
import { Tooltip } from "flowbite-react";

// import { Web3Button } from "@web3modal/react";

const Dashboard = () => {
  const { state, dispatch } = useContext(Store);
  console.log("🚀 ~ file: Dashboard.jsx ~ line 33 ~ Dashboard ~ state", state);
  const [showWalletPopUp, setShowWalletPopUp] = useState(false);

  const connectWallet = useCallback(async (option) => {
    updateRefreshingAction(dispatch, {
      status: true,
      message: "Connecting wallet...",
    });
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    updateWalletAction(dispatch, { ...defaultWallet });
    let newWallet;
    switch (option) {
      // Wallet injected within browser (MetaMask)
      case "injected":
        newWallet = await walletMetamask.connect();
        break;
      // Crypto.com DeFi Wallet Extension (browser)
      case "defi-wallet":
        newWallet = await walletDefiwallet.connect();
        break;
      // Crypto.com DeFi Wallet mobile app (via Wallet Connect)
      case "wallet-connect":
        newWallet = await walletConnect.connect();
        break;
      default:
    }

    // If wallet is connected, query the wallet and update stored values
    if (newWallet.connected) {
      const croBalance = await utils.getCroBalance(
        newWallet.serverWeb3Provider,
        newWallet.address
      );
      updateWalletAction(dispatch, newWallet);
      updateChainDataAction(dispatch, {
        ...defaultChainData,
        croBalance: croBalance,
      });
      updateRefreshingAction(dispatch, {
        status: false,
        message: "Complete",
      });
    } else {
      updateRefreshingAction(dispatch, {
        status: false,
        message: "Complete",
      });
    }
  }, []);

  useEffect(() => {
    async function initialLoad() {
      if (config.configVars.activateAutoLoginDefiWallet) {
        await connectWallet("defi-wallet");
        console.log("Initial load");
      }
    }

    initialLoad();
  }, [connectWallet]);

  return (
    <div className="w-full h-full flex justify-center bg-gradient-to-b from-black via-[#00a6a4] to-black ">
      {/* <div className="relative w-full h-full flex justify-center  ">
      <div className="absolute w-full h-full">
        <img className="w-full h-full" src={bg} alt="" />
      </div> */}

      <div className="template">
        <div className="flex justify-center">
          <div className="mt-[42px] flex justify-center">
            <img src={logo} alt="" />
          </div>
        </div>
        <div className="flex justify-center">
          <div
            className="mt-[19px] pt-[3px] flex justify-center w-[493px] h-[86px] items-start"
            style={{ backgroundImage: `url(${layer})` }}
          >
            <div className="font-face-bison-bold text-[40px] text-black tracking-[2px]">
              MULTI-TIER NFT STAKING
            </div>
          </div>
        </div>
        {/* <Tooltip content="Tooltip content" trigger="click">
          <Button>Tooltip click</Button>
        </Tooltip> */}

        <div className="flex flex-col justify-center items-center relative">
          <button
            className="transition-all mt-[11px] h-[48px] px-5 rounded-[5px] bg-[#201b1b] hover:bg-[#413737] flex justify-center items-center font-face-agency text-[30px] text-[#e5e418]"
            onClick={() => {
              setShowWalletPopUp(!showWalletPopUp);
            }}
          >
            {state.refreshing.status
              ? state.refreshing.message
              : state.wallet.connected
              ? utils.truncateAddress(state.wallet.address)
              : "Connect Wallet"}
          </button>

          <div
            className={`${
              !showWalletPopUp && "invisible"
            } absolute w-64 text-sm font-light -top-20 text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800`}
          >
            <div className="px-3 py-2 flex justify-between">
              <Tooltip content="Metamask">
                <button
                  onClick={() => {
                    setShowWalletPopUp(!showWalletPopUp);
                    connectWallet("injected");
                  }}
                  className="w-16 hover:bg-white/10 rounded-xl p-1"
                >
                  <img src={metamask} alt="metamask" />
                </button>
              </Tooltip>
              <Tooltip content="DeFi Wallet">
                <button
                  onClick={() => {
                    setShowWalletPopUp(!showWalletPopUp);
                    connectWallet("defi-wallet");
                  }}
                  className="w-16 hover:bg-white/10 rounded-xl p-1"
                >
                  <img src={defi} alt="defi" />
                </button>
              </Tooltip>
              <Tooltip content="WalletConnect">
                <button
                  onClick={() => {
                    setShowWalletPopUp(!showWalletPopUp);
                    connectWallet("wallet-connect");
                  }}
                  className="w-16 hover:bg-white/10 rounded-xl p-2"
                >
                  <img src={wallet_connect} alt="wallet connect" />
                </button>
              </Tooltip>
            </div>
          </div>
        </div>
        <div className="flex justify-center ">
          <div className="mt-[14px] w-[383px] h-[48px]  bg-black flex  items-center px-[15px]">
            <div className="font-face-agency text-[30px] text-white">
              UnClaimed Rewards:
            </div>
          </div>
        </div>
        <div className="flex justify-center cursor-pointer">
          <div className="mt-[21px] w-[194px] h-[48px] rounded-[5px] bg-black flex justify-center items-center">
            <div className="font-face-agency text-[30px] text-[#00a652]">
              Claim Rewards
            </div>
          </div>
        </div>
        <div className="flex justify-center mb-[45px]">
          <PoolFirst />
        </div>
        <div className="flex justify-center mb-[45px]">
          <PoolSecond gamelevel="bronze" />
        </div>
        <div className="flex justify-center mb-[45px]">
          <PoolSecond gamelevel="silver" />
        </div>
        <div className="flex justify-center mb-[45px]">
          <PoolSecond gamelevel="gold" />
        </div>
        <div className="flex justify-center mb-[100px]">
          <PoolSecond gamelevel="platinum" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
