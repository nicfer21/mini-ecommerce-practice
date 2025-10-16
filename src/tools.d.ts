import { QueryParams } from './types';
export declare const paginationHelper: (query: QueryParams, countRows: number) => {
    skip: number;
    take: number;
    orderBy: boolean;
    page: number;
    rows: number;
    pages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    search: string;
};
