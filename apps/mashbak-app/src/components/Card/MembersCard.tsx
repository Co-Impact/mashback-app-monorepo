"use client";
import { FC, useState } from "react";
import { Avatar, AvatarGroup, Box, IconButton } from "@mui/material";
import { UserCardModal } from "@/components/Modal/UserCardModal";

interface MembersCardProps {
  members: Array<{ id: string; image: string; name: string; position: string }>;
}
export const MembersCard: FC<MembersCardProps> = ({ members }) => {
  const [open, setOpen] = useState<boolean>(false);
  const firstThree = members.slice(0, 3);
  const remaining = members.slice(3);

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      {firstThree.map(({ name, image }, index) => (
        <IconButton key={index} onClick={() => setOpen(true)}>
          <Avatar sx={{ width: 60, height: 60 }} src={image} alt={name} />
        </IconButton>
      ))}

      {remaining.length > 0 && (
        <AvatarGroup max={4}>
          {remaining.map(({ name, image }, index) => (
            <Avatar
              sx={{ width: 60, height: 60 }}
              key={index}
              alt={name}
              src={image}
            />
          ))}
        </AvatarGroup>
      )}
      <UserCardModal
        open={open}
        onClose={() => setOpen(false)}
        user={{
          imageUrl: undefined,
          name: undefined,
          position: undefined,
          company: undefined,
        }}
      />
    </Box>
  );
};
