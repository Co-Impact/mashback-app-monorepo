import { FC, useState } from "react";
import { Box, Button, Container, Typography } from "@mui/material";

import { getPackageTableColumns } from "./packageTableColumns";
import { getCouponColumns } from "./couponTableColumns";
import { Table } from "../../components/Table/GenericTable.tsx";
import { useModal } from "../../hooks/useModal.tsx";
import { useGetAllPackages } from "../../api/packageRequest/getPackage.ts";
import ShowSkeleton from "../../components/Skeleton/ShowSkeleton.tsx";
import { IPackages } from "../../api/types.ts";
import { useGetAllCoupons } from "../../api/couponRequest/getCoupons.ts";

const PackagePage: FC = () => {
  const {
    Modal: PackageFormModal,
    isOpen: packageFormModalIsOpen,
    open: packageFormModalOpen,
  } = useModal();
  const { data } = useGetAllPackages();
  const coupons = useGetAllCoupons();
  const [defaultCouponVal, setDefaultCouponVal] = useState(null);

  const couponColumns = getCouponColumns(handleCouponEdit);
  const [defaultPackageFormValue, setDefaultPackageFormValue] =
    useState<IPackages | null>(null);

  const handleEditPackage = (data: IPackages) => {
    setDefaultPackageFormValue(data);
    packageFormModalOpen();
  };

  function handleCouponEdit(row: any) {
    const data = {
      code: row.code,
      discount: row.discount,
      expiresAt: new Date(row.expiresAt).toISOString().split("T")[0],
      freeMonths: row.freeMonths,
      id: row.id,
      isActive: row.isActive,
      maxUses: row.maxUses,
      name: row.name,
      type: row.type,
      usageCount: row.usageCount,
    };
    // @ts-ignore
    setDefaultCouponVal(data);
  }
  const handlePackageFormModalOpen = () => {
    setDefaultPackageFormValue(null);
    packageFormModalOpen();
  };
  const packageColumns = getPackageTableColumns({
    onEdit: handleEditPackage,
  });
  return (
    <Container>
      <Box
        sx={{
          justifyContent: "space-between",
          display: "flex",
          marginBottom: "30px",
          alignItems: "center",
        }}
      >
        <Typography color={"text.primary"} variant="h6">
          Packages
        </Typography>
        <Box>
          <Button
            size="small"
            variant="contained"
            onClick={handlePackageFormModalOpen}
            sx={{ ml: 1 }}
          >
            New Package
          </Button>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Box sx={{ display: "flex", gap: 4 }}>
          <Box sx={{ flex: 0.6 }}>
            <Typography color={"text.primary"} variant="subtitle1" mb={1}>
              Package List
            </Typography>
            {data ? (
              <Table data={data} columnsProp={packageColumns} />
            ) : (
              <ShowSkeleton columnCount={3} viewType="table" />
            )}
          </Box>
          <Box sx={{ flex: 0.4 }}>
            <Typography color={"text.primary"} variant="subtitle1" mb={1}>
              Coupon List
            </Typography>
            {coupons.data ? (
              <Table data={coupons.data || []} columnsProp={couponColumns} />
            ) : (
              <ShowSkeleton columnCount={3} viewType="table" />
            )}
          </Box>
        </Box>
      </Box>
      {packageFormModalIsOpen && (
        <PackageFormModal
          maxWidth="md"
          showCloseIcon
          open={packageFormModalIsOpen}
        >
          <Box sx={{ p: 2, width: { xs: "90vw", md: "70vw" } }}></Box>
        </PackageFormModal>
      )}
    </Container>
  );
};
export default PackagePage;
