import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Spinner } from "flowbite-react";

import { Store } from "../Store/store-reducer";
import { hexToInt } from "../Helpers/utils";
import { StakingRange } from "../enums";

import NFTCard from "../Components/NFTCard";

import logo from "../Assets/Images/StakeMock/logo.png";

const SelectNFTs = () => {
  const [searchparams] = useSearchParams();
  const pool = Number(searchparams.get("pool"));
  const isStake = searchparams.get("isStake") === "true";

  const navigate = useNavigate();

  const [tokenIdList, setTokenIdList] = useState();
  const [selectedList, setSelectedList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { state } = useContext(Store);
  const { address } = state.wallet;

  const zombabieStakingContract = [
    undefined,
    state.StakeContracts.ZombabieStakingPool1,
    state.StakeContracts.ZombabieStakingPool2,
    state.StakeContracts.ZombabieStakingPool3,
    state.StakeContracts.ZombabieStakingPool4,
    state.StakeContracts.ZombabieStakingPool5,
  ];
  const {
    ZombabieNFTContract,
    ZombabieNFTGen1Contract,
    ZombabieNFTGen2Contract,
  } = state;

  // const ZombabieNFTContract =
  //   pool === 1 ? ZombabieNFTGen1Contract : ZombabieNFTGen2Contract;

  const initializeNFTList = async () => {
    if (isStake) {
      if (pool === 1) {
        const count = hexToInt(await ZombabieNFTContract.balanceOf(address));
        let tokenIds = [];

        for (let i = 0; i < count; i++) {
          tokenIds.push(
            hexToInt(await ZombabieNFTContract.tokenOfOwnerByIndex(address, i))
          );
        }
        setTokenIdList(tokenIds);
      } else {
        const res = await ZombabieNFTContract.walletOfOwner(address);
        let tokenIds = [];
        res.forEach((element) => {
          tokenIds.push(hexToInt(element));
        });
        setTokenIdList(tokenIds);
      }
    } else {
      const res = await zombabieStakingContract[pool].getStakedTokens(address);
      let tokenIds = [];
      res.forEach((element) => {
        tokenIds.push(hexToInt(element.tokenId));
      });
      setTokenIdList(tokenIds);
    }
  };

  const BatchStake = async () => {
    if (
      selectedList.length < StakingRange[pool].min ||
      selectedList.length > StakingRange[pool].max
    ) {
      if (pool === 1 || pool === 5)
        toast.error(
          `You should select at least ${StakingRange[pool].min} item(s)!`
        );
      else
        toast.error(
          `You should select ${StakingRange[pool].min}-${StakingRange[pool].max} items!`
        );
    } else {
      setIsLoading(true);
      try {
        await ZombabieNFTContract.setApprovalForAll(
          zombabieStakingContract[pool].address,
          true
        );

        setTimeout(async () => {
          await zombabieStakingContract[pool].batchStake(selectedList);
          setTimeout(() => {
            toast.success(
              `Successfully staked ${
                selectedList.length +
                (selectedList.length > 1 ? " items" : " item")
              }!`
            );
            navigate("/");
            setIsLoading(false);
          }, 6000);
        }, 3000);
      } catch (err) {
        toast.error("Encountered issues!");
        setIsLoading(false);
      }
    }
  };

  const BatchUnStake = async () => {
    if (selectedList.length === 0) {
      toast.error("You should select at least 1 item!");
    } else {
      setIsLoading(true);
      try {
        await zombabieStakingContract[pool].batchWithdraw(selectedList);
        setTimeout(() => {
          toast.success(
            `Successfully unstaked ${
              selectedList.length +
              (selectedList.length > 1 ? " items" : " item")
            }!`
          );
          navigate("/");
          setIsLoading(false);
        }, 8000);
      } catch (err) {
        toast.error("Encountered issues!");
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (ZombabieNFTContract) {
      initializeNFTList();
    }
  }, []);

  if (!ZombabieNFTContract) {
    return <Navigate to="/" />;
  }
  return (
    <div className="w-full h-full min-h-screen bg-gradient-to-b from-black via-[#00a6a4] to-black flex justify-center p-10">
      <div className="max-w-7xl w-full flex flex-col items-center gap-5 mb-[80px]">
        <img src={logo} alt="Zombabies" />
        <div className="flex flex-row flex-wrap flex-auto gap-4 justify-center items-center">
          {tokenIdList !== undefined ? (
            tokenIdList.length === 0 ? (
              <p className="font-creepster sm:text-[40px] text-[20px] text-white text-center">
                You don't have NFT.
                <br /> Please mint{" "}
                <span>
                  <a
                    href="https://www.zombabies.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black transition-all hover:text-slate-700"
                  >
                    here
                  </a>
                </span>
              </p>
            ) : (
              tokenIdList.map((tokenId) => {
                return (
                  <NFTCard
                    tokenId={tokenId}
                    key={tokenId}
                    selectedList={selectedList}
                    setSelectedList={setSelectedList}
                    pool={pool}
                  />
                );
              })
            )
          ) : (
            <div className="flex flex-row justify-center items-center font-creepster sm:text-[30px] text-[20px] text-white">
              <Spinner
                className="mr-3"
                color="success"
                aria-label="Extra large Success spinner example"
                size="xl"
              />{" "}
              Please Wait...
            </div>
          )}
        </div>
        <div className="w-auto flex flex-col p-5 bg-black/70 backdrop-blur-md rounded-l-[10px] gap-2 fixed bottom-5 right-0">
          <button
            onClick={() => {
              navigate("/");
            }}
            className="transition-all w-[180px] h-[44px] bg-[#cbff0f] hover:bg-[#e1ff73] rounded-[10px] flex items-center justify-center font-creepster text-[20px] text-black uppercase disabled:bg-slate-500 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              isStake ? BatchStake() : BatchUnStake();
            }}
            disabled={tokenIdList === undefined}
            className="transition-all w-[180px] h-[44px] bg-[#cbff0f] hover:bg-[#e1ff73] rounded-[10px] flex items-center justify-center font-creepster text-[20px] text-black uppercase disabled:bg-slate-500 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Spinner
                color="success"
                aria-label="Extra large Success spinner example"
                size="md"
              />
            ) : (
              `Batch ${isStake ? "Stake" : "Unstake"} ${
                selectedList.length
              } NFTs`
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectNFTs;
