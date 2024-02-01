import { PaginateOptions } from "./pagination-options";
import { PaginatedResult } from "./pagination-result";

export const paginate = async <T>(
  model: any,
  options?: PaginateOptions,
  select?: any,
  where?: any
): Promise<PaginatedResult<T>> => {
  const page = options?.page || 1;
  const take = options?.take || 7;

  const skip = page > 0 ? take * (page - 1) : 0;

  const [totalCount, data] = await Promise.all([
    model.count(),
    model.findMany({
      select,
      where,
      take,
      skip,
    }),
  ]);

  const totalPages = Math.ceil(totalCount / take);

  return {
    data,
    meta: {
      totalCount,
      currentPage: page,
      pageSize: take,
      totalPages: totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
  };
};