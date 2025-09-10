export interface ITableColumn {
    id: string;
    accessorKey: string | ((row: any) => any);
    header?: () => JSX.Element | string;
    cell?: (item: cell) => JSX.Element | string;
    footer?: (info: any) => string;
    meta?: {
        filterVariant: Filter;
    };
}

interface cell {
    getValue: () => any;
    row: {
        id: string;
        index: number;
        original: any
        parentId: any
    }
}
type Filter = "range" | "select";