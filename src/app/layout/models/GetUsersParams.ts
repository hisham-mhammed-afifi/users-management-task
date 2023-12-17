export interface GetUsersParams {
  _limit: string;
  q: string;
  _page: string;
  _sort: string;
  _order: SortType;
  joined_gte: string;
  joined_lte?: string;
  role?: string;
}

export enum SortType {
  ASC = 'asc',
  DESC = 'desc',
}
