"use client";
import { Box, Button, Stack, TextField } from "@mui/material";
import SpecialitesPage from "./component/page";
import { useState } from "react";
import { useGetSpecialtiesQuery } from "@/redux/api/specialtiesApi";

const Specilties = () => {
  const { data, isLoading } = useGetSpecialtiesQuery({});
  console.log(data);
  const [open, setOpen] = useState(false);
  return (
    <Box>
      <Stack direction="row" justifyContent="space-between">
        <Button onClick={() => setOpen(true)}>Create Specialites</Button>
        <SpecialitesPage open={open} setOpen={setOpen}></SpecialitesPage>
        <TextField size="small" placeholder="Search specialites..."></TextField>
      </Stack>
      <Box>Specialist section</Box>
    </Box>
  );
};

export default Specilties;
