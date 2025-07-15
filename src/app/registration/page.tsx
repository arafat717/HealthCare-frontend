/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import assets from "@/assets";
import Link from "next/link";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { modifyPayload } from "@/utils/modifyPayload";
import { registerPatient } from "@/services/actions/registration";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { userLogin } from "@/services/actions/login";
import { storeUserInfo } from "@/services/actions/authService";
import HForm from "@/components/shared/Form/HForm";
import HInput from "@/components/shared/Form/HInput";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const patientValidationSchema = z.object({
  name: z.string().min(1, "Please enter your name!"),
  email: z.string().email("Please enter a valid email address!"),
  contactNumber: z
    .string()
    .regex(/^\d{11}$/, "Please provide a valid phone number!"),
  address: z.string().min(1, "Please enter your address!"),
});

export const validationSchema = z.object({
  password: z.string().min(6, "Must be at least 6 characters!"),
  patient: patientValidationSchema,
});

export const defaultValues = {
  password: "",
  patient: {
    name: "",
    email: "",
    contactNumber: "",
    address: "",
  },
};

const page = () => {
  const router = useRouter();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const values = modifyPayload(data);
    try {
      const res = await registerPatient(values);
      if (res?.data?.id) {
        const res = await userLogin({
          email: data.patient.email,
          password: data.password,
        });
        if (res?.success) {
          if (res?.data?.accessToken) {
            storeUserInfo({ accessToken: res.data.accessToken });
          }
          toast.success("Patient registration successfully!");
          router.push("/");
        } else {
          toast.error(res.message);
        }
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <Container>
      <Stack
        sx={{
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            margin: "50px",
            boxShadow: 1,
            padding: "40px",
            maxWidth: 600,
            width: "100%",
            borderRadius: "10px",
          }}
        >
          <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
            <Box>
              <Image
                src={assets.svgs.logo}
                height={50}
                width={50}
                alt="registration"
              ></Image>
            </Box>
            <Box>
              <Typography mt={2} variant="h5" fontWeight={600}>
                Patient Registration
              </Typography>
            </Box>
          </Stack>
          <HForm
            onSubmit={onSubmit}
            resolver={zodResolver(validationSchema)}
            defaultValues={defaultValues}
          >
            <Box>
              <Grid container spacing={2}>
                <Grid size={{ md: 12 }} mt={2}>
                  <HInput fullWidth={true} label="Name" name="patient.name" />
                </Grid>
                <Grid size={{ md: 6 }}>
                  <HInput
                    fullWidth={true}
                    type="email"
                    label="Email"
                    name="patient.email"
                  />
                </Grid>
                <Grid size={{ md: 6 }}>
                  <HInput
                    fullWidth={true}
                    type="password"
                    label="Password"
                    name="password"
                  />
                </Grid>
                <Grid size={{ md: 6 }}>
                  <HInput
                    fullWidth={true}
                    type="tel"
                    label="Contact Number"
                    name="patient.contactNumber"
                  />
                </Grid>
                <Grid size={{ md: 6 }}>
                  <HInput
                    fullWidth={true}
                    label="Address"
                    name="patient.address"
                  />
                </Grid>
              </Grid>
              <Button type="submit" sx={{ marginTop: "15px" }} fullWidth={true}>
                Registration
              </Button>
              <Typography mt={2} textAlign="center">
                Do you already have an account?{" "}
                <Link color="#1586FD" href="/login">
                  Login
                </Link>
              </Typography>
            </Box>
          </HForm>
        </Box>
      </Stack>
    </Container>
  );
};

export default page;
