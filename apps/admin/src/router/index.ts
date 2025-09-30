import { lazy } from "react";

const UserPage = lazy(() => import("../pages/user/User.tsx"));
const BusinessPage = lazy(() => import("../pages/business/business.tsx"));
const HomePage = lazy(() => import("../pages/home/Home.tsx"));
const CoursePage = lazy(() => import("../pages/course/CoursePage.tsx"));
const CTFPage = lazy(() => import("../pages/CTF/CTFPage.tsx"));
const CTFProfilePage = lazy(() => import("../pages/CTF/CTFProfilePage.tsx"));
const Labs = lazy(() => import("../pages/Labs/Labs.tsx"));
const GroupPage = lazy(() => import("../pages/group/group.tsx"));
const BusinessProfile = lazy(
  () => import("../pages/business/BusinessProfile.tsx"),
);
const UserProfilePage = lazy(() => import("../pages/user/UserProfile.tsx"));
const LabProfile = lazy(() => import("../pages/Labs/LabProfile.tsx"));

const EventPage = lazy(() => import("../pages/Events/EventsPage.tsx"));
const WebsitePage = lazy(() => import("../pages/Website/Website.tsx"));
const WikiPage = lazy(() => import("../pages/Wiki/Wiki.tsx"));
const EventProfile = lazy(() => import("../pages/Events/EventProfile.tsx"));
const PackagePage = lazy(() => import("../pages/Package/PackagePage.tsx"));
const HealthCheckPage = lazy(
  () => import("../pages/HealthCheckPage/HealthCheckPage.tsx"),
);
const CyberWarfarePage = lazy(
  () => import("../pages/CyberWarfare/CyberWarfarePage.tsx"),
);
export {
  WebsitePage,
  CyberWarfarePage,
  WikiPage,
  HealthCheckPage,
  UserPage,
  BusinessPage,
  HomePage,
  CoursePage,
  Labs,
  GroupPage,
  BusinessProfile,
  UserProfilePage,
  LabProfile,
  EventProfile,
  EventPage,
  PackagePage,
  CTFPage,
  CTFProfilePage,
};
