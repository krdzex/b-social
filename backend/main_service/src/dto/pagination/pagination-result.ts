export interface PaginatedResult<T> {
    data: T[];
    meta: {
      totalCount: number;
      currentPage: number;
      pageSize: number;
      totalPages: number;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
  }