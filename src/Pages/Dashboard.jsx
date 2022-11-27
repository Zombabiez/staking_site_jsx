import { useCallback, useContext, useEffect, useState } from "react";
import { ethers } from "ethers"; // npm install ethers
import { Tooltip } from "flowbite-react";

import logo from "../Assets/Images/StakeMock/logo.png";
import layer from "../Assets/Images/StakeMock/layer.png";

import StakingPool from "../Components/Dashboard/StakingPool";

import { Store } from "../Store/store-reducer";
import * as config from "../Config/config";
import * as utils from "../Helpers/utils";
import * as walletConnect from "../Helpers/wallet-connect";
import * as walletMetamask from "../Helpers/wallet-metamask";
import * as walletDefiwallet from "../Helpers/wallet-defiwallet";

import metamask from "../Assets/Images/wallet/metamask.png";
import defi from "../Assets/Images/wallet/defi.png";
import wallet_connect from "../Assets/Images/wallet/walletconnect.png";

import {
  updateChainDataAction,
  updateRefreshingAction,
  updateWalletAction,
  updateStakeContracts,
  updateZombabieNFTContract,
} from "../Store/actions";

import { defaultWallet, defaultChainData } from "../enums";
import { hexToInt } from "../Helpers/utils";

import ZombabieNFTJson from "../abis/ZombabieNFT.json";
import ZombabieStakingPool1Json from "../abis/ZombabieStakingPool1.json";
import ZombabieStakingPool2Json from "../abis/ZombabieStakingPool2.json";
import ZombabieStakingPool3Json from "../abis/ZombabieStakingPool3.json";
import ZombabieStakingPool4Json from "../abis/ZombabieStakingPool4.json";
import ZombabieStakingPool5Json from "../abis/ZombabieStakingPool5.json";

