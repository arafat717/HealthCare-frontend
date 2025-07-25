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
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "sonner";
import { useDebounced } from "@/redux/Hooks";
import Link from "next/link";

const DoctorsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const query: Record<string, any> = {};
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedTerm = useDebounced({
    searchTerm: searchTerm,
    delay: 600,
  });
  if (!!debouncedTerm) {
    query["searchTerm"] = searchTerm;
  }

  const { data, isLoading } = useGetAllDoctorsQuery({ ...query });
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
          <Box>
            <IconButton
              aria-label="delete"
              onClick={() => handleDelete(row.id)}
            >
              <GridDeleteIcon />
            </IconButton>
            <Link href={`/dashboard/admin/doctors/edit/${row.id}`}>
              <IconButton>
                <EditIcon />
              </IconButton>
            </Link>
          </Box>
        );
      },
    },
  ];

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Button onClick={() => setIsModalOpen(true)}>Create New Doctor</Button>
        <DoctorModal open={isModalOpen} setOpen={setIsModalOpen} />
        <TextField
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          size="small"
          placeholder="search doctors"
        />
      </Stack>
      {!isLoading ? (
        <Box>
          <Paper sx={{ width: "100%", mt: "20px", boxShadow: "0" }}>
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
