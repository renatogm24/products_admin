import "./App.css";
import Main from "./components/Main";
import { Router } from "@reach/router";
import Detail from "./components/Detail";

function App() {
  return (
    <div>
      <Router>
        <Main path="products/" />
        <Detail path="products/:id" />
      </Router>
    </div>
  );
}

export default App;
