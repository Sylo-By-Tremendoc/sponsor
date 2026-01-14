export type FilterFieldType = "text" | "date" | "select";

export type FilterOption = {
  label: string;
  value: string;
};

export type FilterField = {
  name: string;
  label: string;
  type: FilterFieldType;
  placeholder?: string;
  options?: FilterOption[];
  disableFutureDates?: boolean;
};

export type TableFilterField =
  | {
      type: "text";
      name: string;
      label: string;
      placeholder?: string;
    }
  | {
      type: "date";
      name: string;
      label: string;
      disableFutureDates?: boolean;
    }
  | {
      type: "select";
      name: string;
      label: string;
      options: { label: string; value: string }[];
    };

export interface TableFilterProps {
  filters: TableFilterField[];
  onApply: (values: Record<string, any>) => void;
  onReset: () => void;
}
