// helper/utils.ts
import { ethers } from "ethers"; // npm install ethers
import { defaultWallet } from "../enums";

export const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const hexToInt = (s) => {
  const bn = ethers.BigNumber.from(s);
  return parseInt(bn.toString());
};

export const actionWhenWalletChange = (e, a = "", c = defaultWallet) => {
  console.log("Wallet event detected", e); // For debugging purposes
  console.log("Event argument", a); // For debugging purposes
  console.log("Context", JSON.stringify(c)); // For debugging purposes
  // Then can insert any desired business logic
  // window.location.reload();
};

// Get the CRO balance of address
export const getCroBalance = async (serverWeb3Provider, address) => {
  const balance = await serverWeb3Provider.getBalance(address);
  // Balance is rounded at 2 decimals instead of 18, to simplify the UI
  return (
    ethers.BigNumber.from(balance)
      .div(ethers.BigNumber.from("10000000000000000"))
      .toNumber() / 100
  );
};

export const truncateAddress = (address) => {
  const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;
  const match = address.match(truncateRegex);
  if (!match) {
    return address;
  }
  return `${match[1]}…${match[2]}`;
};
