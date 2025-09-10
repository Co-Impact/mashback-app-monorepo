import { FC, useState } from "react";
import { Table } from "../../components/Table/GenericTable.tsx";
import { Box, Button, Container, Grid, Skeleton, Stack, Typography } from "@mui/material";
import { BusinessTables } from "../../api/data/data.tsx";
import { useGetBusiness } from "../../api/businessRequest/getBusiness.ts";
import CardV2 from "../../components/Card/CardV2.tsx";

const BusinessPage: FC = () => {
  const [open, setOpen] = useState(false);
  const { getAllBusiness } = useGetBusiness();
  const { isError, isLoading, data } = getAllBusiness;
  const cards = [
    { title: "Total Business", value: data?.length },
    { title: "Total Private Business", value: 0, path: "/user" },
    { title: "Total Business Business", value: 0, path: "/business" },
  ];
  const onOpen = () => {
    setOpen(true);
  };
  return (
    <Container>
      <Box>
        <Grid container spacing={3}>
          {cards.map(({ title, value }, index) => (
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
      <Box
        sx={{
          justifyContent: "space-between",
          display: "flex",
          marginBottom: "30px",
          alignItems: "center",
        }}
      >
        <h1>Business</h1>
        <Box>
          <Button size="small" variant="contained" onClick={onOpen}>
            New
          </Button>
        </Box>
      </Box>

      {!isLoading && data ? (
        <Table data={data} columnsProp={BusinessTables} />
      ) : (
        <Skeleton />
      )}
    </Container>
  );
};

export default BusinessPage;
