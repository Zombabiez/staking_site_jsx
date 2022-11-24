import { useCallback, useContext, useEffect } from "react";

import logo from "../../Assets/Images/StakeMock/logo.png";
import layer from "../../Assets/Images/StakeMock/layer.png";

import PoolFirst from "../../Components/Dashboard/PoolFirst";
import PoolSecond from "../../Components/Dashboard/PoolSecond";

import { Store } from "../../Store/store-reducer";
import * as config from "../../Config/config";
import * as utils from "../../Helpers/utils";
import * as walletConnect from "../../Helpers/wallet-connect";
import {
  updateChainDataAction,
  updateRefreshingAction,
  updateWalletAction,
} from "../../Store/actions";
import { defaultWallet, defaultChainData } from "../../enums";
// import { Web3Button } from "@web3modal/react";

const Dashboard = () => {
  const { state, dispatch } = useContext(Store);

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
        // newWallet = await walletMetamask.connect();
        break;
      // Crypto.com DeFi Wallet Extension (browser)
      case "defi-wallet":
        // newWallet = await walletDefiwallet.connect();
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
        <div className="flex justify-center cursor-pointer">
          {/* <Web3Button /> */}
          <button
            className="transition-all mt-[11px] w-[194px] h-[48px] rounded-[5px] bg-[#201b1b] hover:bg-[#413737] flex justify-center items-center font-face-agency text-[30px] text-[#e5e418]"
            onClick={() => {
              connectWallet("wallet-connect");
            }}
          >
            Connect Wallet
          </button>
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
              Claimed Rewards
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
