import { FC, useState } from "react";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { CardItem } from "../../components/Card/type.ts";
import CardV2 from "../../components/Card/CardV2.tsx";

export const PricingPage: FC = () => {
  const [open, setOpen] = useState(false);
  const pricingCards: Array<CardItem> = [
    { label: "Total Business", value: "" },
    { label: "Total Private Business", value: "", path: "/user" },
    { label: "Total Business", value: "", path: "/business" },
  ];

  const onOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Container>
      <Box>
        <Grid container spacing={3}>
          {pricingCards.map(({ label, value }, index) => (
            <Grid item xs={12} sm={3} md={6} lg={4} key={index}>
              {
                <CardV2
                  title={
                    <Stack>
                      <Typography variant="h6">{label}</Typography>
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
        <h1>Course</h1>
        <Box>
          <Button size="small" variant="contained" onClick={onOpen}>
            New
          </Button>
        </Box>
      </Box>
      {/*<DialogForm*/}
      {/*    dialogTitle={"Pricing Form"}*/}
      {/*    open={open}*/}
      {/*    query={mutate}*/}
      {/*    FormComponents={CoursesForm}*/}
      {/*    onClose={handleClose}*/}
      {/*/>*/}

      {/*{data ? <Table data={data} columnsProp={coursesTable} /> : <Skeleton />}*/}
    </Container>
  );
};
