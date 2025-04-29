import { FC } from "react";
import { Avatar, Box, Card, Container, Typography } from "@mui/material";
import { group } from "@/data/group";
import Divider from "@mui/material/Divider";

const Group: FC = () => {
  return (
    <Container>
      <Box></Box>
      {group.map(({ name, members }, index) => (
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            padding: 1,
            margin: "5px 0",
          }}
          key={index}
        >
          <Typography variant={"body2"}>{name}</Typography>
          <Divider />
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            {members.map(({ imageUrl }, index) => (
              <Avatar src={imageUrl} key={index} />
            ))}
          </Box>
        </Card>
      ))}
    </Container>
  );
};

export default Group;
