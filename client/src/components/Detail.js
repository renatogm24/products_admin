import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { Link } from "@reach/router";

const Detail = ({ id }) => {
  const [product, setProduct] = useState({});

  useEffect(() => {
    axios.get("http://localhost:8000/api/products/" + id).then(({ data }) => {
      setProduct(data.product);
    });
  }, []);

  return (
    <div className="w-full flex flex-col justify-center items-center h-screen text-3xl">
      <p>Title: {product.title}</p>
      <p>Description: {product.description}</p>
      <p>Price: {product.price}</p>
      <Link to="/products">
        <Button variant="contained" sx={{ marginTop: "20px" }}>
          Back to list
        </Button>
      </Link>
    </div>
  );
};

export default Detail;
