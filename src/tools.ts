import { QueryParams } from './types';

export const paginationHelper = (query: QueryParams, countRows: number) => {
  // ver el where
  const search = query.search || '';

  // calcular el total de filas por pagina
  const rows = query.limit || 10;

  // calcular la cantidad de paginas
  const pages = countRows > 0 ? Math.ceil(countRows / rows) : 1;

  // calcular la pagina actual
  const page = query.page ? (pages >= query.page ? query.page : pages) : 1;

  //puede seguir con la logica de paginacion
  const hasNextPage = page < pages;
  const hasPrevPage = page > 1;

  //ordenar por fecha de creacion
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
