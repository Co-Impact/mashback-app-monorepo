import { createBrowserRouter } from "react-router";
import { Suspense } from "react";
import { Skeleton } from "@mui/material";
import {
  BlogPage,
  BusinessPage,
  BusinessProfile,
  CoursePage,
  CTFPage,
  CTFProfilePage,
  CyberWarfarePage,
  EventPage,
  EventProfile,
  HealthCheckPage,
  HomePage,
  LabProfile,
  Labs,
  PackagePage,
  UserPage,
  UserProfilePage,
  WebsitePage,
  WikiPage,
} from "./index.ts";
import RootLayout from "./RootLayout.tsx";

export const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<Skeleton />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: "/user",
        children: [
          {
            path: "",
            element: (
              <Suspense fallback={<Skeleton />}>
                <UserPage />
              </Suspense>
            ),
          },
          {
            path: ":id",
            element: (
              <Suspense fallback={<Skeleton />}>
                <UserProfilePage />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "/business",
        children: [
          {
            path: "",
            element: (
              <Suspense fallback={<Skeleton />}>
                <BusinessPage />
              </Suspense>
            ),
          },
          {
            path: ":id",
            element: (
              <Suspense fallback={<Skeleton />}>
                <BusinessProfile />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "/labs",
        children: [
          {
            path: "",
            element: (
              <Suspense fallback={<Skeleton />}>
                <Labs />
              </Suspense>
            ),
          },
          {
            path: ":id",
            element: (
              <Suspense fallback={<Skeleton />}>
                <LabProfile />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "/course",
        element: (
          <Suspense fallback={<Skeleton />}>
            <CoursePage />
          </Suspense>
        ),
      },
      {
        path: "/website",
        element: (
          <Suspense fallback={<Skeleton />}>
            <WebsitePage />
          </Suspense>
        ),
      },
      {
        path: "/wiki",
        element: (
          <Suspense fallback={<Skeleton />}>
            <WikiPage />
          </Suspense>
        ),
      },
      {
        path: "/cyberwarfare",
        element: (
          <Suspense fallback={<Skeleton />}>
            <CyberWarfarePage />
          </Suspense>
        ),
      },
      {
        path: "/blog",
        element: (
          <Suspense fallback={<Skeleton />}>
            <BlogPage />
          </Suspense>
        ),
      },
      {
        path: "/system-health",
        element: (
          <Suspense fallback={<Skeleton />}>
            <HealthCheckPage />
          </Suspense>
        ),
      },
      {
        path: "/labs",
        element: (
          <Suspense fallback={<Skeleton />}>
            <Labs />
          </Suspense>
        ),
      },
      {
        path: "/ctf",
        children: [
          {
            path: "",
            element: (
              <Suspense fallback={<Skeleton />}>
                <CTFPage />
              </Suspense>
            ),
          },
          {
            path: ":id",
            element: (
              <Suspense fallback={<Skeleton />}>
                <CTFProfilePage />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "/events",
        children: [
          {
            path: "",
            element: (
              <Suspense fallback={<Skeleton />}>
                <EventPage />
              </Suspense>
            ),
          },
          {
            path: ":id",
            element: (
              <Suspense fallback={<Skeleton />}>
                <EventProfile />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "/package",
        children: [
          {
            path: "",
            element: (
              <Suspense fallback={<Skeleton />}>
                <PackagePage />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
]);

// interface ISideRouter {
//   Icon: ReactNode;
//   path: string;
//   label: string;
//   subCategory?: {
//     Icon: ReactNode;
//     path: string;
//     label: string;
//   }[];
// }
