import axios from "axios";
export const HTTP_REQUEST_HEADER = {
  method: "GET",
  mode: "no-cors",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
};

type methodType = "get" | "post" | "patch" | "delete";
console.log(
  "process.env.MIX_SERVICE_ENDPOINT ",
  process.env.MIX_SERVICE_ENDPOINT
);
const baseURL = process.env.MIX_SERVICE_ENDPOINT;
const apiURL = `${baseURL || window.location.origin}`;

export const fetch_axios = async (
  method: methodType,
  url: string | { base: string; path: string; contentType: string },
  body?: any,
  params?: any,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  config?: any
) => {
  const { base, path, contentType } =
    typeof url === "object"
      ? url
      : { base: "", path: "", contentType: "application/json; charset=utf-8" };

  const response =
    typeof url === "object"
      ? await axios({
          method,
          url: !base
            ? baseURL
              ? `${baseURL}/${path}`
              : `${path}`
            : `${base}/${path}`,
          data: body,
          // timeout: 3 * 60 * 1000,
          params,
          headers: {
            "Content-Type": contentType,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
          },
        })
      : await axios({
          method,
          url: `${apiURL}/${url}`,
          data: body,
          // timeout: 3 * 60 * 1000,
          params,
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
          },
        });

  if (response && response.status === 200) {
    return response.data;
  }

  return response;
};

export const getEnvConfig = async () => {
  try {
    const res = await fetch_axios("get", "env");
    return res;
  } catch (e) {
    console.log(e);
  }
};

export const addwallet = async (
  wallet_address: string,
) => {
  return await fetch_axios("post", "add-wallet", {
    wallet_address,
  });
};

export const setBusinessId = async (
  business_id: string,
) => {
  return await fetch_axios("post", "set-business-id", {
    business_id,
  });
}

export { baseURL };
