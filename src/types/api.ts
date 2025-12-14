export type GetRequestParamsType<T> = {
  data: T[];
  pageNumber?: number;
  pageSize?: number;
  search?: string;
};

export type PaginatedResponseType<T> = {
  statusCode: number;
  data: T[];
};

export type SingleResponseType<T> = {
  statusCode: number;
  formatters: Array<any>;
  contentTypes: Array<any>;
  declaredType: any;
  value: {
    value: T;
    message: string;
    statusCode: number;
  };
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
