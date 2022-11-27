import { useContext, useEffect } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";

import { Store } from "../Store/store-reducer";

import logo from "../Assets/Images/StakeMock/logo.png";
import toast from "react-hot-toast";

const SelectNFTs = () => {
  const [searchparams] = useSearchParams();
  const pool = searchparams.get("pool");
  const isStake = searchparams.get("isStake");
  console.log(
    "🚀 ~ file: SelectNFTs.jsx ~ line 10 ~ SelectNFTs ~ pool, isStake",
    pool,
    isStake
  );
  const navigate = useNavigate();

  const { state, dispatch } = useContext(Store);
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

  useEffect(() => {
    toast("Select Your NFTs to " + (isStake ? "STAKE" : "UNSTAKE"), {
      duration: 4000,
    });
  }, []);

  if (!ZombabieNFTContract) {
    return <Navigate to="/" />;
  }
  return (
    <div className="w-full h-full min-h-screen bg-gradient-to-b from-black via-[#00a6a4] to-black flex justify-center p-10">
      <div className="max-w-7xl w-full flex flex-col items-center gap-5">
        <img src={logo} alt="Zombabies" />
        <div className="w-full flex-auto flex flex-row justify-center">
          <div className="flex flex-row flex-wrap w-auto gap-4">
            <div className="w-[300px] h-[200px] bg-black rounded-lg"></div>
            <div className="w-[300px] h-[200px] bg-black rounded-lg"></div>
            <div className="w-[300px] h-[200px] bg-black rounded-lg"></div>
            <div className="w-[300px] h-[200px] bg-black rounded-lg"></div>
            <div className="w-[300px] h-[200px] bg-black rounded-lg"></div>
            <div className="w-[300px] h-[200px] bg-black rounded-lg"></div>
            <div className="w-[300px] h-[200px] bg-black rounded-lg"></div>
          </div>
        </div>
        <div className="w-full flex flex-row justify-end gap-3">
          <button
            onClick={() => {
              navigate("/");
            }}
            className="transition-all w-[201px] h-[44px] bg-[#cbff0f] hover:bg-[#e1ff73] rounded-[10px] flex items-center justify-center font-creepster text-[30px] text-black"
          >
            Cancel
          </button>
          <button className="transition-all w-[201px] h-[44px] bg-[#cbff0f] hover:bg-[#e1ff73] rounded-[10px] flex items-center justify-center font-creepster text-[30px] text-black uppercase">
            Batch Stake
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectNFTs;
