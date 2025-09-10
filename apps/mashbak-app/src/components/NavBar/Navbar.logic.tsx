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
    label: "الديوان",
    path: "/discussion",
    icon: <QuestionAnswerIcon />,
  },
  {
    label: "فعالياتنا الجاي",
    path: "/event",
    icon: <EventIcon />,
  },
  {
    label: "تصويت",
    path: "poll",
    icon: <BallotIcon />,
  },
  {
    label: "أعضاء شبكتنا",
    path: "/members",
    icon: <Diversity3Icon />,
  },
  {
    label: "مجموعتي",
    path: "/group",
    icon: <Diversity1Icon />,
  },
  {
    label: "فرص العمل",
    path: "/jobs",
    icon: <WorkIcon />,
  },
  {
    label: "من نحن",
    path: "/about",
    icon: <HelpIcon />,
  },
];
