import React, { useEffect, useState } from "react";
import { deleteEmployee, getEmployees } from "../services/EmployeeServices";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Box, Button, Paper, Snackbar } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const ListEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();
  const [openToast, setOpenToast] = useState(false);

  useEffect(() => {
    getAllEmployees();
  }, []);

  const getAllEmployees = async () => {
    try {
      const res = await getEmployees();
      if (res.status === 200) {
        setEmployees(res.data);
      }
      console.log("res", res);
    } catch (e) {
      console.log(e);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 130 },
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    { field: "emailId", headerName: "emailId", width: 130 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 3,
          }}
        >
          <Button
            color="secondary"
            onClick={() => handleUpdate(params.row)}
            style={{ cursor: "pointer" }}
          >
            Update
          </Button>
          <Button
            color="error"
            onClick={() => handleDelete(params.row)}
            style={{ cursor: "pointer" }}
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  const handleUpdate = (row) => {
    console.log("Row", row);
    navigate(`/edit-employee/${row.id}`, { state: { row } });
  };

  const handleDelete = async (row) => {
    try {
      const res = await deleteEmployee(row.id);
      if (res.status === 204) {
        setOpenToast(true);
        getAllEmployees();
      }
    } catch (e) {
      console.log("Error");
    }
  };

  const handleClose = () => {
    setOpenToast(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex",
        alignItems: "center",
        minHeight: "calc(100vh - 100px)",
        flexDirection: "column",
        // Adjust for header and footer space
      }}
    >
      <Paper
        sx={{
          maxHeight: "100%", // Adjust to fit your content
          width: "50%", // Set the width you want
          maxWidth: "1000px", // Optional max width for responsiveness
          margin: "auto",
        }}
      >
        <Link to="/add-employee">
          <Button sx={{ margin: "10px" }} variant="contained">
            Add Employee
          </Button>
        </Link>
        <DataGrid rows={employees} columns={columns} sx={{ height: "500px" }} />
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
          severity={"success"}
          sx={{ width: "100%" }}
        >
          Employee Deleted Successfuly
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ListEmployee;
