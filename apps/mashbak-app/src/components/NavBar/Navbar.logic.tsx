import { INavBarPage } from "@/components/NavBar/type";
import {
  BallotIcon,
  Diversity1Icon,
  Diversity3Icon,
  EventIcon,
  HelpIcon,
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
  // {
  //   label: "Home",
  //   path: "/",
  //   icon: <HomeIcon />,
  // },
  {
    label: "نقاش",
    path: "/discussion",
    icon: <QuestionAnswerIcon />,
  },
  {
    label: "احداث",
    path: "/event",
    icon: <EventIcon />,
  },
  {
    label: "تصويت",
    path: "poll",
    icon: <BallotIcon />,
  },
  {
    label: "اعضاء مشبك",
    path: "/members",
    icon: <Diversity3Icon />,
  },
  {
    label: "مجموعات",
    path: "/group",
    icon: <Diversity1Icon />,
  },
  {
    label: "شغل",
    path: "/jobs",
    icon: <WorkIcon />,
  },
  {
    label: "من نحن",
    path: "/about",
    icon: <HelpIcon />,
  },
];
