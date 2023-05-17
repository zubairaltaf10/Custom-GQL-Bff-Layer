export interface ListResponse<T> {
  data: T[];
  totalCount: number;
}

export interface PagedResponse<T> extends ListResponse<T> {
  page: number;
  pageSize: number;
}
