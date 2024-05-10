import { fetchUtils } from "react-admin";
import { imageUrlToDataUri } from "@/lib/utils";
import { API_URL } from "@/config";

export interface Options {
  obtainAuthTokenUrl?: string;
}

function jwtTokenAuthProvider(options: Options = {}) {
  const opts = {
    obtainAuthTokenUrl: `${import.meta.env.VITE_API_URL}/token/`,
    ...options,
  };
  return {
    login: async ({ username, password }) => {
      const request = new Request(opts.obtainAuthTokenUrl, {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: new Headers({ "Content-Type": "application/json" }),
      });
      const response = await fetch(request);
      if (response.ok) {
        const responseJSON = await response.json();
        localStorage.setItem("access", responseJSON.access);
        localStorage.setItem("refresh", responseJSON.refresh);
        return;
      }
      if (response.headers.get("content-type") !== "application/json") {
        throw new Error(response.statusText);
      }

      const json = await response.json();
      const error = json.non_field_errors;
      throw new Error(error || response.statusText);
    },

    logout: () => {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      return Promise.resolve();
    },

    checkAuth: () => {
      // not secure we need to query the server instead
      return localStorage.getItem("access")
        ? Promise.resolve()
        : Promise.reject();
    },

    checkError: (error) => {
      const status = error.status;
      if (status === 401 || status === 403) {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        return Promise.reject();
      }
      return Promise.resolve();
    },

    getPermissions: () => {
      return Promise.resolve();
    },

    getIdentity: async () => {
      try {
        const response = await fetch(`${API_URL}/api/current-user/`, {
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          }),
        });
        const { user, profile } = await response.json();
        const { id, first_name, last_name, role } = user;
        const avatar = await imageUrlToDataUri(`${API_URL}/${profile.avatar}`);
        const fullName = `${first_name} ${last_name}`;
        return Promise.resolve({ id, fullName, avatar, role });
      } catch (error) {
        return Promise.reject(error);
      }
    },
  };
}

export function createOptionsFromJWTToken() {
  const token = localStorage.getItem("access");
  if (!token) {
    return {};
  }
  return {
    user: {
      authenticated: true,
      token: "Bearer " + token,
    },
  };
}

export function fetchJsonWithAuthJWTToken(url: string, options: object) {
  return fetchUtils.fetchJson(
    url,
    Object.assign(createOptionsFromJWTToken(), options),
  );
}
export default jwtTokenAuthProvider;
