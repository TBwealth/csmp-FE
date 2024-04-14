/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthModel } from "./_models";

const TOKEN = "token";

const getAuth = (): AuthModel | undefined => {
  if (!localStorage) {
    return;
  }

  const IsToken = localStorage.getItem(TOKEN)!;

  if (!IsToken) {
    return;
  }

  try {
    const token: any = JSON.parse(IsToken) as any;
    if (token) {
      return token;
    }
  } catch (error) {
    // console.error("AUTH LOCAL STORAGE PARSE ERROR", error);
  }
};

const setAuth = (auth: any) => {
  if (!localStorage) {
    return;
  }

  try {
    const IsToken = auth;
    localStorage.setItem(TOKEN, IsToken);
  } catch (error) {
    console.error("AUTH LOCAL STORAGE SAVE ERROR", error);
  }
};

const removeAuth = () => {
  if (!localStorage) {
    return;
  }

  try {
    localStorage.removeItem(TOKEN);
  } catch (error) {
    console.error("AUTH LOCAL STORAGE REMOVE ERROR", error);
  }
};

export function setupAxios(axios: any) {
  axios.defaults.headers.Accept = "application/json";
  axios.interceptors.request.use(
    (config: { headers: { Authorization: string } }) => {
      const auth = getAuth();
      if (localStorage.getItem("token")!) {
        config.headers.Authorization = `Bearer ${localStorage.getItem(
          "token"
        )}`;
      }

      return config;
    },
    (err: any) => Promise.reject(err)
  );
}

export { getAuth, setAuth, removeAuth, TOKEN };
