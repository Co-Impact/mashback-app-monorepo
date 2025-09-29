import {Card, CardContent, Container, Grid, Skeleton, Stack, Typography,} from "@mui/material";
import DetailForm from "../../components/CtfProfile/DetailForm";
import ShowSkeleton from "../../components/Skeleton/ShowSkeleton";
import {Table} from "../../components/Table/GenericTable";
import {useGetCTFById} from "../../api/ctfRequest/getCTF";
import {useParams} from "react-router";
import {LabTableColumns} from "./LabTableColumns";

const CTFProfilePage = () => {
  const { id } = useParams();

  const ctf = useGetCTFById(id!);

  if (ctf.isLoading || !ctf.data) {
    return (
      <Stack spacing={4} width={"100%"}>
        <Skeleton variant="rectangular" height={300} width={"100%"} />
        <Skeleton variant="rectangular" height={500} width={"100%"} />
      </Stack>
    );
  }

  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Card sx={{ background: (theme) => theme.palette.background.paper }}>
            <CardContent>
              <DetailForm data={ctf.data} />
            </CardContent>
          </Card>
        </Grid>
        <Grid spacing={4} item xs={12}>
          <Grid alignItems={"stretch"} container spacing={2}>
            <Grid item sm={12} md={6}>
              <Card
                sx={{
                  background: (theme) => theme.palette.background.paper,
                  height: "100%",
                }}
              >
                <CardContent>
                  <Typography color={"text.primary"} variant="h6" gutterBottom>
                    Labs
                  </Typography>
                  {ctf.isLoading ? (
                    <ShowSkeleton viewType="table" />
                  ) : (
                    <Table
                      data={ctf.data?.lab || []}
                      columnsProp={LabTableColumns}
                    />
                  )}
                </CardContent>
              </Card>
            </Grid>
            <Grid item sm={12} md={6}>
              <Card
                sx={{
                  background: (theme) => theme.palette.background.paper,
                  height: "100%",
                }}
              >
                <Typography
                  p={2}
                  color={"text.primary"}
                  variant="h6"
                  gutterBottom
                >
                  Active CTF
                </Typography>
              </Card>
            </Grid>
            {/* <Grid item md={6} xs={12}>
                            <Card sx={{ background: theme => theme.palette.background.paper }}>
                                <CardContent>
                                    <Typography color={'text.primary'} variant="h6" gutterBottom>
                                        Roles
                                    </Typography>
                                    <RolesForm onSubmit={(data) => console.log('Roles:', data)} />
                                </CardContent>
                            </Card>
                        </Grid> */}
          </Grid>
        </Grid>
        {/* <Grid color={'text.primary'} item xs={12}>
                    <Card sx={{ background: theme => theme.palette.background.paper }}>
                        <CardContent>
                            <Typography color={'text.primary'} variant="h6" gutterBottom>
                                Description
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2 }}>
                                This Capture The Flag (CTF) event is designed to test your skills in cybersecurity. Participants will solve challenges, capture flags, and engage in various activities to earn points and prizes.
                                This Capture The Flag (CTF) event is designed to test your skills in cybersecurity. Participants will solve challenges, capture flags, and engage in various activities to earn points and prizes.
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2 }}>
                                This Capture The Flag (CTF) event is designed to test your skills in cybersecurity. Participants will solve challenges, capture flags, and engage in various activities to earn points and prizes.
                                This Capture The Flag (CTF) event is designed to test your skills in cybersecurity. Participants will solve challenges, capture flags, and engage in various activities to earn points and prizes.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid> */}
      </Grid>
    </Container>
  );
};

export default CTFProfilePage;
