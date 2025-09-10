import { FC } from "react";
import { Box, Button, Container, Grid, Skeleton, Stack, Typography } from "@mui/material";
import { Table } from "../../components/Table/GenericTable.tsx";
import { eventHeaders } from "../../api/data/data.tsx";
import { useGetEvent } from "../../api/eventsRequest/getEvents.ts";
import { EventsFormStepper } from "../../components/Forms/Event/eventsForm.tsx";
import { useModal } from "../../hooks/useModal.tsx";
import CardV2 from "../../components/Card/CardV2.tsx";

const EventsPage: FC = () => {
  const {Modal, open, close, isOpen} = useModal()
  const { data, isLoading } = useGetEvent();
  const coursesCards = [
    { title: "Total EventsPage", value: data?.length },
    { title: "Total Active", value: data?.length },
    { title: "Total Business Business", value: 0 },
  ];

  return (
    <Container>
      <Box>
        <Grid container spacing={3}>
          {coursesCards.map(({ title, value }, index) => (
            <Grid item xs={12} sm={3} md={6} lg={4} key={index}>
              {!isLoading ? (
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
          mt:2
        }}
      >
        <Typography variant="h5" sx={{color: 'text.primary'}}>Events</Typography>
        <Box>
          <Button size="small" variant="contained" onClick={open}>
            New
          </Button>
        </Box>
      </Box>
      
      <Modal open={isOpen} showCloseIcon title='Create Event'>
        <EventsFormStepper closeDialog={close} />
      </Modal>

      {data ? <Table data={data} columnsProp={eventHeaders} /> : <Skeleton />}
    </Container>
  );
};
export default EventsPage;
