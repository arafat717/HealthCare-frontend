import { getUserInfo, removeUser } from "@/services/actions/authService";
import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const AuthButton = () => {
  const router = useRouter();
  const userInfo = getUserInfo();
  const handleLogout = () => {
    removeUser();
    router.refresh();
    toast.success("LogOut successfully!");
  };
  return (
    <>
      {userInfo?.userId ? (
        <Button color="error" onClick={handleLogout}>
          Logout
        </Button>
      ) : (
        <Button component={Link} href="/login">
          Login
        </Button>
      )}
    </>
  );
};

export default AuthButton;
