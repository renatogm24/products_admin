import "./App.css";
import Main from "./components/Main";
import { Router } from "@reach/router";
import Detail from "./components/Detail";
import EditProduct from "./components/EditProduct";

function App() {
  return (
    <div>
      <Router>
        <Main path="products/" />
        <Detail path="products/:id" />
        <EditProduct path="products/:id/edit" />
      </Router>
    </div>
  );
}

export default App;
