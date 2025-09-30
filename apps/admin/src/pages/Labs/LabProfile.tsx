import { FC } from "react";
import { Container, Grid, Skeleton, Stack } from "@mui/material";
import { useParams } from "react-router";
import ManageLabBasicDetails from "../../components/LabProfile/ManageLabBasicDetail.tsx";
import ManageLabFlag from "../../components/LabProfile/ManageLabFlag.tsx";
import ManageLabSteps from "../../components/LabProfile/ManageLabSteps.tsx";
import ManageDiagram from "../../components/LabProfile/ManageDiagram.tsx";
import ProfileCard from "../../components/LabProfile/LabProfileCard.tsx";
import { useGetExampleById } from "../../api/exampleRequest/getRequest.ts";

const LabProfile: FC = () => {
  const { id = "" } = useParams();
  const { data } = useGetExampleById(id);

  if (!data) {
    return (
      <Container>
        <Stack spacing={2}>
          <Skeleton variant="rectangular" width="100%" height="200px" />
          <Skeleton variant="rectangular" width="100%" height="500px" />
        </Stack>
      </Container>
    );
  }

  const { name, labImage, background, difficult, isActive } = data;

  return (
    <Container>
      <Stack spacing={2} sx={{ position: "relative" }}>
        {/* Top Banner with Overlay Header */}
        {/* <Box sx={{ position: "relative", borderRadius: 2, overflow: "hidden" }}>
          <CardMedia component="img" height="200" image={background} alt="Background" />
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              bgcolor: "rgba(0, 0, 0, 0.4)",
              color: "white",
              display: "flex",
              alignItems: "end",
              px: 3,
              gap: 2,
            }}
          >
            <Stack direction={'row'} alignItems={'center'} mb={2} spacing={2}>
              <Avatar src={labImage} sx={{ width: 72, height: 72, border: "2px solid white" }} />
              <Box>
                <Typography variant="h5" fontWeight="bold">{name}</Typography>
                <Typography variant="subtitle1">Level: {difficult}</Typography>
                <Chip
                  label={isActive ? "Active" : "Inactive"}
                  color={isActive ? "success" : "default"}
                  size="small"
                  sx={{ mt: 1 }}
                />
              </Box>
            </Stack>
          </Box>
        </Box> */}
        <ProfileCard
          background={background ?? ""}
          difficult={difficult}
          isActive={isActive}
          labImage={labImage ?? ""}
          name={name}
          labId={id}
        />
        <Container maxWidth={false} disableGutters>
          <Grid container spacing={2}>
            <Grid item md={7} sm={12}>
              {/* Lab Basic Details */}
              <ManageLabBasicDetails data={data} />
            </Grid>
            <Grid item md={5} sm={12}>
              <Stack spacing={2}>
                <ManageLabFlag data={data} />

                <ManageLabSteps data={data} />

                <ManageDiagram data={data} />
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Stack>
    </Container>
  );
};

export default LabProfile;
