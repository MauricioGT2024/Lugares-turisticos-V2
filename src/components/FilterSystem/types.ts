export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterConfig {
  id: string;
  label: string;
  options: FilterOption[];
}

export interface ActiveFilters {
  [key: string]: string;
}
