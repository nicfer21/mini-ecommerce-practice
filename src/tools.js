"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationHelper = void 0;
const paginationHelper = (query, countRows) => {
    const search = query.search || '';
    const rows = query.limit || 10;
    const pages = countRows > 0 ? Math.ceil(countRows / rows) : 1;
    const page = query.page ? (pages >= query.page ? query.page : pages) : 1;
    const hasNextPage = page < pages;
    const hasPrevPage = page > 1;
    const sortBy = query.sortBy || 'asc';
    const order = sortBy === 'asc' ? true : false;
    return {
        skip: parseInt(((page || 1) - 1) * rows + ''),
        take: parseInt(rows + ''),
        orderBy: order,
        page: page,
        rows: rows,
        pages: pages,
        hasNextPage: hasNextPage,
        hasPrevPage: hasPrevPage,
        search: search,
    };
};
exports.paginationHelper = paginationHelper;
//# sourceMappingURL=tools.js.map