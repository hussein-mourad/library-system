import { DataProvider, fetchUtils } from "react-admin";
import { stringify } from "query-string";

const apiUrl = import.meta.env.VITE_API_URL as string;

const httpClient = (url: string, options = {}) => {
  const token = localStorage.getItem("token");
  if (token) {
    options.headers.set("Authorization", `Bearer ${token}`);
  }
  return fetchUtils.fetchJson(url, options);
};

const formatIdList = (ids) => ids.map((id) => `id=${id}`).join("&");

const getFiltering = (params: any) => {
  const { search, ...filter } = params.filter;
  return { search, ...filter };
};

const getOrdering = (params: any) => {
  const { field, order } = params.sort;
  return { ordering: `${order === "ASC" ? "" : "-"}${field}` };
};

const getPagination = (params: any) => {
  const { page, perPage } = params.pagination;
  return { page, perPage };
};

const dataProvider: DataProvider = {
  getList: (resource, params) => {
    const query = {
      ...getPagination(params),
      ...getOrdering(params),
      ...getFiltering(params),
    };
    const url = `${apiUrl}/${resource}/?${stringify(query)}`;
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
    const url = `${apiUrl}/${resource}/bulk_list/?${formatIdList(params.ids)}`;
    return httpClient(url).then(({ json }) => ({ data: json.results }));
  },

  getManyReference: (resource, params) => {
    const query = {
      ...getPagination(params),
      ...getOrdering(params),
      ...getFiltering(params),
      [params.target]: params.id,
    };
    const url = `${apiUrl}/${resource}/?${stringify(query)}`;
    return httpClient(url).then(({ headers, json }) => ({
      data: json,
      total: parseInt(
        (headers.get("content-range") || "0").split("/").pop() || "0",
        10,
      ),
    }));
  },

  update: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}/`, {
      method: "PATCH",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json })),

  updateMany: (resource, params) => {
    return httpClient(
      `${apiUrl}/${resource}bulk_update/?${formatIdList(params.ids)}`,
      {
        method: "PATCH",
        body: JSON.stringify(params.data),
      },
    ).then(({ json }) => ({ data: [...json] }));
  },

  create: (resource, params) =>
    console.log(params.data) ||
    httpClient(`${apiUrl}/${resource}/`, {
      method: "POST",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({
      data: { ...params.data, id: json.id } as any,
    })),

  delete: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}/`, {
      method: "DELETE",
    }).then(() => ({ data: params.previousData }) as any),

  deleteMany: (resource, params) => {
    return httpClient(
      `${apiUrl}/${resource}/bulk_delete/?${formatIdList(params.ids)}`,
      {
        method: "DELETE",
      },
    ).then(({ json }) => ({ data: [...json] }));
  },
};
export default dataProvider;
