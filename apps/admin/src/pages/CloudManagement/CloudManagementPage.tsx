import { Button, Container, Grid, Stack, Typography } from "@mui/material";
import { useModal } from "../../hooks/useModal";
import RegionForm from "../../components/Forms/Region/RegionForm";
import ShowSkeleton from "../../components/Skeleton/ShowSkeleton";
import { Table } from "../../components/Table/GenericTable";
import { getAwsRegionTableColumn } from "./AwsRegionTableColumn";
import { getAzureRegionTableColumn } from "./AzureRegionTableColumn";
import { useMemo, useState } from "react";
import { Region } from "../../api/types";
import { useMessageDialog } from "../../components/MessageDialog/MessageDialog";
import { toast } from "react-toastify";
import { Delete } from "@mui/icons-material";
import CardV2 from "../../components/Card/CardV2";
import { useGetExample } from "../../api/exampleRequest/getRequest.ts";
import { useDeleteExample } from "../../api/exampleRequest/postRequest.ts";

const CloudManagementPage = () => {
  const {
    Modal: RegionModal,
    open: openRegionModal,
    isOpen: isOpenRegionModal,
    close: closeRegionModal,
  } = useModal();
  const awsRegions = useGetExample();
  const azureRegions = useGetExample();
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const deleteRegion = useDeleteExample();
  const {
    MessageDialog: DeleteDialog,
    close: closeDeleteDialog,
    open: openDeleteDialog,
    isOpen: isOpenDeleteDialog,
  } = useMessageDialog();

  const handleEditClick = (region: Region) => {
    setSelectedRegion(region);
    openRegionModal();
  };

  const handleDeleteClick = (region: Region) => {
    setSelectedRegion(region);
    openDeleteDialog();
  };

  const onActionPerformed = () => {
    closeRegionModal();
    setSelectedRegion(null);
  };

  const AwsRegionTableColumn = useMemo(() => {
    return getAwsRegionTableColumn(handleEditClick, handleDeleteClick);
  }, [azureRegions.isLoading, awsRegions.isLoading]);

  const AzureRegionTableColumn = useMemo(() => {
    return getAzureRegionTableColumn(handleEditClick, handleDeleteClick);
  }, [azureRegions.isLoading, awsRegions.isLoading]);

  const deleteRegionFromServer = async () => {
    if (!selectedRegion?.id) {
      toast.error("Region ID is required");
      return;
    }
    await deleteRegion.mutateAsync(selectedRegion.id);
    if (selectedRegion.cloudProvider) {
      awsRegions.refetch();
    } else {
      azureRegions.refetch();
    }
    onActionPerformed();
    closeDeleteDialog();
  };

  const ctfCards = useMemo(
    () => [
      { title: "AWS", value: awsRegions.data?.length },
      { title: "AZURE", value: azureRegions.data?.length },
      { title: "Comming Soon", value: "----" },
    ],
    [azureRegions.data, awsRegions.data],
  );

  const handleAddNewRegion = () => {
    setSelectedRegion(null);
    openRegionModal();
  };

  return (
    <Container>
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

        <Grid item xs={12}>
          <Stack
            direction={"row"}
            width={"100%"}
            alignItems={"center"}
            justifyContent={"space-between"}
            spacing={2}
            mt={4}
          >
            <Typography sx={{ color: "text.primary" }} variant="h6">
              Regions
            </Typography>
            <Stack
              direction={"row"}
              width={"100%"}
              justifyContent={"end"}
              spacing={2}
              mt={4}
            >
              <Button
                size="small"
                variant="contained"
                onClick={handleAddNewRegion}
              >
                Add New Region
              </Button>
            </Stack>
          </Stack>
        </Grid>

        {
          <Grid item xs={12}>
            <Stack direction={"row"} spacing={2}>
              <Stack width="100%" spacing={1}>
                <Typography sx={{ color: "text.primary" }} variant="body1">
                  AWS
                </Typography>
                {awsRegions.isLoading ? (
                  <ShowSkeleton viewType="table" />
                ) : (
                  <Table
                    data={awsRegions.data || []}
                    columnsProp={AwsRegionTableColumn}
                  />
                )}
              </Stack>
              <Stack width="100%" spacing={1}>
                <Typography sx={{ color: "text.primary" }} variant="body1">
                  AZURE
                </Typography>
                {azureRegions.isLoading ? (
                  <ShowSkeleton viewType="table" />
                ) : (
                  <Table
                    data={azureRegions.data || []}
                    columnsProp={AzureRegionTableColumn}
                  />
                )}
              </Stack>
            </Stack>
          </Grid>
        }
      </Grid>

      {isOpenRegionModal && (
        <RegionModal
          title={"Region Form"}
          showCloseIcon
          open={isOpenRegionModal}
        >
          <RegionForm
            onActionPerformed={onActionPerformed}
            selectedRegion={selectedRegion}
          />
        </RegionModal>
      )}

      {isOpenDeleteDialog && (
        <DeleteDialog
          title="Delete Region"
          description="Are you sure you want to delete this reqgion ?"
          icon={<Delete />}
          action={
            <Button
              variant="contained"
              onClick={deleteRegionFromServer}
              disabled={deleteRegion.isPending}
              color="error"
            >
              {deleteRegion.isPending ? "Deleting" : "Delete"}
            </Button>
          }
        />
      )}
    </Container>
  );
};

export default CloudManagementPage;
