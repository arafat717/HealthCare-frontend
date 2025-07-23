"use client";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import DoctorModal from "./components/DoctorModal";
import {
  useDeleteDoctorMutation,
  useGetAllDoctorsQuery,
} from "@/redux/api/doctorApi";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { GridDeleteIcon } from "@mui/x-data-grid";
import { toast } from "sonner";

const DoctorsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { data, isLoading } = useGetAllDoctorsQuery({});
  console.log(data);
  const doctors = data?.doctors;
  const meta = data?.meta;

  const [deleteDoctor] = useDeleteDoctorMutation();

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteDoctor(id).unwrap();
      if (res.id) {
        toast.success("Doctor deleted successfully!");
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  const columns: GridColDef[] = [
    {
      field: "name",
      headerAlign: "center",
      align: "center",
      headerName: "Title",
      flex: 1,
    },
    {
      field: "contactNumber",
      headerAlign: "center",
      align: "center",
      headerName: "Contact Number",
      flex: 1,
    },
    {
      field: "email",
      headerAlign: "center",
      align: "center",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        return (
          <IconButton aria-label="delete" onClick={() => handleDelete(row.id)}>
            <GridDeleteIcon />
          </IconButton>
        );
      },
    },
  ];

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Button onClick={() => setIsModalOpen(true)}>Create New Doctor</Button>
        <DoctorModal open={isModalOpen} setOpen={setIsModalOpen} />
        <TextField size="small" placeholder="search doctors" />
      </Stack>
      {!isLoading ? (
        <Box>
          <Paper sx={{ width: "100%", mt: "20px" }}>
            <DataGrid rows={doctors} columns={columns} sx={{ border: 0 }} />
          </Paper>
        </Box>
      ) : (
        <h1>Loading...</h1>
      )}
    </Box>
  );
};

export default DoctorsPage;
