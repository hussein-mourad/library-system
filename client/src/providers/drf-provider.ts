import { stringify } from "query-string";
import { Identifier, fetchUtils, DataProvider, CreateParams, UpdateParams } from "react-admin";

const createFormData = (params) => {
  const formData = new FormData();
  for (const key in params.data) {
    const value = params.data[key] || "";
    if (value && value.rawFile) {
      formData.append(key, value.rawFile);
    } else if (typeof value === 'object') {
      // Recursively check nested objects
      const nestedFormData = createFormData({ data: value });
      for (const [nestedKey, nestedValue] of nestedFormData.entries()) {
        formData.append(`${key}.${nestedKey}`, nestedValue);
      }
    } else {
      formData.append(key, value);
    }
  }
  return formData;
};

const getPaginationQuery = (pagination) => {
  return {
    page: pagination.page,
    perPage: pagination.perPage,
  };
};

const getFilterQuery = (filter) => {
  const { search, ...otherSearchParams } = filter;
  return {
    ...otherSearchParams,
    search,
  };
};

export const getOrderingQuery = (sort) => {
  const { field, order } = sort;
  return {
    ordering: `${order === "ASC" ? "" : "-"}${field}`,
  };
};

export default (
  apiUrl: string,
  httpClient = fetchUtils.fetchJson,
): DataProvider => {
  const getOneJson = (resource: string, id: Identifier) =>
    httpClient(`${apiUrl}/${resource}/${id}/`).then(
      (response: Response) => response.json,
    );

  return {
    getList: async (resource, params) => {
      const query = {
        ...getFilterQuery(params.filter),
        ...getPaginationQuery(params.pagination),
        ...getOrderingQuery(params.sort),
      };
      const url = `${apiUrl}/${resource}/?${stringify(query)}`;

      const { json } = await httpClient(url);

      return {
        data: json.results,
        total: json.count,
      };
    },

    getOne: async (resource, params) => {
      const data = await getOneJson(resource, params.id);
      return {
        data,
      };
    },

    getMany: (resource, params) => {
      return Promise.all(params.ids.map((id) => getOneJson(resource, id))).then(
        (data) => ({ data }),
      );
    },

    getManyReference: async (resource, params) => {
      const query = {
        ...getFilterQuery(params.filter),
        ...getPaginationQuery(params.pagination),
        ...getOrderingQuery(params.sort),
        [params.target]: params.id,
      };
      const url = `${apiUrl}/${resource}/?${stringify(query)}`;

      const { json } = await httpClient(url);
      return {
        data: json.results,
        total: json.count,
      };
    },

    update: async (resource, params) => {
      const { json } = await httpClient(`${apiUrl}/${resource}/${params.id}/`, {
        method: "PATCH",
        body: createFormData(params),
        // body: JSON.stringify(params.data),
      });
      return { data: json };
    },

    updateMany: (resource, params) =>
      Promise.all(
        params.ids.map((id) =>
          httpClient(`${apiUrl}/${resource}/${id}/`, {
            method: "PATCH",
            body: createFormData(params),
            // body: JSON.stringify(params.data),
          }),
        ),
      ).then((responses) => ({ data: responses.map(({ json }) => json.id) })),

    create: async (resource, params) => {
      const { json } = await httpClient(`${apiUrl}/${resource}/`, {
        method: "POST",
        body: createFormData(params),
        // body: JSON.stringify(params.data),
      });
      return {
        data: { ...json },
      };
    },

    delete: (resource, params) =>
      httpClient(`${apiUrl}/${resource}/${params.id}/`, {
        method: "DELETE",
      }).then(() => ({ data: params.previousData })),

    deleteMany: (resource, params) =>
      Promise.all(
        params.ids.map((id) =>
          httpClient(`${apiUrl}/${resource}/${id}/`, {
            method: "DELETE",
          }),
        ),
      ).then(() => ({ data: [] })),
  };
};
