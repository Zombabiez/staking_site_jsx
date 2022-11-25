import { StoreProvider } from "./Store/store-reducer";
import Dashboard from "./Pages/Dashboard/Dashboard";

function App() {
  return (
    <StoreProvider>
      <Dashboard />
    </StoreProvider>
  );
}

export default App;
