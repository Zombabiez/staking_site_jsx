import { createSearchParams, useNavigate } from "react-router-dom";

import Head1 from "../Assets/Images/StakeMock/poolHeads/head1.png";
import Head2 from "../Assets/Images/StakeMock/poolHeads/head2.png";
import Head3 from "../Assets/Images/StakeMock/poolHeads/head3.png";
import Head4 from "../Assets/Images/StakeMock/poolHeads/head4.png";
import Head5 from "../Assets/Images/StakeMock/poolHeads/head5.png";
import bronze from "../Assets/Images/StakeMock/bronze.png";
import silver from "../Assets/Images/StakeMock/silver.png";
import gold from "../Assets/Images/StakeMock/gold.png";
import platinum from "../Assets/Images/StakeMock/platinum.png";

const StakingPool = ({ totalDeposit, currentDeposit, Rate, pool }) => {
  const navigate = useNavigate();
  return (
    <div className="relative">
      {pool === 2 && (
        <div>
          <div className="absolute left-[75px] -top-[28px] w-[362px] h-[53px] bg-black rounded-[10px]"></div>
          <div className="absolute left-[102px] -top-[15px]">
            <img src={bronze} alt="" />
          </div>
          <div className="absolute left-[201px] -top-[27px]">
            <div className="font-face-agency text-[32px] text-white tracking-[2px] ">
              For 1-5x Holders
            </div>
          </div>
        </div>
      )}
      {pool === 3 && (
        <div>
          <div className="absolute left-[75px] -top-[28px] w-[362px] h-[53px] bg-black rounded-[10px]"></div>
          <div className="absolute left-[102px] -top-[15px]">
            <img src={silver} alt="" />
          </div>
          <div className="absolute left-[190px] -top-[27px]">
            <div className="font-face-agency text-[32px] text-white tracking-[2px]">
              For 6-15x Holders
            </div>
          </div>
        </div>
      )}

      {pool === 4 && (
        <div>
          <div className="absolute left-[75px] -top-[28px] w-[362px] h-[53px] bg-black rounded-[10px]"></div>
          <div className="absolute left-[102px] -top-[15px]">
            <img src={gold} alt="" />
          </div>
          <div className="absolute left-[175px] -top-[27px]">
            <div className="font-face-agency text-[32px] text-white tracking-[2px]">
              For 16-39x Holders
            </div>
          </div>
        </div>
      )}
      {pool === 5 && (
        <div>
          <div className="absolute left-[75px] -top-[28px] w-[362px] h-[53px] bg-black rounded-[10px]"></div>
          <div className="absolute left-[83px] -top-[15px]">
            <img src={platinum} alt="" />
          </div>
          <div className="absolute left-[200px] -top-[27px]">
            <div className="font-face-agency text-[32px] text-white tracking-[2px]">
              For 40x + Holders
            </div>
          </div>
        </div>
      )}

      <div className="relative mt-[5px] w-[515px] h-[265px] p-[10px] ">
        <div className="absolute left-[10px] top-[12px] border-[#cbff0f] border-[8px] w-[485px] h-[235px] rounded-[10px] bg-[#201b1b]  shadow-[0_0_8px_8px_rgba(0,0,0,0.7)]"></div>
        <div className="absolute left-[3px] top-[7px]">
          {pool === 1 && <img src={Head1} alt="" className="h-[80px]" />}
          {pool === 2 && <img src={Head2} alt="" className="h-[80px]" />}
          {pool === 3 && <img src={Head3} alt="" className="h-[80px]" />}
          {pool === 4 && <img src={Head4} alt="" className="h-[80px]" />}
          {pool === 5 && <img src={Head5} alt="" className="h-[80px]" />}
        </div>
        <div className="absolute left-[93px] top-[20px]">
          <div className="font-face-bison-bold text-[48px] text-white tracking-[2px]">
            GEN {pool === 1 ? "1" : "2"} POOL
          </div>
        </div>
        {pool === 1 ? (
          <>
            <button
              disabled={totalDeposit === undefined}
              onClick={() => {
                navigate({
                  pathname: "/selectNFTs",
                  search: createSearchParams({
                    pool,
                    isStake: true,
                  }).toString(),
                });
              }}
              className="transition-all absolute left-[37px] top-[102px] w-[201px] h-[44px] bg-[#cbff0f] hover:bg-[#e1ff73] rounded-[10px] flex items-center justify-center font-creepster text-[30px] text-black disabled:bg-slate-500 disabled:cursor-not-allowed"
            >
              BATCH STAKE
            </button>
            <button
              disabled={totalDeposit === undefined}
              onClick={() => {
                navigate({
                  pathname: "/selectNFTs",
                  search: createSearchParams({
                    pool,
                    isStake: false,
                  }).toString(),
                });
              }}
              className="transition-all absolute left-[37px] top-[164px] w-[201px] h-[44px] bg-[#cbff0f] hover:bg-[#e1ff73] rounded-[10px] flex items-center justify-center font-creepster text-[30px] text-black disabled:bg-slate-500 disabled:cursor-not-allowed"
            >
              BATCH UNSTAKE
            </button>
          </>
        ) : (
          <div className="left-[37px] absolute top-[102px] w-[201px] h-[106px] bg-black font-creepster rounded-[10px] text-center flex  items-center justify-center text-[#cbff0f] text-[30px] leading-[30px]">
            Available
            <br />
            at gen 2<br />
            mint out!
          </div>
        )}
        <div className="absolute left-[267px] top-[109px] ">
          <div className="flex">
            <div className="font-face-agency text-[24px] text-[#cbff0f]">
              Total Deposits:
            </div>
            <div className="ml-[10px] font-face-agency text-[26px] text-white flex-auto text-center">
              {totalDeposit === undefined ? "" : totalDeposit}
            </div>
          </div>
          <div className="flex">
            <div className="font-face-agency text-[24px] text-[#cbff0f]">
              Your Deposits:
            </div>
            <div className="ml-[10px] font-face-agency text-[26px] text-white flex-auto text-center">
              {currentDeposit === undefined ? "" : currentDeposit}
            </div>
          </div>
        </div>
        <div className="absolute left-[270px] top-[190px] flex items-end">
          <div className="font-face-agency text-[22px] text-[#d44305]">
            Rate:
          </div>
          <div className="ml-[10px] font-face-agency text-[22px] text-white flex-auto text-center">
            {Rate === undefined ? "" : Rate + " CRO/Month"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StakingPool;
