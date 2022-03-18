import axios from "axios";
import { useEffect, useState } from "react";
import FormProduct from "./FormProduct";
import ListProducts from "./ListProducts";

function Main() {
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:8000/api/products/").then(({ data }) => {
      setProducts(data.products);
      setLoaded(true);
    });
  }, []);

  return (
    <>
      <div className="w-96 mx-auto my-9">
        <FormProduct />
      </div>
      {loaded && <ListProducts products={products} />}
    </>
  );
}

export default Main;
