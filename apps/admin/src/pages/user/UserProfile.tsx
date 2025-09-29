import React, { useEffect, useMemo, useState } from "react";
import { Avatar, Box, Card, CardContent, Container, Grid, Paper, Stack, Switch, Typography } from "@mui/material";
import { useParams } from "react-router";
import UserProfileSkeleton from "./UserProfileSkeleton";
import { PageTabs, TabItem } from "../../components/Tabs/Tabs";
import { useGetUserByID } from "../../api/usersRequest/getUsers.tsx";
import { useUpdateProfile } from "../../api/usersRequest/updateProfile.ts";
import { toast } from "react-toastify";
import UserTeamsTab from "./UserProfileTabs/UserTeamsTab.tsx";
import UserStatisticsTab from "./UserProfileTabs/UserStatisticsTab.tsx";
import UserDetailsTab from "./UserProfileTabs/UserDetailsTab.tsx";
import UserEventsTab from "./UserProfileTabs/UserEventsTab.tsx";
import UserBillingsTab from "./UserProfileTabs/UserBillingsTab.tsx";

const UserProfilePage: React.FC = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetUserByID(id ?? "");
  const updateProfile = useUpdateProfile();
  const [userIsActive, setUserIsActive] = useState(false);

  useEffect(() => {
    if (!data) return;
    setUserIsActive(data.isOnline ?? false);
  }, [data]);

  const tabs: TabItem[] = useMemo(
    () => [
      {
        label: "User Details",
        value: "user-details",
        children: <UserDetailsTab currentUser={data!} />,
      },
      {
        label: "Group",
        value: "teams",
        children: <UserTeamsTab currentUser={data!} />,
      },
      {
        label: "Events",
        value: "events",
        children: <UserEventsTab currentUser={data!} />,
      },
      {
        label: "Statistics",
        value: "statistics",
        children: <UserStatisticsTab currentUser={data!} />,
      },
      {
        label: "Coffee Meetings",
        value: "bilings",
        children: <UserBillingsTab currentUser={data!} />,
      },
    ],
    [data],
  );

  if (!data || isLoading) {
    return <UserProfileSkeleton />;
  }

  async function handleActiveChange() {
    if (!id) {
      toast.error("ID is required");
      return;
    }
    try {
      setUserIsActive((prev) => !prev);
      await updateProfile.mutateAsync({ id, isActive: !userIsActive });
    } catch (err) {
      setUserIsActive(!!data?.isOnline);
    }
  }

  return (
    <Box sx={{ minHeight: "100vh", pb: 5 }}>
      <Container>
        <Grid container spacing={2} alignItems="stretch">
          {/* Sidebar */}
          <Grid item xs={12} md={3.5}>
            <Box sx={{ height: "100%" }}>
              <Card sx={{ height: "100%" }}>
                <CardContent
                  sx={{ textAlign: "center", justifyContent: "center" }}
                >
                  <Stack alignItems={"center"} spacing={1}>
                    <Avatar
                      alt={`${data.firstName} ${data.lastName}`}
                      src={data.imageUrl || ""}
                      sx={{ width: 100, height: 100, margin: "0 auto", mb: 2 }}
                    />
                    <Typography variant="h6">{`${data.firstName} ${data.lastName}`}</Typography>
                    <Stack
                      width="max-content"
                      justifyContent="start"
                      alignItems="center"
                      spacing={2}
                    >
                      <Stack
                        width="100%"
                        direction="row"
                        alignItems="center"
                        spacing={1}
                      >
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          Active Status
                        </Typography>
                        <Switch
                          checked={userIsActive}
                          onChange={handleActiveChange}
                        />
                      </Stack>
                      <Stack width="100%" direction="row" spacing={1}>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          Account Created:
                        </Typography>
                        <Typography variant="body1">
                          {new Date(data.createdAt).toLocaleDateString()}
                        </Typography>
                      </Stack>
                      <Stack width="100%" direction="row" spacing={1}>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          Company Name:
                        </Typography>
                        <Typography variant="body1">{"---"}</Typography>
                      </Stack>
                      <Stack width="100%" direction="row" spacing={1}>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          Position:
                        </Typography>
                        <Typography variant="body1">{"---"}</Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Box>
          </Grid>

          {/* Main content */}
          <Grid item xs={12} md={8.5}>
            <Box sx={{ height: "100%" }}>
              <Paper sx={{ height: "100%" }}>
                <PageTabs
                  tabs={tabs}
                  tabLabelsContainerStyle={{ border: "none" }}
                />
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default UserProfilePage;
