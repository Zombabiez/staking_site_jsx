import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { StoreProvider } from "./Store/store-reducer";
import Dashboard from "./Pages/Dashboard";
import SelectNFTs from "./Pages/SelectNFTs";

function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/selectNFTs" element={<SelectNFTs />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </StoreProvider>
  );
}

export default App;
