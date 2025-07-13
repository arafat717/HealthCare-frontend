"use client";
import { Box, Container, Stack, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import Link from "next/link";

const Navbar = () => {
  const AuthButton = dynamic(
    () => import("@/components/Ui/AuthButton/AuthButton"),
    { ssr: false }
  );

  return (
    <Box>
      <Container>
        <Stack
          py={2}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h4" component={Link} href="/" fontWeight={600}>
            P
            <Box component="span" color="primary.main">
              H
            </Box>
            Health Care
          </Typography>

          <Stack direction="row" justifyContent="space-between" gap={4}>
            <Typography component={Link} href="/consultation" color="#0B1134CC">
              Consultation
            </Typography>
            <Typography color="#0B1134CC" component={Link} href="diagnostics">
              Diagnostics
            </Typography>
            <Typography component={Link} href="/doctors" color="#0B1134CC">
              Doctors
            </Typography>
          </Stack>
          <AuthButton></AuthButton>
        </Stack>
      </Container>
    </Box>
  );
};

export default Navbar;
