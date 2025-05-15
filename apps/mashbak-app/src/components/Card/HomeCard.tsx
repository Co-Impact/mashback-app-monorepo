import { FC, ReactNode } from "react";
import { Badge, Box, Card, SvgIconTypeMap } from "@mui/material";
import Link from "next/link";
import Divider from "@mui/material/Divider";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CampaignIcon from "@mui/icons-material/Campaign";
import { OverridableComponent } from "@mui/material/OverridableComponent";

interface Props {
  label: string;
  Icon: OverridableComponent<SvgIconTypeMap> & { muiName: string };
  path: string;
  children?: ReactNode;
}
export const HomeCard: FC<Props> = ({ label, Icon, path, children }) => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        padding: "15px 15px 10px 15px",
        borderRadius: "8px",
        margin: "10px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          paddingBottom: "5px",
        }}
      >
        <Box>
          <Icon />
        </Box>
        <h4>{label}</h4>
        <Badge badgeContent={4} color="primary">
          <CampaignIcon color="action" />
        </Badge>
      </Box>
      <Divider sx={{ margin: "2px 0" }} />
      <Box>{children}</Box>
      <Divider sx={{ margin: "4px 0" }} />
      <Box
        component={Link}
        href={path}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MoreHorizIcon />
      </Box>
    </Card>
  );
};
