import { auth } from "@/auth";

const BASE_URL = "http://localhost:6001/";

async function get(url: string) {
  const requestOptions = {
    method: "GET",
    headers: await getHeaders(),
  };

  const response = await fetch(BASE_URL + url, requestOptions);
  return handleResponse(response);
}

async function post(url: string, body: object) {
  const requestOptions = {
    method: "POST",
    headers: await getHeaders(),
    body: JSON.stringify(body),
  };

  const response = await fetch(BASE_URL + url, requestOptions);
  return handleResponse(response);
}

async function put(url: string, body: object) {
  const requestOptions = {
    method: "PUT",
    headers: await getHeaders(),
    body: JSON.stringify(body),
  };

  const response = await fetch(BASE_URL + url, requestOptions);
  return handleResponse(response);
}

async function del(url: string) {
  const requestOptions = {
    method: "DELETE",
    headers: await getHeaders(),
  };

  const response = await fetch(BASE_URL + url, requestOptions);
  return handleResponse(response);
}

async function getHeaders() {
  const session = await auth();

  const headers: any = {
    "Content-Type": "application/json",
  };

  if (session?.accessToken) {
    headers.Authorization = `Bearer ${session.accessToken}`;
  }

  return headers;
}

async function handleResponse(response: Response) {
  const text = await response.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch (error) {
    data = text;
  }
  if (response.ok) {
    return data || response.statusText;
  } else {
    const error = {
      status: response.status,
      message:  response.statusText
    };
    return { error };
  }
}

export const fetchWrapper = {
  get,
  post,
  put,
  del,
};