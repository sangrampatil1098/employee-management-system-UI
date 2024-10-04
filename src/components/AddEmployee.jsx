import { Alert, Button, Grid2, Input, Paper, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { addEmployee, editEmployee } from "../services/EmployeeServices";

const AddEmployee = () => {
  const [formData, setFormData] = useState({});
  const [toastMessage, setToastMessage] = useState("");
  const [validationError, setValidationError] = useState("");
  const [openToast, setOpenToast] = useState(false);
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const { id } = useParams();
  const location = useLocation();
  console.log("location", location);
  useEffect(() => {
    if (id) {
      setFormData({ ...location.state.row });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    console.log(e);
  };
  console.log("formData", formData);
  const handleCancel = () => {
    setFormData({ firstName: "", lastName: "", emailId: "" });
    navigate("/");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.emailId) {
      setValidationError("Please fill all the form fields");
      setOpenToast(true);
      return;
    }
    const payload = { ...formData };
    if (id) {
      try {
        const res =await editEmployee(id, payload);
        if (res.status === 200) {
          setOpenToast(true);
          setToastMessage("Employee edited successfuly");
          let timeout;
          if (timeout) {
            clearTimeout(timeout);
          }
          timeout = setTimeout(() => {
            navigate("/");
          }, 1000);
        }
      } catch (e) {
        console.log("Error");
      }
    } else {
      try {
        const res = await addEmployee(payload);
        if (res.status === 200) {
          setOpenToast(true);
          setToastMessage("Employee added successfuly");
          let timeout;
          if (timeout) {
            clearTimeout(timeout);
          }
          timeout = setTimeout(() => {
            navigate("/");
          }, 1000);
        }
      } catch (e) {
        console.log("Error");
      }
    }

    console.log("payload", payload);
  };

  const handleClose = () => {
    setToastMessage("");
    setOpenToast(false);
    setValidationError("");
  };

  const title = id ? "Edit Employee Form" : "Add Employee Form";

  return (
    <>
      <Paper
        sx={{
          width: "30%",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
          padding: 2,
        }}
      >
        <h5 style={{ textAlign: "center", marginBottom: 20 }}>{title}</h5>

        <form onSubmit={handleSubmit} method="post">
          <Grid2
            container
            columns={12}
            spacing={2}
            justifyContent="center" // Center horizontally
            alignItems="center" // Center vertically (for items within the grid)
            direction="column" // Arrange items in a column
          >
            <Grid2 item md={12} xs={12} sm={12} width={"70%"}>
              <Input
                placeholder="First Name"
                name="firstName"
                value={formData.firstName}
                sx={{ width: "100%" }}
                onChange={handleChange}
              />
            </Grid2>
            <Grid2 item xs={12} width={"70%"}>
              <Input
                placeholder="Last Name"
                name="lastName"
                value={formData.lastName}
                sx={{ width: "100%" }}
                onChange={handleChange}
              />
            </Grid2>
            <Grid2 item xs={12} width={"70%"}>
              <Input
                placeholder="Email Id"
                name="emailId"
                value={formData.emailId}
                sx={{ width: "100%" }}
                onChange={handleChange}
              />
            </Grid2>
            <Grid2 item xs={12} width={"70%"}>
              <Grid2
                container
                justifyContent="space-between"
                alignItems="center"
                spacing={1}
              >
                <Grid2 item xs={6}>
                  <Button fullWidth type="submit" variant="contained">
                    Submit
                  </Button>
                </Grid2>
                <Grid2 item xs={6}>
                  <Button fullWidth variant="contained" onClick={handleCancel}>
                    Cancel
                  </Button>
                </Grid2>
              </Grid2>
            </Grid2>
          </Grid2>
        </form>
      </Paper>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={openToast}
        autoHideDuration={3000}
        onClose={handleClose}
        key={"bottom" + "left"}
      >
        <Alert
          onClose={handleClose}
          severity={validationError ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {toastMessage || validationError}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddEmployee;
