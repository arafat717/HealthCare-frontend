/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-unescaped-entities */
"use client";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import assets from "@/assets";
import Link from "next/link";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { userLogin } from "@/services/actions/login";
import { storeUserInfo } from "@/services/actions/authService";
import HForm from "@/components/shared/Form/HForm";
import HInput from "@/components/shared/Form/HInput";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const LoginUserValidation = z.object({
  email: z.string().email("Please provide a valid email!"),
  password: z.string().min(6, "Must be at least 6 characters!"),
});

const page = () => {
  const router = useRouter();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await userLogin(data);
      if (res?.success) {
        if (res?.data?.accessToken) {
          storeUserInfo({ accessToken: res.data.accessToken });
        }
        toast.success("Patient Login successfully!");
        router.push("/");
      } else {
        toast.error(res.message);
      }
    } catch (err: any) {
      toast.error(err.message);
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
          <HForm
            onSubmit={onSubmit}
            resolver={zodResolver(LoginUserValidation)}
            defaultValues={{
              email: "",
              password: "",
            }}
          >
            <Box>
              <Grid container spacing={2}>
                <Grid size={{ md: 6 }}>
                  <HInput
                    fullWidth={true}
                    size="small"
                    type="email"
                    label="Email"
                    name="email"
                  />
                </Grid>
                <Grid size={{ md: 6 }}>
                  <HInput
                    fullWidth={true}
                    size="small"
                    type="password"
                    label="Password"
                    name="password"
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
          </HForm>
        </Box>
      </Stack>
    </Container>
  );
};

export default page;
