/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import assets from "@/assets";
import Link from "next/link";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { modifyPayload } from "@/utils/modifyPayload";
import { registerPatient } from "@/services/actions/registration";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const values = modifyPayload(data);
    try {
      const res = await registerPatient(values);
      if (res?.data?.id) {
        toast.success("Patient registration successfully!");
        router.push("/login");
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box>
              <Grid container spacing={2}>
                <Grid size={{ md: 12 }} mt={2}>
                  <TextField
                    fullWidth={true}
                    size="small"
                    id="outlined-basic"
                    type="text"
                    label="Name"
                    variant="outlined"
                    {...register("patient.name")}
                  />
                </Grid>
                <Grid size={{ md: 6 }}>
                  <TextField
                    fullWidth={true}
                    size="small"
                    id="outlined-basic"
                    type="email"
                    label="Email"
                    variant="outlined"
                    {...register("patient.email")}
                  />
                </Grid>
                <Grid size={{ md: 6 }}>
                  <TextField
                    fullWidth={true}
                    size="small"
                    type="password"
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                    {...register("password")}
                  />
                </Grid>
                <Grid size={{ md: 6 }}>
                  <TextField
                    fullWidth={true}
                    size="small"
                    id="outlined-basic"
                    type="tel"
                    label="Contact Number"
                    variant="outlined"
                    {...register("patient.contactNumber")}
                  />
                </Grid>
                <Grid size={{ md: 6 }}>
                  <TextField
                    fullWidth={true}
                    size="small"
                    id="outlined-basic"
                    type="text"
                    label="Address"
                    variant="outlined"
                    {...register("patient.address")}
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
          </form>
        </Box>
      </Stack>
    </Container>
  );
};

export default page;
