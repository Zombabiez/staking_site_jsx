import React, { createContext, useReducer } from "react";
import { defaultWallet, defaultRefreshing, defaultChainData } from "../enums";

const initialState = {
  context: "welcome",
  refreshing: defaultRefreshing,
  wallet: defaultWallet,
  chainData: defaultChainData,
};

export const Store = createContext(initialState);

// The reducer takes the state and applies the action(s) to it in order to modify the store
// Each action has a type and payload
function reducer(state, action) {
  switch (action.type) {
    case "CONTEXT_UPDATED":
      return { ...state, context: action.payload };
    case "REFRESHING_UPDATED":
      return { ...state, refreshing: action.payload };
    case "WALLET_UPDATED":
      return { ...state, wallet: action.payload };
    case "CHAINDATA_UPDATED":
      return { ...state, chainData: action.payload };
    default:
      return state;
  }
}

// This is used to inject the Store at the top level in the index.tsx file
export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Store.Provider value={{ state, dispatch }}>
      {props.children}
    </Store.Provider>
  );
}
