import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardContent,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import DetailForm from "../../components/CtfProfile/DetailForm";
import ShowSkeleton from "../../components/Skeleton/ShowSkeleton";
import { Table } from "../../components/Table/GenericTable";
import { useGetCTFById } from "../../api/ctfRequest/getCTF";
import { useParams } from "react-router";
import { LabTableColumns } from "./LabTableColumns";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
                {ctf.data?.ActiveCTF.map((ctf) => (
                  <Accordion
                    sx={{ background: "transparent", mb: 2 }}
                    key={ctf.id}
                  >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="h6">{ctf.name}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>Involve: {ctf.involve}</Typography>
                      <Typography>
                        Requires Registration:{" "}
                        {ctf.requiresRegistration ? "Yes" : "No"}
                      </Typography>
                      <Typography>
                        Max Participants: {ctf.maxParticipants}
                      </Typography>
                      <Typography>
                        Start Date:{" "}
                        {new Date(ctf.startDate).toLocaleDateString()}
                      </Typography>
                      <Typography>
                        End Date: {new Date(ctf.endDate).toLocaleDateString()}
                      </Typography>

                      {ctf.prize.length > 0 && (
                        <>
                          <Typography sx={{ mt: 1 }}>Prizes:</Typography>
                          <List dense>
                            {ctf.prize.map((p) => (
                              <ListItem key={p.place}>
                                <ListItemText
                                  primary={`Place ${p.place}: ${p.prize}`}
                                />
                              </ListItem>
                            ))}
                          </List>
                        </>
                      )}
                    </AccordionDetails>
                  </Accordion>
                ))}
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
