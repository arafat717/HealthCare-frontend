"use client";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import SpecialitesPage from "./component/page";
import { useState } from "react";
import {
  useDeleteSpecialtiesMutation,
  useGetSpecialtiesQuery,
} from "@/redux/api/specialtiesApi";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Image from "next/image";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "sonner";

const Specilties = () => {
  const { data, isLoading } = useGetSpecialtiesQuery({});
  console.log(data);
  const [open, setOpen] = useState(false);
  const [deleteSpecialties] = useDeleteSpecialtiesMutation();

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteSpecialties(id).unwrap();
      if (res.id) {
        toast.success("Specialties deleted successfully!");
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  const columns: GridColDef[] = [
    {
      field: "title",
      headerAlign: "center",
      align: "center",
      headerName: "Title",
      flex: 1,
    },
    {
      field: "icon",
      headerName: "Icon",
      headerAlign: "center",
      flex: 1,
      width: 300,
      renderCell: ({ row }) => {
        return (
          <Box display="flex" justifyContent="center" sx={{ mt: "5px" }}>
            <Image
              src={
                row.icon ||
                "https://res.cloudinary.com/dlukc7gsn/image/upload/v1752294565/t6dth19zkslshlrr4am8.svg"
              }
              width={30}
              height={30}
              alt="icon image"
            ></Image>
          </Box>
        );
      },
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
            <DeleteIcon />
          </IconButton>
        );
      },
    },
  ];

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between">
        <Button onClick={() => setOpen(true)}>Create Specialites</Button>
        <SpecialitesPage open={open} setOpen={setOpen}></SpecialitesPage>
        <TextField size="small" placeholder="Search specialites..."></TextField>
      </Stack>
      {!isLoading ? (
        <Box>
          <Paper sx={{ width: "100%", mt: "20px" }}>
            <DataGrid rows={data} columns={columns} sx={{ border: 0 }} />
          </Paper>
        </Box>
      ) : (
        <h1>Loading...</h1>
      )}
    </Box>
  );
};

export default Specilties;
