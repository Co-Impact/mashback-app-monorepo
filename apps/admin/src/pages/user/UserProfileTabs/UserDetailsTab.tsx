import { FC, useEffect, useState } from "react";
import { UserProfile } from ".././types";
import { Grid, Stack, Typography } from "@mui/material";

interface UserDetailsTabProps {
  currentUser: UserProfile;
}
const UserDetailsTab: FC<UserDetailsTabProps> = ({ currentUser }) => {
  const [data, setData] = useState<{ label: string; value: string | number }[]>(
    [],
  );

  useEffect(() => {
    const user = {
      firstName: currentUser.firstName || "",
      lastName: currentUser.lastName || "",
      email: currentUser.email || "",
      phone: currentUser.phone || "", // Optional field
      country: currentUser.country || "",
      imageUrl: currentUser.imageUrl || "", // Optional field
      isOnline: currentUser.isOnline ?? true,
      isNew: currentUser.isNew ?? true,
      dateOfBirth: currentUser.dateOfBirth || null, // Optional field
      website: currentUser.website || "", // Optional field
      points: currentUser.points ?? 0,
      bio: currentUser.bio || "", // Optional field
      expiresAt: currentUser.expiresAt || null, // Optional field
      createdAt: currentUser.createdAt || new Date(),
      updatedAt: currentUser.updatedAt || new Date(),
      deletedAt: currentUser.deletedAt || null, // Optional field
    };

    setData([
      { label: "First Name", value: user.firstName },
      { label: "Last Name", value: user.lastName },
      { label: "Email", value: user.email },
      { label: "Phone", value: user.phone },
      { label: "Country", value: user.country },
      { label: "Image URL", value: user.imageUrl },
      { label: "Online Status", value: user.isOnline ? "Online" : "Offline" },
      { label: "New User", value: user.isNew ? "Yes" : "No" },
      {
        label: "Date of Birth",
        value: user.dateOfBirth
          ? new Date(user.dateOfBirth).toLocaleDateString()
          : "N/A",
      },
      { label: "Website", value: user.website },
      { label: "Points", value: user.points },
      { label: "Bio", value: user.bio },
      {
        label: "Account Expiry",
        value: user.expiresAt
          ? new Date(user.expiresAt).toLocaleDateString()
          : "N/A",
      },
      {
        label: "Account Created",
        value: new Date(user.createdAt).toLocaleString(),
      },
      {
        label: "Last Updated",
        value: new Date(user.updatedAt).toLocaleString(),
      },
      {
        label: "Deleted At",
        value: user.deletedAt
          ? new Date(user.deletedAt).toLocaleDateString()
          : "N/A",
      },
    ]);
  }, [currentUser]);

  return (
    <Stack>
      <Typography variant="body1">{currentUser.firstName}'s Details</Typography>
      <Grid container spacing={2}>
        {data.map((item) => (
          <Grid key={item.label} item sm={6}>
            <Stack>
              <Typography variant="body2">{item.label}</Typography>
              <Typography sx={{ color: "text.secondary" }} variant="body1">
                {item.value || "---"}
              </Typography>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default UserDetailsTab;
