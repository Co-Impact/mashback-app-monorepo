import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Table } from "../../components/Table/GenericTable";
import { CTFForm } from "../../components/Dialog/CTFForm.tsx";
import ShowSkeleton from "../../components/Skeleton/ShowSkeleton.tsx";
import { CTFTableColumn } from "./CtfTableColumns.tsx";
import { useModal } from "../../hooks/useModal.tsx";
import { CTFDisplayData } from "./type.ts";
import CardV2 from "../../components/Card/CardV2.tsx";
import { useGetExample } from "../../api/exampleRequest/getRequest.ts";

const CTFPage: FC = () => {
  const {
    Modal: RunCtfModal,
    open: openRunCtfModal,
    isOpen: isOpenRunCtfModal,
    close: closeRunCtfModal,
  } = useModal();
  const {
    Modal: CreateCtfModal,
    open: openCreateCtfModal,
    isOpen: isOpenCreateCtfModal,
    close: closeCreateCtfModal,
  } = useModal();

  const ctf = useGetExample();
  const activeCtf = useGetExample();
  const [activeCtfData, setActiveCtfData] = useState<CTFDisplayData[]>([]);

  useEffect(() => {
    if (!activeCtf.data) return;
    const data = activeCtf.data.map(
      (ctf: {
        name: any;
        startDate: string | number | Date;
        endDate: string | number | Date;
        involve: any;
        _count: { ActiveCTFParticipants: any };
      }) => ({
        name: ctf.name,
        startDate: new Date(ctf.startDate).toLocaleDateString(),
        endDate: new Date(ctf.endDate).toLocaleDateString(),
        involve: ctf.involve,
        joined: ctf._count.ActiveCTFParticipants,
      }),
    );

    setActiveCtfData(data as any);
  }, [activeCtf.isLoading, activeCtf.data]);

  const activeCtfCount = activeCtf.data?.length ?? 0;
  const totalCtf = ctf.data?.length ?? 0;
  const inActiveCtfCount = totalCtf - activeCtfCount;

  const ctfCards = [
    { title: "Total Active CTF", value: activeCtfCount },
    { title: "Total Inactive CTF", value: inActiveCtfCount },
    { title: "Total CTF", value: totalCtf },
  ];

  return (
    <Container>
      <Box>
        <Grid container spacing={3}>
          {ctfCards.map(({ title, value }, index) => (
            <Grid item xs={12} sm={3} md={6} lg={4} key={index}>
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
        justifyContent={"space-between"}
        alignItems={"center"}
        direction="row"
        mt={4}
        mb={2}
      >
        <Typography sx={{ color: "text.primary" }} variant="h6">
          CTF
        </Typography>
        <Stack direction={"row"} spacing={2}>
          <Button size="small" variant="contained" onClick={openCreateCtfModal}>
            Create New CTF
          </Button>
          <Button size="small" variant="contained" onClick={openRunCtfModal}>
            Run CTF
          </Button>
        </Stack>
      </Stack>

      <CreateCtfModal
        title="Create CTF"
        showCloseIcon
        open={isOpenCreateCtfModal}
      >
        <CTFForm onClose={closeCreateCtfModal} />
      </CreateCtfModal>

      <Grid container spacing={2}>
        <Grid item md={5} sm={12}>
          <Typography
            sx={{ color: "text.primary", mb: 1, ml: 1 }}
            variant="body1"
          >
            ALL CTF
          </Typography>
          {ctf.isLoading ? (
            <ShowSkeleton viewType="table" />
          ) : (
            <Table data={ctf.data || []} columnsProp={CTFTableColumn} />
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default CTFPage;
