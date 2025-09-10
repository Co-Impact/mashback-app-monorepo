import type { ITableColumn } from "../../components/Table/types";

export const RunCtfTableColumn: ITableColumn[] = [
  {
    id: 'name',
    accessorKey: 'name',
    header: () => 'Name',
  },
  {
    id: 'startDate',
    accessorKey: 'startDate',
    header: () => 'Start Date',
  },
  {
    id: 'endDate',
    accessorKey: 'endDate',
    header: () => 'End Date',
  },
  {
    id: 'involve',
    accessorKey: 'involve',
    header: () => 'Involve',
  },
  {
    id: 'joined',
    accessorKey: 'joined',
    header: () => 'Joined',
  },
];
