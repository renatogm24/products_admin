import { Alert, Button, Collapse, IconButton, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import { upperFirst } from "lodash";
import { navigate } from "@reach/router";

const EditProduct = (props) => {
  const { id } = props;

  const [inputs, setInputs] = useState({
    title: "",
    price: "",
    description: "",
  });

  const [errors, setErrors] = useState({
    title: {
      message: "",
    },
    price: {
      message: "",
    },
    description: {
      message: "",
    },
  });

  useEffect(() => {
    axios.get("http://localhost:8000/api/products/" + id).then(({ data }) => {
      setInputs({
        title: data.product.title,
        price: data.product.price,
        description: data.product.description,
      });
    });
  }, []);

  const onChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });

    if (
      e.target.value.length < 3 &&
      e.target.value !== "" &&
      e.target.name !== "price"
    ) {
      setErrors({
        ...errors,
        [e.target.name]: {
          message: `${upperFirst(e.target.name)} must be at least 2 characters`,
        },
      });
    } else {
      setErrors({
        ...errors,
        [e.target.name]: { message: "" },
      });
    }
  };

  const [alert, setAlert] = useState({
    messsage: "",
    open: false,
    status: "success",
  });

  const handleSubmit = (e, inputs) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8000/api/products/${id}`, inputs)
      .then((res) => {
        setAlert({
          open: true,
          status: "success",
          message: "Product was added!",
        });
        setTimeout(() => {
          setAlert({
            status: "success",
            message: "Product was added!",
            open: false,
          });
          navigate("/products");
        }, 2000);
      })
      .catch(({ response }) => {
        let errors;

        if ("errors" in response.data.error) {
          errors = response.data.error.errors;
        } else {
          errors = {
            [response.data.error.path]: response.data.error,
          };
        }

        if (errors.price && errors.price.name === "CastError") {
          errors.price.message = "Price must be a number";
        }

        setErrors(errors);
        setAlert({
          open: true,
          status: "error",
          message: "An error occurred, try again",
        });
        setTimeout(() => {
          setAlert({
            status: "error",
            message: "An error occurred, try again",
            open: false,
          });
        }, 2000);
      });
  };

  return (
    <form
      className="flex flex-col gap-4 w-96 mx-auto"
      onSubmit={(e) => handleSubmit(e, inputs)}
    >
      <Collapse in={alert.open}>
        <Alert
          severity={alert.status}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setAlert({ ...alert, open: false });
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {alert.message}
        </Alert>
      </Collapse>
      <TextField
        id="outlined-basic"
        label="Title"
        variant="outlined"
        name="title"
        onChange={onChange}
        value={inputs.title}
        error={!!errors.title?.message}
        helperText={errors.title?.message}
      />
      <TextField
        id="outlined-basic"
        label="Price"
        variant="outlined"
        name="price"
        onChange={onChange}
        value={inputs.price}
        error={!!errors.price?.message}
        helperText={errors.price?.message}
      />
      <TextField
        id="outlined-basic"
        label="Description"
        variant="outlined"
        name="description"
        onChange={onChange}
        value={inputs.description}
        error={!!errors.description?.message}
        helperText={errors.description?.message}
      />
      <Button variant="contained" type="submit">
        Update
      </Button>
    </form>
  );
};

export default EditProduct;
