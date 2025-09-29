import {
  Dashboard,
  Event,
  FeedOutlined,
  Group,
  Person,
  Psychology,
  Source,
  Store,
  Web,
} from "@mui/icons-material";
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

interface MenuItem {
  label: string;
  isLocked?: boolean;
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  path?: string;
  children?: {
    label: string;
    isLocked?: boolean;
    Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
    path: string;
  }[];
}

export const menuStructure: MenuItem[] = [
  { label: "Dashboard", path: "/", Icon: Dashboard },
  {
    label: "Users",
    Icon: Group,
    children: [
      { label: "Users", path: "/user", Icon: Person },
      { label: "Business", path: "/business", Icon: Store },
    ],
  },
  // {
  //     label: 'DevOps',
  //     Icon: Cloud,
  //     children: [
  //         { label: 'Cloud & Regions', path: '/cloud-management', Icon: Cloud },
  //         { label: 'System Health', path: '/system-health', Icon: HeartBroken,  },
  //     ],
  // },
  // {
  //     label: 'Labs',
  //     Icon: Science,
  //     children: [
  //         { label: 'CTF', path: '/ctf', Icon: FlagCircle },
  //         { label: 'Labs', path: '/labs', Icon: Science },
  //         { label: 'Cyberwar Fare', path: '/cyberwarfare', Icon: CorporateFare },
  //         { label: 'Courses', path: '/course', Icon: LocalLibrary },
  //     ],
  // },
  // {
  //     label: 'Admin',
  //     Icon: ManageAccounts,
  //     children: [
  //         { label: 'Accounting', path: '/accounting', Icon: PointOfSale },
  //         { label: 'Packages', path: '/package', Icon: Inventory },
  //     ],
  // },
  {
    label: "Content",
    Icon: Source,
    children: [
      { label: "Blogs", path: "/blog", Icon: FeedOutlined },
      { label: "Events", path: "/events", Icon: Event },
      { label: "Wiki", path: "/wiki", Icon: Psychology },
      { label: "Website", path: "/website", Icon: Web },
    ],
  },
];
