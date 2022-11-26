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
