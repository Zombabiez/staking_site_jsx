import toast from "react-hot-toast";
import React, { useEffect, useState } from "react";

const NFTCard = ({ ipfs }) => {
  const [metaData, setMetaData] = useState();
  const ipfsToURL = (str) => {
    return str.replace("ipfs://", "https://ipfs.io/ipfs/");
  };

  const fetchIPFSData = async (ipfs) => {
    fetch(ipfsToURL(ipfs))
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMetaData(data);
      })
      .catch((error) => {
        console.error(error);
        toast(error);
      });
  };

  useEffect(() => {
    fetchIPFSData(ipfs);
  }, []);

  return (
    <div className="w-[300px] h-[300px] bg-black border-2 border-white rounded-lg text-white overflow-hidden">
      {metaData && (
        <img src={ipfsToURL(metaData.image)} alt="" className="w-full h-full" />
      )}
    </div>
  );
};

export default NFTCard;
