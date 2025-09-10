import { Typography } from "@mui/material";
import { ICoupon } from "../../api/types";
import { ITableColumn } from "../../components/Table/types";
import { blue } from "@mui/material/colors";


export const getCouponColumns = (onEdit: (data: any) => void): ITableColumn[] => [
  {
    id: 'name',
    accessorKey: 'name',
    header: () => 'Coupon Name',
    cell: (item) => {
      const row = item.row.original;

      return (
        <Typography
          onClick={() => onEdit(row)}
          sx={{ textDecoration: "underline", color: blue[500] }}
        >
          {row.name}
        </Typography>
      );
    }
  },
  {
    id: 'status',
    accessorKey: 'isActive',
    header: () => 'Status',
    cell: (item) => item.row.original.isActive ? 'Active' : 'Inactive',
  },
  {
    id: 'discount',
    accessorKey: 'discount',
    header: () => 'Amount',
    cell: (item) => {
      const discountValue = item.row.original.discount;
      const discountType = item.row.original.type;

      return discountType === 'PERCENTAGE' ? `${discountValue}%` : `₹${discountValue}`;
    },
  },
  {
    id: 'usedBy',
    accessorKey: 'usedBy',
    header: () => 'Used By',
    cell: () => `${342}`
  },
];

