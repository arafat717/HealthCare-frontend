import { USER_ROLE } from "@/constants/role";
import { DrawerItem, UserRole } from "@/types";

//icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ReviewsIcon from "@mui/icons-material/Reviews";
import TryIcon from "@mui/icons-material/Try";

export const drawerItems = (role: UserRole) => {
  const roleMenu: DrawerItem[] = [];

  switch (role) {
    case USER_ROLE.SUPER_ADMIN:
      roleMenu.push(
        {
          title: "Dashboard",
          path: `${role}`,
          icon: DashboardIcon,
        },
        {
          title: "Manage Users",
          path: `${role}/manage-users`,
          icon: GroupIcon,
        }
      );
      break;

    case USER_ROLE.ADMIN:
      roleMenu.push(
        {
          title: "Dashboard",
          path: `${role}`,
          icon: DashboardIcon,
        },
        {
          title: "Specialties",
          path: `${role}/specialties`,
          icon: TryIcon,
        },
        {
          title: "Doctors",
          path: `${role}/doctors`,
          icon: MedicalInformationIcon,
        },
        {
          title: "Schedules",
          path: `${role}/schedules`,
          icon: CalendarMonthIcon,
        },
        {
          title: "Appointments",
          path: `${role}/appointments`,
          icon: CalendarMonthIcon,
        },
        {
          title: "Reviews",
          path: `${role}/reviews`,
          icon: ReviewsIcon,
        }
      );
      break;

    case USER_ROLE.DOCTOR:
      roleMenu.push(
        {
          title: "Dashboard",
          path: `${role}`,
          icon: DashboardIcon,
        },
        {
          title: "Schedules",
          path: `${role}/schedules`,
          icon: CalendarMonthIcon,
        },
        {
          title: "Appointments",
          path: `${role}/appointment`,
          icon: CalendarMonthIcon,
        }
      );
      break;

    case USER_ROLE.PATIENT:
      roleMenu.push(
        {
          title: "Appointments",
          path: `${role}/appointments`,
          icon: DashboardIcon,
        },
        {
          title: "Prescriptions",
          path: `${role}/prescriptions`,
          icon: DashboardIcon,
        },
        {
          title: "Payment History",
          path: `${role}/payment-history`,
          icon: DashboardIcon,
        }
      );
      break;

    default:
      break;
  }
  return [...roleMenu];
};
