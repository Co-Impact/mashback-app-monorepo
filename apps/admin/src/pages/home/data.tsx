import {
  Group,
  BusinessRounded,
  ScienceRounded,
  SecurityRounded,
} from '@mui/icons-material';
import { amber, green, purple, red } from '@mui/material/colors';

export const dashboardWidgets = [
  {
    title: "Total Users",
    count: 1250,
    icon: <Group fontSize="large" />,
    color: amber[500],
    subtitle: "Active Users",
    subTitleCount: 950,
  },
  {
    title: "Total Businesses",
    count: 300,
    icon: <BusinessRounded fontSize="large" />,
    color: green[500],
    subtitle: "Verified",
    subTitleCount: 240,
  },
  {
    title: "Total Labs",
    count: 85,
    icon: <ScienceRounded fontSize="large" />,
    color: purple[500],
    subtitle: "Active Labs",
    subTitleCount: 60,
  },
  {
    title: "Total CTFs",
    count: 40,
    icon: <SecurityRounded fontSize="large" />,
    color: red[500],
    subtitle: "Live CTFs",
    subTitleCount: 10,
  },
];


export const usersByCountryData = [
  { country: 'USA', value: 400 },
  { country: 'India', value: 350 },
  { country: 'Germany', value: 200 },
  { country: 'UK', value: 150 },
  { country: 'Canada', value: 100 },
];

export const topUsersGlobalData = [
  { user: 'Alice', value: 1200 },
  { user: 'Bob', value: 1100 },
  { user: 'Charlie', value: 950 },
  { user: 'David', value: 900 },
  { user: 'Eva', value: 850 },
];

