import { FC } from "react";
import { Avatar, Box, Card, Chip, Container, Typography } from "@mui/material";
import { group } from "@/data/group";
import Divider from "@mui/material/Divider";
import { GlobalCardChart } from "@/components/chart/GlobalChart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Diversity3Icon from "@mui/icons-material/Diversity3";

const Group: FC = () => {
  return (
    <Container>
      <GlobalCardChart title={"Group"} icon={<Diversity3Icon />} value={345} />
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography variant={"body2"}>{name}</Typography>
            <Chip
              size={"small"}
              icon={<AccountCircleIcon />}
              label={members.length}
            />
          </Box>
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