const Dashboard = () => {
  const { state, dispatch } = useContext(Store);
  console.log("🚀 ~ file: Dashboard.jsx ~ line 42 ~ Dashboard ~ state", state);
  const [showWalletPopUp, setShowWalletPopUp] = useState(false);
  const [unClaimedReward, setUnClaimedReward] = useState();
  const [gen1Info, setGen1Info] = useState({
    totalDeposit: undefined,
    currentDeposit: undefined,
    Rate: undefined,
  });
  const [gen2Info, setGen2Info] = useState({
    totalDeposit: undefined,
    currentDeposit: undefined,
    Rate: undefined,
  });
  const [gen3Info, setGen3Info] = useState({
    totalDeposit: undefined,
    currentDeposit: undefined,
    Rate: undefined,
  });
  const [gen4Info, setGen4Info] = useState({
    totalDeposit: undefined,
    currentDeposit: undefined,
    Rate: undefined,
  });
  const [gen5Info, setGen5Info] = useState({
    totalDeposit: undefined,
    currentDeposit: undefined,
    Rate: undefined,
  });

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

      const ZombabieNFTContract = new ethers.Contract(
        ZombabieNFTJson.address,
        ZombabieNFTJson.abi,
        newWallet.browserWeb3Provider.getSigner()
      );

      let balance = 0;
      const ZombabieStakingPool1 = new ethers.Contract(
        ZombabieStakingPool1Json.address,
        ZombabieStakingPool1Json.abi,
        newWallet.browserWeb3Provider.getSigner()
      );
      balance += hexToInt(
        await ZombabieStakingPool1.availableRewards(newWallet.address)
      );
      let staker = await ZombabieStakingPool1.stakers(newWallet.address);
      let Rate = hexToInt(
        await ZombabieStakingPool1.getMonthlyRate(newWallet.address)
      );
      let totalDeposit = hexToInt(await ZombabieStakingPool1.getTotalStaked());

      setGen1Info({
        Rate,
        totalDeposit,
        currentDeposit: hexToInt(staker.amountStaked),
      });

      const ZombabieStakingPool2 = new ethers.Contract(
        ZombabieStakingPool2Json.address,
        ZombabieStakingPool2Json.abi,
        newWallet.browserWeb3Provider.getSigner()
      );
      balance += hexToInt(
        await ZombabieStakingPool2.availableRewards(newWallet.address)
      );
      staker = await ZombabieStakingPool2.stakers(newWallet.address);
      Rate = hexToInt(
        await ZombabieStakingPool2.getMonthlyRate(newWallet.address)
      );
      totalDeposit = hexToInt(await ZombabieStakingPool2.getTotalStaked());

      setGen2Info({
        Rate,
        totalDeposit,
        currentDeposit: hexToInt(staker.amountStaked),
      });

      const ZombabieStakingPool3 = new ethers.Contract(
        ZombabieStakingPool3Json.address,
        ZombabieStakingPool3Json.abi,
        newWallet.browserWeb3Provider.getSigner()
      );
      balance += hexToInt(
        await ZombabieStakingPool3.availableRewards(newWallet.address)
      );
      staker = await ZombabieStakingPool3.stakers(newWallet.address);
      Rate = hexToInt(
        await ZombabieStakingPool3.getMonthlyRate(newWallet.address)
      );
      totalDeposit = hexToInt(await ZombabieStakingPool3.getTotalStaked());

      setGen3Info({
        Rate,
        totalDeposit,
        currentDeposit: hexToInt(staker.amountStaked),
      });

      const ZombabieStakingPool4 = new ethers.Contract(
        ZombabieStakingPool4Json.address,
        ZombabieStakingPool4Json.abi,
        newWallet.browserWeb3Provider.getSigner()
      );
      balance += hexToInt(
        await ZombabieStakingPool4.availableRewards(newWallet.address)
      );
      staker = await ZombabieStakingPool4.stakers(newWallet.address);
      Rate = hexToInt(
        await ZombabieStakingPool4.getMonthlyRate(newWallet.address)
      );
      totalDeposit = hexToInt(await ZombabieStakingPool4.getTotalStaked());

      setGen4Info({
        Rate,
        totalDeposit,
        currentDeposit: hexToInt(staker.amountStaked),
      });

      const ZombabieStakingPool5 = new ethers.Contract(
        ZombabieStakingPool5Json.address,
        ZombabieStakingPool5Json.abi,
        newWallet.browserWeb3Provider.getSigner()
      );
      balance += hexToInt(
        await ZombabieStakingPool5.availableRewards(newWallet.address)
      );
      staker = await ZombabieStakingPool5.stakers(newWallet.address);
      Rate = hexToInt(
        await ZombabieStakingPool5.getMonthlyRate(newWallet.address)
      );
      totalDeposit = hexToInt(await ZombabieStakingPool5.getTotalStaked());

      setGen5Info({
        Rate,
        totalDeposit,
        currentDeposit: hexToInt(staker.amountStaked),
      });

      updateStakeContracts(dispatch, {
        ZombabieStakingPool1,
        ZombabieStakingPool2,
        ZombabieStakingPool3,
        ZombabieStakingPool4,
        ZombabieStakingPool5,
      });

      updateZombabieNFTContract(dispatch, ZombabieNFTContract);

      setUnClaimedReward(balance);
    } else {
      updateRefreshingAction(dispatch, {
        status: false,
        message: "Complete",
      });
    }
  }, []);

  useEffect(() => {
    async function initialLoad() {
      if (config.configVars.activateAutoLoginWallet) {
        await connectWallet("injected");
        console.log("Initial load");
      }
    }

    initialLoad();
  }, [connectWallet]);

  return (
    <div className="w-full h-full flex justify-center bg-gradient-to-b from-black via-[#00a6a4] to-black">
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
          <div className="mt-[14px] w-[383px] h-[48px] bg-black flex flex-row items-center px-[15px]">
            <div className="font-face-agency text-[30px] text-white">
              UnClaimed Rewards:
            </div>
            <div className="font-face-agency text-[30px] text-white flex-auto text-center">
              {unClaimedReward === undefined ? "####" : unClaimedReward} CRO
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            disabled={unClaimedReward === undefined}
            className="mt-[21px] w-[194px] h-[48px] rounded-[5px] bg-black flex justify-center items-center font-face-agency text-[30px] text-[#00a652] hover:bg-slate-900 disabled:cursor-not-allowed disabled:bg-black disabled:text-slate-500"
          >
            Claim Rewards
          </button>
        </div>
        <div className="flex justify-center mb-[45px]">
          <StakingPool pool={1} {...gen1Info} />
        </div>
        <div className="flex justify-center mb-[45px]">
          <StakingPool pool={2} {...gen2Info} />
        </div>
        <div className="flex justify-center mb-[45px]">
          <StakingPool pool={3} {...gen3Info} />
        </div>
        <div className="flex justify-center mb-[45px]">
          <StakingPool pool={4} {...gen4Info} />
        </div>
        <div className="flex justify-center mb-[100px]">
          <StakingPool pool={5} {...gen5Info} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
