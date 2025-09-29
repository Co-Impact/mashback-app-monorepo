import {CSSProperties, FC, Fragment, useState} from "react";
import {
    ColumnDef,
    ColumnFiltersState,
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import "../../style/Table.scss";
import {TableContainer} from "./table.styled";
import {Divider, SxProps, Theme} from "@mui/material";

interface GenericTableProps {
  data: Array<any>;
  columnsProp: Array<ITableColumn>;
  enableFooter?: boolean;
  canFilter?: boolean;
  canSort?: boolean;
  isExpandedRows?: boolean;
  style?: CSSProperties;
  hideTableHeader?: boolean;
  customStyles?: SxProps<Theme>;
}

interface ITableColumn {
  id: string;
  accessorKey: string | ((row: any) => any);
  header?: () => JSX.Element | string;
  cell?: (info: any) => JSX.Element | string;
  footer?: (info: any) => string;
  meta?: {
    filterVariant: Filter;
  };
}

type Filter = "range" | "select";

// 🔑 Helper to make React happy with bigint
function normalizeReactNode(value: unknown): React.ReactNode {
  if (typeof value === "bigint") {
    return value.toString();
  }
  return value as React.ReactNode;
}

export const Table: FC<GenericTableProps> = ({
  data,
  columnsProp,
  enableFooter,
  isExpandedRows,
  hideTableHeader = false,
  customStyles = {},
}) => {
  const columnHelper = createColumnHelper();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  const toggleRowExpansion = (rowId: string) => {
    setExpandedRows((prevExpandedRows) => ({
      ...prevExpandedRows,
      [rowId]: !prevExpandedRows[rowId],
    }));
  };

  const columns: ColumnDef<any, any>[] = columnsProp.map((config) =>
    columnHelper.accessor(config.accessorKey, config),
  );

  const table = useReactTable({
    data,
    columns,
    filterFns: {},
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });

  return (
    <TableContainer sx={customStyles}>
      <div style={{ width: "100%", minWidth: "max-content" }}>
        <table style={{ width: "100%", tableLayout: "auto" }}>
          {!hideTableHeader && (
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id}>
                      {header.isPlaceholder ? null : (
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? "cursor-pointer select-none"
                              : "",
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {normalizeReactNode(
                            flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            ),
                          )}
                          {header.column.getIsSorted() === "asc" ? " 🔼" : ""}
                          {header.column.getIsSorted() === "desc" ? " 🔽" : ""}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
          )}

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <Fragment key={row.id}>
                <tr
                  onClick={() => toggleRowExpansion(row.id)}
                  style={{ cursor: "pointer" }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {normalizeReactNode(
                        flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        ),
                      )}
                    </td>
                  ))}
                </tr>
                {isExpandedRows && expandedRows[row.id] && (
                  <tr>
                    <td colSpan={columns.length}>
                      <div className="expanded-content">
                        <p>Additional details for row {row.id}</p>
                      </div>
                    </td>
                  </tr>
                )}
                {/* Divider Row */}
                <tr>
                  <td colSpan={columns.length} style={{ padding: 0 }}>
                    <Divider />
                  </td>
                </tr>
              </Fragment>
            ))}
          </tbody>

          {enableFooter && (
            <tfoot>
              {table.getFooterGroups().map((footerGroup) => (
                <tr key={footerGroup.id}>
                  {footerGroup.headers.map((header) => (
                    <th key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : normalizeReactNode(
                            flexRender(
                              header.column.columnDef.footer,
                              header.getContext(),
                            ),
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </tfoot>
          )}
        </table>
      </div>
    </TableContainer>
  );
};
