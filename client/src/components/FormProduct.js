import { Alert, Button, Collapse, IconButton, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import { upperFirst } from "lodash";

const FormProduct = () => {
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
      .post("http://localhost:8000/api/products/new", {
        data: inputs,
      })
      .then((res) => {
        console.log(res);
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
        }, 2000);
      })
      .catch((error) => {
        const {
          data: {
            error: { errors },
          },
        } = error.response;

        if (errors.price.name === "CastError") {
          errors.price.message = "Price must be a number";
        }

        console.log(errors);
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
      className="flex flex-col gap-4"
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
        Enviar
      </Button>
    </form>
  );
};

export default FormProduct;
