import { FC } from "react";
import { Table } from "../../components/Table/GenericTable.tsx";
import { inviteTable, usersTable } from "../../api/data/data.tsx";
import {
  useGetAllUsers,
  useGetUsersStatistics,
} from "../../api/usersRequest/getUsers.tsx";
import {
  Box,
  Container,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import InviteUserDialog from "../../components/Dialog/InviteUserDialog.tsx";
import ShowSkeleton from "../../components/Skeleton/ShowSkeleton.tsx";
import { useGetAllInviteUsers } from "../../api/inviteUserRequest/getInviteRequest.ts";
import CardV2 from "../../components/Card/CardV2.tsx";

const UserPage: FC = () => {
  const { data, isError, isLoading } = useGetAllUsers();
  console.log(data?.length);
  const { data: statisticData, isLoading: statisticLoading } =
    useGetUsersStatistics();

  const invitedUsers = useGetAllInviteUsers();

  const cards = [
    {
      title: "Total Users",
      value: statisticData?.totalCount?.toString() ?? "",
    },
    {
      title: "Total Private Users",
      value: statisticData?.privateCount?.toString() ?? "",
      path: "/user",
    },
    {
      title: "Total Business Users",
      value: statisticData?.companyCount?.toString() ?? "",
      path: "/business",
    },
  ];

  return (
    <Container>
      <Box>
        <Grid container spacing={3}>
          {cards.map(({ title, value }, index) => (
            <Grid xs={12} sm={3} md={6} lg={4} key={index}>
              {!statisticLoading ? (
                <CardV2
                  title={
                    <Stack>
                      <Typography variant="h6">{title}</Typography>
                      <Typography variant="h5">{value}</Typography>
                    </Stack>
                  }
                />
              ) : (
                <Skeleton />
              )}
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box
        sx={{
          justifyContent: "space-between",
          display: "flex",
          marginBottom: "30px",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" sx={{ color: "text.primary" }}>
          Users
        </Typography>
        <Box>
          <InviteUserDialog />
        </Box>
      </Box>
      <Grid container spacing={2}>
        <Grid>
          {isLoading || isError ? (
            <ShowSkeleton columnCount={4} viewType="table" />
          ) : (
            data && <Table data={data} columnsProp={usersTable} />
          )}
        </Grid>
        <Grid>
          {invitedUsers.isLoading || invitedUsers.isError ? (
            <ShowSkeleton columnCount={2} viewType="table" />
          ) : (
            invitedUsers.data && (
              <Table data={invitedUsers.data || []} columnsProp={inviteTable} />
            )
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserPage;
