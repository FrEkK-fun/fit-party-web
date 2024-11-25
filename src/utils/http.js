import { QueryClient } from '@tanstack/react-query';

import backendURL from '../config';

export const queryClient = new QueryClient();

const baseUrl = `${backendURL}/api`;

export async function fetcher(url, token) {
  try {
    const res = await fetch(`${baseUrl}${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await res.json();

    if (!res.ok) {
      throw new Error(json.message);
    }

    return json;
  } catch (error) {
    throw new Error(error.message);
  }
}
