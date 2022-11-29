import { useCallback, useContext, useEffect, useState } from "react";
import { BigNumber, ethers } from "ethers"; // npm install ethers
import { Spinner, Tooltip } from "flowbite-react";

import logo from "../Assets/Images/StakeMock/logo.png";
import layer from "../Assets/Images/StakeMock/layer.png";

import StakingPool from "../Components/StakingPool";

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

import { defaultWallet, defaultChainData, defaultGenInfo } from "../enums";
import { hexToInt } from "../Helpers/utils";

import ZombabieNFTJson from "../abis/ZombabieNFT.json";
import ZombabieStakingPool1Json from "../abis/ZombabieStakingPool1.json";
import ZombabieStakingPool2Json from "../abis/ZombabieStakingPool2.json";
import ZombabieStakingPool3Json from "../abis/ZombabieStakingPool3.json";
import ZombabieStakingPool4Json from "../abis/ZombabieStakingPool4.json";
import ZombabieStakingPool5Json from "../abis/ZombabieStakingPool5.json";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { state, dispatch } = useContext(Store);
  const { address } = state.wallet;

  const [showWalletPopUp, setShowWalletPopUp] = useState(false);
  const [unClaimedReward, setUnClaimedReward] = useState();
  const [gen1Info, setGen1Info] = useState(defaultGenInfo);
  const [gen2Info, setGen2Info] = useState(defaultGenInfo);
  const [gen3Info, setGen3Info] = useState(defaultGenInfo);
  const [gen4Info, setGen4Info] = useState(defaultGenInfo);
  const [gen5Info, setGen5Info] = useState(defaultGenInfo);
  const [isLoading, setLoading] = useState(false);

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

      //* ZombabieNFT Contract
      const ZombabieNFTContract = new ethers.Contract(
        ZombabieNFTJson.address,
        ZombabieNFTJson.abi,
        newWallet.browserWeb3Provider.getSigner()
      );
      updateZombabieNFTContract(dispatch, ZombabieNFTContract);

      //* ZombabieStaking Contracts
      const ZombabieStakingPool1 = new ethers.Contract(
        ZombabieStakingPool1Json.address,
        ZombabieStakingPool1Json.abi,
        newWallet.browserWeb3Provider.getSigner()
      );
      const ZombabieStakingPool2 = new ethers.Contract(
        ZombabieStakingPool2Json.address,
        ZombabieStakingPool2Json.abi,
        newWallet.browserWeb3Provider.getSigner()
      );
      const ZombabieStakingPool3 = new ethers.Contract(
        ZombabieStakingPool3Json.address,
        ZombabieStakingPool3Json.abi,
        newWallet.browserWeb3Provider.getSigner()
      );
      const ZombabieStakingPool4 = new ethers.Contract(
        ZombabieStakingPool4Json.address,
        ZombabieStakingPool4Json.abi,
        newWallet.browserWeb3Provider.getSigner()
      );
      const ZombabieStakingPool5 = new ethers.Contract(
        ZombabieStakingPool5Json.address,
        ZombabieStakingPool5Json.abi,
        newWallet.browserWeb3Provider.getSigner()
      );
      updateStakeContracts(dispatch, {
        ZombabieStakingPool1,
        ZombabieStakingPool2,
        ZombabieStakingPool3,
        ZombabieStakingPool4,
        ZombabieStakingPool5,
      });

      const [
        unclaimed1,
        // unclaimed2,
        // unclaimed3,
        // unclaimed4,
        // unclaimed5,
        totalDeposit1,
        // totalDeposit2,
        // totalDeposit3,
        // totalDeposit4,
        // totalDeposit5,
        staker1,
        // staker2,
        // staker3,
        // staker4,
        // staker5,
        rate1,
        // rate2,
        // rate3,
        // rate4,
        // rate5,
      ] = await Promise.all([
        ZombabieStakingPool1.availableRewards(newWallet.address),
        // ZombabieStakingPool2.availableRewards(newWallet.address),
        // ZombabieStakingPool3.availableRewards(newWallet.address),
        // ZombabieStakingPool4.availableRewards(newWallet.address),
        // ZombabieStakingPool5.availableRewards(newWallet.address),
        ZombabieStakingPool1.getTotalStaked(),
        // ZombabieStakingPool2.getTotalStaked(),
        // ZombabieStakingPool3.getTotalStaked(),
        // ZombabieStakingPool4.getTotalStaked(),
        // ZombabieStakingPool5.getTotalStaked(),
        ZombabieStakingPool1.stakers(newWallet.address),
        // ZombabieStakingPool2.stakers(newWallet.address),
        // ZombabieStakingPool3.stakers(newWallet.address),
        // ZombabieStakingPool4.stakers(newWallet.address),
        // ZombabieStakingPool5.stakers(newWallet.address),
        ZombabieStakingPool1.getMonthlyRate(newWallet.address),
        // ZombabieStakingPool2.getMonthlyRate(newWallet.address),
        // ZombabieStakingPool3.getMonthlyRate(newWallet.address),
        // ZombabieStakingPool4.getMonthlyRate(newWallet.address),
        // ZombabieStakingPool5.getMonthlyRate(newWallet.address),
      ]);

      setGen1Info({
        Rate: parseFloat(ethers.utils.formatEther(rate1)).toFixed(3),
        totalDeposit: hexToInt(totalDeposit1),
        currentDeposit: hexToInt(staker1.amountStaked),
      });
      // setGen2Info({
      //   Rate: parseFloat(ethers.utils.formatEther(rate2)).toFixed(3),
      //   totalDeposit: hexToInt(totalDeposit2),
      //   currentDeposit: hexToInt(staker2.amountStaked),
      // });
      // setGen3Info({
      //   Rate: parseFloat(ethers.utils.formatEther(rate3)).toFixed(3),
      //   totalDeposit: hexToInt(totalDeposit3),
      //   currentDeposit: hexToInt(staker3.amountStaked),
      // });
      // setGen4Info({
      //   Rate: parseFloat(ethers.utils.formatEther(rate4)).toFixed(3),
      //   totalDeposit: hexToInt(totalDeposit4),
      //   currentDeposit: hexToInt(staker4.amountStaked),
      // });
      // setGen5Info({
      //   Rate: parseFloat(ethers.utils.formatEther(rate5)).toFixed(3),
      //   totalDeposit: hexToInt(totalDeposit5),
      //   currentDeposit: hexToInt(staker5.amountStaked),
      // });

      let balance = BigNumber.from(unclaimed1);
      // .add(unclaimed2)
      // .add(unclaimed3)
      // .add(unclaimed4)
      // .add(unclaimed5);

      setUnClaimedReward(
        parseFloat(ethers.utils.formatEther(balance)).toFixed(3)
      );
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
      }
    }

    initialLoad();
  }, [connectWallet]);

  const claimRewards = async () => {
    setLoading(true);
    try {
      const [unclaimed1, unclaimed2, unclaimed3, unclaimed4, unclaimed5] =
        await Promise.all([
          state.StakeContracts.ZombabieStakingPool1.availableRewards(address),
          state.StakeContracts.ZombabieStakingPool2.availableRewards(address),
          state.StakeContracts.ZombabieStakingPool3.availableRewards(address),
          state.StakeContracts.ZombabieStakingPool4.availableRewards(address),
          state.StakeContracts.ZombabieStakingPool5.availableRewards(address),
        ]);

      if (hexToInt(unclaimed1))
        await state.StakeContracts.ZombabieStakingPool1.claimRewards();
      if (hexToInt(unclaimed2))
        await state.StakeContracts.ZombabieStakingPool2.claimRewards();
      if (hexToInt(unclaimed3))
        await state.StakeContracts.ZombabieStakingPool3.claimRewards();
      if (hexToInt(unclaimed4))
        await state.StakeContracts.ZombabieStakingPool4.claimRewards();
      if (hexToInt(unclaimed5))
        await state.StakeContracts.ZombabieStakingPool5.claimRewards();

      toast.success("Successfully claimed rewards!");
    } catch (err) {
      toast.error("Encountered issues!");
    }
    setLoading(false);
  };

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
          <div className="mt-[14px] min-w-[383px] px-3 h-[48px] bg-black flex flex-row items-center">
            <div className="font-face-agency text-[30px] text-white">
              UnClaimed Rewards:
            </div>
            <div className="font-face-agency text-[30px] text-white flex-auto text-right">
              {unClaimedReward === undefined ? "" : unClaimedReward + " CRO"}
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => {
              claimRewards();
            }}
            disabled={unClaimedReward === undefined}
            className="mt-[21px] w-[194px] h-[48px] rounded-[5px] bg-black flex justify-center items-center font-face-agency text-[30px] text-[#00a652] hover:bg-slate-900 disabled:cursor-not-allowed disabled:bg-black disabled:text-slate-500"
          >
            {isLoading ? (
              <Spinner
                color="success"
                aria-label="Extra large Success spinner example"
                size="md"
              />
            ) : (
              "Claim Rewards"
            )}
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
