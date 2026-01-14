export type PaginationMeta = {
  current_page: number;
  from: number | null;
  last_page: number;
  per_page: number;
  to: number | null;
  total: number;
};

export type PaginationLinks = {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
};

export type PaginatedData<T> = {
  data: T[];
  links: PaginationLinks;
  meta: PaginationMeta;
};

export type PaginatedResponseType<T> = {
  success: boolean;
  message: string;
  data: PaginatedData<T>;
};

export type SingleResponseType<T> = {
  data: T;
  message: string;
  success: boolean;
};

export type MutationResponseType<T> = {
  statusCode: number;
  value: {
    value: {
      value: T[];
      message: string;
      statusCode: number;
    };
  };
};
