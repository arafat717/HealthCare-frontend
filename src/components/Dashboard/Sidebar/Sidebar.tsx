import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import assets from "@/assets";
import { drawerItems } from "@/utils/drawerItems";
import { UserRole } from "@/types";
import SidebarItems from "./SidebarItems";
import { getUserInfo } from "@/services/actions/authService";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const [userRole, setUserRole] = useState("");
  console.log(userRole);

  useEffect(() => {
    const role = getUserInfo();
    setUserRole(role.role);
  }, []);

  return (
    <div>
      <Stack direction="row" alignItems="center" gap={1} margin={2}>
        <Image
          src={assets.svgs.logo}
          width={40}
          height={40}
          alt="icons"
        ></Image>
        <Typography variant="h6" component="h1">
          Health Care
        </Typography>
      </Stack>
      <List>
        {drawerItems(userRole as UserRole).map((item, index) => (
          <SidebarItems key={index} item={item} index={index}></SidebarItems>
        ))}
      </List>
    </div>
  );
};

export default Sidebar;
