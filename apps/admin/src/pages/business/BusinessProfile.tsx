import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Paper,
  Stack,
  Switch,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useParams } from "react-router";
import { TabItem } from "../../components/Tabs/Tabs";
import { toast } from "react-toastify";
import UserProfileSkeleton from "../user/UserProfileSkeleton.tsx";
import { useGetBusiness } from "../../api/businessRequest/getBusiness.ts";
import { useQuery } from "@tanstack/react-query";
import { useUpdateBusiness } from "../../api/businessRequest/postBusiness.ts";

const BusinessProfile: React.FC = () => {
  const { id } = useParams();
  const { getBusinessByID } = useGetBusiness();
  const { data, isLoading } = useQuery(getBusinessByID(id as string));
  const updateProfile = useUpdateBusiness();
  const [userIsActive, setUserIsActive] = useState(false);
  const [tab, setTab] = useState(0);

  useEffect(() => {
    if (!data) return;
    setUserIsActive(data.isActive);
  }, [isLoading, data]);

  console.log(data);

  if (!data || isLoading) {
    return <UserProfileSkeleton />;
  }

  const tabs: TabItem[] = [
    {
      label: "CTF",
      value: "ctf",
      isLocked: true,
      children: <></>,
    },
    {
      label: "Users",
      value: "users",
      isLocked: true,
      children: <></>,
    },
  ];

  async function handleActiveChange() {
    if (!id) {
      toast.error("ID is required");
      return;
    }
    try {
      setUserIsActive((prev) => !prev);
      await updateProfile.mutateAsync({ id, isActive: !userIsActive });
    } catch (err) {
      setUserIsActive(data?.isActive ? true : false);
    }
  }

  return (
    <Box sx={{ minHeight: "100vh", pb: 5 }}>
      <Container>
        <Grid container spacing={4} alignItems={"stretch"}>
          {/* Sidebar */}
          <Grid item xs={12} md={3.5}>
            <Card>
              <CardContent
                sx={{ textAlign: "center", justifyContent: "center" }}
              >
                <Stack alignItems={"center"} spacing={1}>
                  <Avatar
                    alt={`${data.name} ${data.name}`}
                    src={data.logoUrl || ""}
                    sx={{ width: 100, height: 100, margin: "0 auto", mb: 2 }}
                  />
                  <Typography variant="h6">{data.name} </Typography>
                  <Stack
                    width="max-content"
                    justifyContent={"start"}
                    alignItems={"center"}
                    spacing={2}
                  >
                    <Stack
                      width={"100%"}
                      direction={"row"}
                      alignItems={"center"}
                      spacing={1}
                    >
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: 600 }}
                        fontWeight={600}
                      >
                        Account Status
                      </Typography>
                      <Switch
                        checked={userIsActive}
                        onChange={handleActiveChange}
                      />
                    </Stack>
                    <Stack width={"100%"} direction="row" spacing={1}>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        Account Created:
                      </Typography>
                      <Typography variant="body1">
                        {data?.createdAt
                          ? new Date(data?.createdAt).toLocaleDateString()
                          : "---"}
                      </Typography>
                    </Stack>
                    <Stack width={"100%"} direction="row" spacing={1}>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        Country:
                      </Typography>
                      <Typography variant="body1">{data.country}</Typography>
                    </Stack>
                    <Stack width={"100%"} direction="row" spacing={1}>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        Email:
                      </Typography>
                      <Typography variant="body1">{data.email}</Typography>
                    </Stack>
                    <Stack width={"100%"} direction="row" spacing={1}>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        Phone:
                      </Typography>
                      <Typography variant="body1">{data.phone}</Typography>
                    </Stack>
                    <Stack width={"100%"} direction="row" spacing={1}>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        Business size:
                      </Typography>
                      <Typography variant="body1">{data.size}</Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={8.5}>
            <Grid container spacing={2}>
              {Array(3)
                .fill("")
                .map((_, i) => (
                  <Grid key={i} item xs={12} sm={6} md={4}>
                    <Card sx={{ bgcolor: "background.paper" }}>
                      <CardContent>
                        <Stack spacing={1}>
                          <Typography
                            variant="h4"
                            sx={{ color: "text.primary" }}
                          >
                            5
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{ color: "text.primary" }}
                          >
                            All Bookings
                          </Typography>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}

              <Grid item xs={12}>
                <Paper sx={{ height: 300 }}>
                  <Tabs
                    value={tab}
                    onChange={(e, newValue) => setTab(newValue)}
                  >
                    <Tab label="Appointments" />
                    <Tab label="Invoices" />
                  </Tabs>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default BusinessProfile;
