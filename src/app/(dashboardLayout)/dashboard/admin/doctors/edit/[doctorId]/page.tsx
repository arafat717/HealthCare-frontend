"use client";

import HForm from "@/components/shared/Form/HForm";
import HInput from "@/components/shared/Form/HInput";
import HSelectField from "@/components/shared/Form/HSelectField";
import {
  useGetDoctorQuery,
  useUpdateDoctorMutation,
} from "@/redux/api/doctorApi";
import { Gender } from "@/types";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { id } from "zod/v4/locales";

type TParams = {
  params: {
    doctorId: string;
  };
};

const DoctorUpdatePage = ({ params }: TParams) => {
  const { data, isLoading } = useGetDoctorQuery(params?.doctorId);
  const router = useRouter();
  const [updateDoctor] = useUpdateDoctorMutation();
  const handleFormSubmit = async (values: FieldValues) => {
    values.experience = Number(values.experience);
    values.apointmentFee = Number(values.apointmentFee);
    values.id = params?.doctorId;
    try {
      const res = await updateDoctor({ id: values.id, body: values }).unwrap();
      if (res?.id) {
        toast.success("Doctor updated successfully!");
        router.push("/dashboard/admin/doctors");
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  const defaultValues = {
    email: data?.email || "",
    name: data?.name || "",
    contactNumber: data?.contactNumber || "",
    address: data?.address || "",
    registrationNumber: data?.registrationNumber || "",
    gender: data?.gender || "",
    experience: data?.experience || 0,
    apointmentFee: data?.apointmentFee || 0,
    qualification: data?.qualification || "",
    currentWorkingPlace: data?.currentWorkingPlace || "",
    designation: data?.designation || "",
  };

  return (
    <Box>
      <Typography component="h5" variant="h5" mt={1}>
        Update Doctor Information
      </Typography>
      {isLoading ? (
        "Loading..."
      ) : (
        <HForm
          onSubmit={handleFormSubmit}
          defaultValues={data && defaultValues}
        >
          <Grid container spacing={2} sx={{ my: 5 }}>
            <Grid size={{ xs: 12, sm: 12, md: 4 }}>
              <HInput
                name="name"
                label="Name"
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 4 }}>
              <HInput
                name="email"
                type="email"
                label="Email"
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 4 }}>
              <HInput
                name="contactNumber"
                label="Contract Number"
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 4 }}>
              <HInput
                name="address"
                label="Address"
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 4 }}>
              <HInput
                name="registrationNumber"
                label="Registration Number"
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 4 }}>
              <HInput
                name="experience"
                type="number"
                label="Experience"
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 4 }}>
              <HSelectField
                items={Gender}
                name="gender"
                label="Gender"
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 4 }}>
              <HInput
                name="apointmentFee"
                type="number"
                label="ApointmentFee"
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 4 }}>
              <HInput
                name="qualification"
                label="Qualification"
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 4 }}>
              <HInput
                name="currentWorkingPlace"
                label="Current Working Place"
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 4 }}>
              <HInput
                name="designation"
                label="Designation"
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid>
          </Grid>
          <Button type="submit">Update</Button>
        </HForm>
      )}
    </Box>
  );
};

export default DoctorUpdatePage;
