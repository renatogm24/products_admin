import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "@reach/router";
import axios from "axios";

const ListProducts = ({ products, removeFromDom }) => {
  const deletePerson = (productId) => {
    axios
      .delete("http://localhost:8000/api/products/" + productId)
      .then((res) => {
        removeFromDom(productId);
      });
  };

  const columns = [
    { field: "_id", headerName: "ID", flex: 1 },
    {
      field: "title",
      headerName: "Title",
      flex: 1,
      renderCell: (params) => (
        <Link to={`/products/${params.row._id}`}>{params.row.title}</Link>
      ),
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      flex: 1,
    },
    { field: "description", headerName: "Description", flex: 3 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="contained"
          onClick={(e) => {
            deletePerson(params.row._id);
          }}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div
      style={{
        height: 400,
        width: "50%",
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <DataGrid
        rows={products}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        getRowId={(elem) => elem._id}
        sx={{
          "& .MuiDataGrid-cell'": {
            textAlign: "center",
          },
          "& .MuiDataGrid-cell:hover": {
            color: "primary.main",
          },
        }}
      />
    </div>
  );
};

export default ListProducts;
