export interface Column<T = any> {
  key: string;
  header: string | (() => React.ReactNode);
  headerExtra?: () => React.ReactNode;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  align?: 'left' | 'center' | 'right';
  renderCell?: (row: T) => React.ReactNode;
}

export interface Action<T = any> {
  label: string;
  icon?: string;
  onClick: (row: T) => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: (row: T) => boolean;
}

export interface DataTableProps<T = any> {
  data: T[];
  columns: Column<T>[];
  actions?: Action<T>[];
  rowKeyField: keyof T;
  isLoading?: boolean;
  emptyMessage?: string;
  pageSize?: number;
  currentPage?: number;
  totalItems?: number;
  onPageChange?: (page: number) => void;
  searchQuery?: string;
  onSearch?: (query: string) => void;
  className?: string;
  actionButtonClassName?: string;
}