import { FC } from "react";
import { Avatar, AvatarGroup, Box } from "@mui/material";

interface MembersCardProps {
  members: Array<{ image: string; name: string; position: string }>;
}
export const MembersCard: FC<MembersCardProps> = ({ members }) => {
  const firstThree = members.slice(0, 3);
  const remaining = members.slice(3);

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      {firstThree.map(({ name, image }, index) => (
        <Avatar
          key={index}
          sx={{ width: 60, height: 60 }}
          src={image}
          alt={name}
        />
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
    </Box>
  );
};
