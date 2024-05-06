import { DataProvider, fetchUtils } from "react-admin";
import { stringify } from "query-string";

const apiUrl = import.meta.env.VITE_API_URL as string;

const httpClient = (url: string, options = {}) => {
  const token = localStorage.getItem('token'); // If you're using token-based authentication
  if (token) {
    options.headers.set('Authorization', `Bearer ${token}`);
  }
  return fetchUtils.fetchJson(url, options)
}

export const dataProvider: DataProvider = {
  getList: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      ordering: `${order === 'ASC' ? '' : '-'}${field}`,
      page,
      perPage: perPage,
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}/`;
    return httpClient(url).then(({ headers, json }) => ({
      data: json.results,
      total: json.count,
    }));
  },
  getOne: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}/`).then(({ json }) => ({
      data: json,
    })),

  getMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    params.filter && Object.keys(params.filter).forEach(key => {
      query[key] = params.filter[key];
    });
    const url = `${apiUrl}/${resource}/bulk_list/?${stringify(query)}`;
    return httpClient(url).then(({ json }) => ({ data: json }));
  },
  //
  // getManyReference: (resource, params) => {
  //   const { page, perPage } = params.pagination;
  //   const { field, order } = params.sort;
  //   const query = {
  //     sort: JSON.stringify([field, order]),
  //     range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
  //     filter: JSON.stringify({
  //       ...params.filter,
  //       [params.target]: params.id,
  //     }),
  //   };
  //   const url = `${apiUrl}/${resource}?${stringify(query)}`;
  //
  //   return httpClient(url).then(({ headers, json }) => ({
  //     data: json,
  //     total: parseInt((headers.get('content-range') || "0").split('/').pop() || '0', 10),
  //   }));
  // },
  //
  update: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}/`, {
      method: 'PUT',
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json })),

  // updateMany: (resource, params) => {
  //   const query = {
  //     filter: JSON.stringify({ id: params.ids }),
  //   };
  //   return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
  //     method: 'PUT',
  //     body: JSON.stringify(params.data),
  //   }).then(({ json }) => ({ data: json }));
  // },
  //
  // create: (resource, params) =>
  //   httpClient(`${apiUrl}/${resource}`, {
  //     method: 'POST',
  //     body: JSON.stringify(params.data),
  //   }).then(({ json }) => ({
  //     data: { ...params.data, id: json.id } as any,
  //   })),
  //
  delete: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}/`, {
      method: 'DELETE',
    }).then(({ json }) => ({ data: json })),
  //
  // deleteMany: (resource, params) => {
  //   const query = {
  //     filter: JSON.stringify({ id: params.ids }),
  //   };
  //   return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
  //     method: 'DELETE',
  //   }).then(({ json }) => ({ data: json }));
  // }
};

