import { Button, Container, Grid, Stack, Typography } from '@mui/material';
import React from 'react'
import CardV2 from '../../components/Card/CardV2';
import { programData } from './data';
import { ProgramColumns } from './ProgramColumns';
import { Table } from '../../components/Table/GenericTable';

const CyberWarfarePage = () => {
  const cards = [
    { title: "Challenges", value: "43", },
    { title: "Task", value: "342", },
    { title: "Comming Soon", value: "---", },
  ];
  return (
    <Container maxWidth='lg'>
      <Grid container spacing={2}>
        {cards.map(({ title, value }, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <CardV2 title={
              <Stack>
                <Typography variant="h6">{title}</Typography>
                <Typography variant="h5">{value}</Typography>
              </Stack>
            } />
          </Grid>
        ))}

        <Grid width={'100%'} overflow={'auto'} item xs={12}>
          <Stack
            my={2}
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography sx={{ color: "text.primary" }} variant="h6">
              Challenges
            </Typography>
            <Stack direction={'row'} spacing={2}>
              <Button size="small" variant="contained" >
                New Task
              </Button>
              <Button size="small" variant="contained" >
                New Challenge
              </Button>
            </Stack>
          </Stack>
        </Grid>

        <Grid sx={{overFlowX: 'auto'}} item xs={12}>
          <Table data={programData} columnsProp={ProgramColumns} />
        </Grid>
      </Grid>

    </Container>
  )
}

export default CyberWarfarePage