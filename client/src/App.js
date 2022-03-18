import "./App.css";
import Main from "./components/Main";
import { Router } from "@reach/router";
import Detail from "./components/Detail";
import EditProduct from "./components/EditProduct";
import { useState } from "react";

function App() {
  const [products, setProducts] = useState([]);

  const removeFromDom = (productId) => {
    setProducts(products.filter((product) => product._id !== productId));
  };

  return (
    <div>
      <Router>
        <Main
          path="products/"
          products={products}
          setProducts={setProducts}
          removeFromDom={removeFromDom}
        />
        <Detail path="products/:id" removeFromDom={removeFromDom} />
        <EditProduct path="products/:id/edit" />
      </Router>
    </div>
  );
}

export default App;
