export type TPagination = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

export type TApiResponse<T> = {
  data: T;
  meta?: {
    pagination: TPagination;
  };
};
