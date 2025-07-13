/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-unescaped-entities */
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
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { TLogin, userLogin } from "@/services/actions/login";

const page = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLogin>();
  const onSubmit: SubmitHandler<TLogin> = async (data) => {
    try {
      const res = await userLogin(data);
      console.log(res);
      if (res?.success) {
        toast.success("Patient Login successfully!");
        router.push("/");
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
              <Typography m={2} variant="h5" fontWeight={600}>
                Patient Login
              </Typography>
            </Box>
          </Stack>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box>
              <Grid container spacing={2}>
                <Grid size={{ md: 6 }}>
                  <TextField
                    fullWidth={true}
                    size="small"
                    id="outlined-basic"
                    type="email"
                    label="Email"
                    {...register("email")}
                    variant="outlined"
                  />
                </Grid>
                <Grid size={{ md: 6 }}>
                  <TextField
                    fullWidth={true}
                    size="small"
                    id="outlined-basic"
                    type="password"
                    label="Password"
                    {...register("password")}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              <Typography mt={2} textAlign="end" component="p" fontWeight={300}>
                Forgot Password?
              </Typography>
              <Button type="submit" sx={{ marginTop: "15px" }} fullWidth={true}>
                Registration
              </Button>
              <Typography mt={2} textAlign="center">
                Don't have any account?{" "}
                <Link color="#1586FD" href="/registration">
                  Create an account
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
