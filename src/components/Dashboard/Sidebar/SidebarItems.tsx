import Link from "next/link";
import React from "react";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { DrawerItem } from "@/types";
import { usePathname } from "next/navigation";

type TSidebarItemsProps = {
  item: DrawerItem;
  index: number;
};

const SidebarItems = ({ item, index }: TSidebarItemsProps) => {
  const linkPath = `/dashboard/${item.path}`;
  const patheName = usePathname();
  return (
    <Link href={linkPath}>
      <ListItem
        key={index}
        disablePadding
        sx={{
          ...(patheName === linkPath
            ? {
                borderRight: "3px solid #1586FD",
                "& svg": { color: "#1586FD" },
              }
            : {}),
        }}
      >
        <ListItemButton>
          <ListItemIcon>{item.icon && <item.icon></item.icon>}</ListItemIcon>
          <ListItemText primary={item.title} />
        </ListItemButton>
      </ListItem>
    </Link>
  );
};

export default SidebarItems;
