import React, { useEffect, useState } from "react";

const NFTCard = ({ tokenId, selectedList, setSelectedList }) => {
  const [imagePath, setImagePath] = useState();
  const [isSelected, setSelected] = useState(false);

  useEffect(() => {
    setImagePath(
      "https://ipfs.io/ipfs/QmRn52MzEUnd8DD2UQugi6khgPPFjrztGHBKKHgakftbnN/" +
        tokenId +
        ".png"
    );
  }, [tokenId]);

  return (
    <div
      onClick={() => {
        let res = selectedList;
        if (isSelected) {
          const index = res.indexOf(tokenId);
          if (index > -1) {
            res.splice(index, 1);
          }
          res = [...res];
        } else {
          res = [...selectedList, tokenId];
        }
        setSelected(!isSelected);
        setSelectedList(res);
      }}
      className={`transition-all cursor-pointer hover:opacity-60 w-[300px] h-[300px] bg-black border-red-500 rounded-lg text-white overflow-hidden ${
        isSelected && "border-[6px]"
      }`}
    >
      {imagePath && <img src={imagePath} alt="" className="w-full h-full" />}
    </div>
  );
};

export default NFTCard;
