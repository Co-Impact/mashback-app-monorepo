import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { LabTables } from "../../api/data/data";
import { Table } from "../../components/Table/GenericTable";
import { LabForm } from "../../components/Dialog/LabForm.tsx";
import ShowSkeletion from "../../components/Skeleton/ShowSkeleton.tsx";
import { useModal } from "../../hooks/useModal.tsx";
import CardV2 from "../../components/Card/CardV2.tsx";
import { useGetExample } from "../../api/exampleRequest/getRequest.ts";

const Labs: FC = () => {
  const { data, isLoading } = useGetExample();
  const { Modal, close, isOpen, open } = useModal();
  const labsCards = [
    { title: "Total Labs", value: data?.length },
    { title: "Total Active Labs", value: 0, path: "/user" },
    { title: "Total Business", value: 0, path: "/business" },
  ];

  return (
    <Container>
      <Box sx={{ width: "100%" }}>
        <Grid container alignItems={"stretch"} spacing={3}>
          {labsCards.map(({ title, value }, index) => (
            <Grid item xs={12} sm={6} lg={4} key={index}>
              {
                <CardV2
                  title={
                    <Stack>
                      <Typography variant="h6">{title}</Typography>
                      <Typography variant="h5">{value}</Typography>
                    </Stack>
                  }
                />
              }
            </Grid>
          ))}
        </Grid>
      </Box>
      <Stack
        my={2}
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography sx={{ color: "text.primary" }} variant="h6">
          Labs
        </Typography>
        <Button size="small" variant="contained" onClick={open}>
          New
        </Button>
      </Stack>
      <Modal open={isOpen} title="Create Lab" showCloseIcon>
        <LabForm onClose={close} />
      </Modal>

      {!isLoading && data ? (
        <Table data={data} columnsProp={LabTables} />
      ) : (
        <ShowSkeletion viewType="table" />
      )}
    </Container>
  );
};

export default Labs;
