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

import { StakingRange } from "../enums";

const Heads = [undefined, Head1, Head2, Head3, Head4, Head5];
const IMGs = [undefined, undefined, bronze, silver, gold, platinum];

const StakingCard = ({ totalDeposit, currentDeposit, Rate, pool }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center w-full">
      {pool !== 1 && (
        <div className="sm:px-0 px-2 w-full flex flex-row justify-center">
          <div className="sm:w-[362px] w-full h-[50px] bg-black rounded-t-[10px] text-white font-face-agency sm:text-[32px] text-[20px] sm:tracking-[2px] flex flex-row justify-center items-center gap-2">
            <img src={IMGs[pool]} alt="" className="sm:h-auto h-[20px]" />
            For {StakingRange[pool].min}
            {pool === 5 ? "x+" : "-" + StakingRange[pool].max + "x"} Holders
          </div>
        </div>
      )}
      <div className="border-[#cbff0f] border-[8px] sm:w-[485px] sm:h-[235px] w-full h-auto rounded-[10px] bg-[#201b1b] shadow-[0_0_8px_8px_rgba(0,0,0,0.7)] flex flex-col">
        <div className="flex flex-row gap-2 items-end">
          <img
            src={Heads[pool]}
            alt=""
            className="sm:h-[80px] h-[60px] -mt-[8px] -ml-[8px]"
          />
          <p className="font-face-bison-bold sm:text-[48px] text-[35px] text-white sm:leading-[65px] leading-[50px] tracking-[2px] flex-auto text-left">
            GEN {pool === 1 ? 1 : 2} POOL
          </p>
        </div>
        <div className="flex sm:flex-row flex-col-reverse sm:flex-auto">
          <div className="flex-1 flex sm:flex-col flex-row sm:gap-0 gap-2 justify-between sm:py-6 py-1 sm:mb-0 mb-2 px-4 sm:items-center items-stretch">
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
                  className="transition-all sm:w-[201px] sm:h-[44px] w-auto h-auto sm:py-0 py-2 bg-[#cbff0f] hover:bg-[#e1ff73] rounded-[10px] flex sm:flex-initial flex-1 items-center justify-center font-creepster sm:text-[30px] text-[20px] sm:leading-[30px] leading-[20px] text-black disabled:bg-slate-500 disabled:cursor-not-allowed"
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
                  className="transition-all sm:w-[201px] sm:h-[44px] w-auto h-auto sm:p-0 py-2 bg-[#cbff0f] hover:bg-[#e1ff73] rounded-[10px] flex sm:flex-initial flex-1 items-center justify-center font-creepster sm:text-[30px] text-[20px] sm:leading-[30px] leading-[20px] text-black disabled:bg-slate-500 disabled:cursor-not-allowed"
                >
                  BATCH UNSTAKE
                </button>
              </>
            ) : (
              <div className="w-full h-full bg-black font-creepster rounded-[10px] text-center flex items-center justify-center text-[#cbff0f] sm:text-[30px] text-[20px] sm:leading-[30px] leading-[20px] sm:py-0 py-2">
                Available
                <br />
                at gen 2<br />
                mint out!
              </div>
            )}
          </div>
          <div className="flex-1 flex flex-col justify-between px-4 sm:py-4 py-2 items-center">
            <div className="flex flex-row w-full gap-2 sm:text-[24px] text-[20px]">
              <div className="font-face-agency text-[#cbff0f]">
                Total Deposits:
              </div>
              <div className="flex-auto font-face-agency text-white text-left">
                {totalDeposit}
              </div>
            </div>
            <div className="flex flex-row w-full gap-2 sm:text-[24px] text-[20px]">
              <div className="font-face-agency text-[#cbff0f]">
                Your Deposits:
              </div>
              <div className="flex-auto font-face-agency text-white text-left">
                {currentDeposit}
              </div>
            </div>
            <div className="flex flex-row w-full gap-2 sm:text-[24px] text-[20px]">
              <div className="font-face-agency text-[#d44305]">Rate:</div>
              <div className="flex-auto font-face-agency text-white text-left">
                {Rate === undefined ? "" : Rate + " CRO/Month"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StakingCard;
