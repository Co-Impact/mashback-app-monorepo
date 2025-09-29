import { Avatar, Chip } from "@mui/material";
import { ITableColumn } from "../../components/Table/types.ts";
import { Link } from "react-router";

export const coursesTable: Array<ITableColumn> = [
  {
    id: "title",
    accessorKey: "title",
    header: () => "Title",
    meta: {
      filterVariant: "select",
    },
  },
  {
    id: "price",
    accessorKey: "price",
    header: () => "Price",
  },
  {
    id: "tag",
    accessorKey: "tag",
    header: () => "Tag",
  },
  {
    id: "status",
    accessorKey: "status",
    header: () => "status",
    cell: (props) => <div>{props.getValue()}</div>,
  },
  {
    id: "action",
    accessorKey: "action",
    header: () => "action",
  },
];

export const usersTable: Array<ITableColumn> = [
  {
    id: "firstName",
    accessorKey: "firstName",
    header: () => "Name",
    meta: {
      filterVariant: "select",
    },
    cell: (item) => {
      const userId = item.row.original.id;
      return (
        <Link
          to={`/user/${userId}`}
        >{`${item.row.original.firstName} ${item.row.original.lastName}`}</Link>
      );
    },
  },
  {
    id: "isActive",
    accessorKey: "isActive",
    header: () => "Active",
    cell: (item) =>
      item.getValue() ? (
        <Chip label="Active" color="success" size="small" />
      ) : (
        <Chip label="Desactive" color="error" size="small" />
      ),
  },
  {
    id: "email",
    accessorKey: "email",
    header: () => "Email",
  },
  {
    id: "country",
    accessorKey: "country",
    header: () => "Country",
  },
  {
    id: "linkedinUrl",
    accessorKey: "linkedinUrl",
    header: () => "Linkedin",
    cell: (item) => <a href={item.getValue()}>Click Here</a>,
  },
];

export const inviteTable: Array<ITableColumn> = [
  {
    id: "email",
    accessorKey: "email",
    header: () => "Email",
    meta: {
      filterVariant: "select",
    },
  },
  {
    id: "status",
    accessorKey: "status",
    header: () => "Status",
    cell: (item) => {
      const status = item.row.original.status;
      return status === "Accepted" ? (
        <Chip label="Accepted" color="success" size="small" />
      ) : (
        <Chip label="Pending" color="warning" size="small" />
      );
    },
  },
];

export const BusinessTables: Array<ITableColumn> = [
  {
    id: "logoUrl",
    accessorKey: "logoUrl",
    header: () => "Logo",
    cell: (item) => <Avatar src={item.getValue()} />,
  },
  {
    id: "name",
    accessorKey: "name",
    header: () => "Company Name",
    meta: {
      filterVariant: "select",
    },
    cell: (item) => {
      const businessId = item.row.original.id;
      return <Link to={`/business/${businessId}`}>{item.getValue()}</Link>;
    },
  },
  {
    id: "size",
    accessorKey: "size",
    header: () => "Size",
  },

  {
    id: "status",
    accessorKey: "status",
    header: () => "status",
    cell: (item) =>
      item ? (
        <Chip label="Active" color="success" size="small" />
      ) : (
        <Chip label="Desactive" color="error" size="small" />
      ),
  },
];

export const LabTables: Array<ITableColumn> = [
  {
    id: "labImage",
    accessorKey: "labImage",
    header: () => "Logo",
    cell: (item) => <Avatar src={item.getValue()} />,
  },
  {
    id: "name",
    accessorKey: "name",
    header: () => "Lab Name",
    cell: (item) => {
      const labId = item.row.original.id;
      return (
        <Link style={{ color: "green" }} to={`/labs/${labId}`}>
          {item.getValue()}
        </Link>
      );
    },
  },
  {
    id: "price",
    accessorKey: "price",
    header: () => "Price",
  },
  {
    id: "isActive",
    accessorKey: "isActive",
    header: () => "status",
    cell: (item) =>
      item.getValue() ? (
        <Chip label="Active" color="success" size="small" />
      ) : (
        <Chip label="Desactive" color="error" size="small" />
      ),
  },
  {
    id: "point",
    accessorKey: "point",
    header: () => "Point Count",
  },
];

export const packageHeaders: Array<ITableColumn> = [
  {
    id: "name",
    accessorKey: "name",
    header: () => "Name",
  },
  {
    id: "price",
    accessorKey: "price",
    header: () => "Price",
  },
  {
    id: "isActive",
    accessorKey: "isActive",
    header: () => "status",
    cell: (item) =>
      item.getValue() ? (
        <Chip label="Active" color="success" size="small" />
      ) : (
        <Chip label="Desactive" color="error" size="small" />
      ),
  },
];

export const eventHeaders: Array<ITableColumn> = [
  {
    id: "title",
    accessorKey: "title",
    header: () => "Name",
    cell: (item) => {
      const title = item.row.original.title;
      const id = item.row.original.id;
      return (
        <Link style={{ color: "green" }} to={`/events/${id}`}>
          {title}
        </Link>
      );
    },
  },
  {
    id: "startDate",
    accessorKey: "startDate",
    header: () => "Start Date",
    cell: (item) => {
      const date = new Date(item.getValue());
      return date.toLocaleString();
    },
  },
  {
    id: "endDate",
    accessorKey: "endDate",
    header: () => "End Date",
    cell: (item) => {
      const date = new Date(item.getValue());
      return date.toLocaleString();
    },
  },
  {
    id: "isActive",
    accessorKey: "isActive",
    header: () => "status",
    cell: (item) =>
      item.getValue() ? (
        <Chip label="Active" color="success" size="small" />
      ) : (
        <Chip label="Desactive" color="error" size="small" />
      ),
  },
  {
    id: "registered",
    accessorKey: "registered",
    header: () => "Registered",
    cell: (item) => {
      const count = item.row.original?._count.submissions;
      return count ?? 0;
    },
  },
];
