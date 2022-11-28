export const defaultWallet = {
  walletProviderName: "",
  address: "",
  browserWeb3Provider: null,
  serverWeb3Provider: null,
  connected: false,
  chainId: 0,
};

export const defaultRefreshing = {
  status: false,
  message: "Please wait a few seconds...",
};

export const defaultChainData = {
  croBalance: 0,
};

export const defaultStakeContracts = {
  ZombabieStakingPool1: undefined,
  ZombabieStakingPool2: undefined,
  ZombabieStakingPool3: undefined,
  ZombabieStakingPool4: undefined,
  ZombabieStakingPool5: undefined,
};

export const defaultGenInfo = {
  totalDeposit: undefined,
  currentDeposit: undefined,
  Rate: undefined,
};

export const StakingRange = [
  {},
  {
    min: 1,
    max: Number.MAX_VALUE,
  },
  {
    min: 1,
    max: 5,
  },
  {
    min: 6,
    max: 15,
  },
  {
    min: 16,
    max: 39,
  },
  {
    min: 40,
    max: Number.MAX_VALUE,
  },
];
