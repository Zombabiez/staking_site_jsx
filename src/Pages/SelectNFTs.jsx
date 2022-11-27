import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

import { Store } from "../Store/store-reducer";
import { hexToInt } from "../Helpers/utils";
import NFTCard from "../Components/NFTCard";

import logo from "../Assets/Images/StakeMock/logo.png";
import { Spinner } from "flowbite-react";

const SelectNFTs = () => {
  const [searchparams] = useSearchParams();
  const pool = searchparams.get("pool");
  const isStake = searchparams.get("isStake");
  const navigate = useNavigate();

  const [IPFSList, setIPFSList] = useState();

  const { state, dispatch } = useContext(Store);
  const { address } = state.wallet;
  const {
    ZombabieStakingPool1,
    ZombabieStakingPool2,
    ZombabieStakingPool3,
    ZombabieStakingPool4,
    ZombabieStakingPool5,
  } = state.StakeContracts;
  const zombabieStakingContract = [
    ,
    ZombabieStakingPool1,
    ZombabieStakingPool2,
    ZombabieStakingPool3,
    ZombabieStakingPool4,
    ZombabieStakingPool5,
  ];
  const { ZombabieNFTContract } = state;

  const initializeNFTList = async () => {
    const res = await ZombabieNFTContract.walletOfOwner(address);
    let ipfs = [];
    for (let i = 0; i < res.length; i++) {
      const tokenId = hexToInt(res[i]);
      const meta = await ZombabieNFTContract.tokenURI(tokenId);
      ipfs.push(meta);
    }
    setIPFSList(ipfs);
    return res;
  };

  useEffect(() => {
    if (ZombabieNFTContract) {
      toast("Select Your NFTs to " + (isStake ? "STAKE" : "UNSTAKE"), {
        duration: 4000,
      });

      initializeNFTList();
    }
  }, []);

  if (!ZombabieNFTContract) {
    return <Navigate to="/" />;
  }
  return (
    <div className="w-full h-full min-h-screen bg-gradient-to-b from-black via-[#00a6a4] to-black flex justify-center p-10">
      <div className="max-w-7xl w-full flex flex-col items-center gap-5">
        <img src={logo} alt="Zombabies" />
        <div className="flex flex-row flex-wrap flex-auto gap-4 justify-center items-center">
          {IPFSList !== undefined ? (
            IPFSList.map((ipfs) => {
              return <NFTCard ipfs={ipfs} />;
            })
          ) : (
            <div className="flex flex-row justify-center items-center font-creepster text-[30px] text-white">
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
        <div className="w-full flex flex-row justify-end gap-3">
          <button
            onClick={() => {
              navigate("/");
            }}
            className="transition-all w-[201px] h-[44px] bg-[#cbff0f] hover:bg-[#e1ff73] rounded-[10px] flex items-center justify-center font-creepster text-[30px] text-black uppercase disabled:bg-slate-500 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            disabled={IPFSList === undefined}
            className="transition-all w-[201px] h-[44px] bg-[#cbff0f] hover:bg-[#e1ff73] rounded-[10px] flex items-center justify-center font-creepster text-[30px] text-black uppercase disabled:bg-slate-500 disabled:cursor-not-allowed"
          >
            Batch Stake
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectNFTs;
