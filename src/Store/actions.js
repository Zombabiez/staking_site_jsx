// Send an action to the reducer

export const updateContextAction = (dispatch, context) => {
  return dispatch({
    type: "CONTEXT_UPDATED",
    payload: context,
  });
};

export const updateRefreshingAction = (dispatch, refreshing) => {
  return dispatch({
    type: "REFRESHING_UPDATED",
    payload: refreshing,
  });
};

export const updateWalletAction = (dispatch, wallet) => {
  return dispatch({
    type: "WALLET_UPDATED",
    payload: wallet,
  });
};

export const updateChainDataAction = (dispatch, chainData) => {
  return dispatch({
    type: "CHAINDATA_UPDATED",
    payload: chainData,
  });
};

export const updateStakeContracts = (dispatch, StakeContract) => {
  return dispatch({
    type: "STAKECONTRACTS_UPDATED",
    payload: StakeContract,
  });
};

export const updateZombabieNFTContract = (dispatch, ZombabieNFTContract) => {
  return dispatch({
    type: "ZOMBABIENFTCONTRACT_UPDATED",
    payload: ZombabieNFTContract,
  });
};

export const updateZombabieNFTGen1Contract = (
  dispatch,
  ZombabieNFTGen1Contract
) => {
  return dispatch({
    type: "ZOMBABIENFTGEN1CONTRACT_UPDATED",
    payload: ZombabieNFTGen1Contract,
  });
};

export const updateZombabieNFTGen2Contract = (
  dispatch,
  ZombabieNFTGen2Contract
) => {
  return dispatch({
    type: "ZOMBABIENFTGEN2CONTRACT_UPDATED",
    payload: ZombabieNFTGen2Contract,
  });
};
