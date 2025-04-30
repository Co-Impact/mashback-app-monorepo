import { INavBarPage } from "@/components/NavBar/type";
import {
  BallotIcon,
  Diversity1Icon,
  Diversity3Icon,
  EventIcon,
  HomeIcon,
  QuestionAnswerIcon,
  WorkIcon,
} from "./index";

export const settings: Array<INavBarPage> = [
  {
    label: "Profile",
    path: "/profile",
  },
  {
    label: "Logout",
    path: "/logout",
  },
];

export const navbarPages: Array<INavBarPage> = [
  {
    label: "Home",
    path: "/",
    icon: <HomeIcon />,
  },
  {
    label: "Event",
    path: "/event",
    icon: <EventIcon />,
  },
  {
    label: "Poll",
    path: "poll",
    icon: <BallotIcon />,
  },
  {
    label: "Jobs",
    path: "/jobs",
    icon: <WorkIcon />,
  },
  {
    label: "group",
    path: "/group",
    icon: <Diversity1Icon />,
  },
  {
    label: "Discussion",
    path: "/discussion",
    icon: <QuestionAnswerIcon />,
  },
  {
    label: "Members",
    path: "/members",
    icon: <Diversity3Icon />,
  },
];
