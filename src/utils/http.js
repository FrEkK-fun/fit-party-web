import { QueryClient } from '@tanstack/react-query';

import backendURL from '../config';

const baseUrl = `${backendURL}/api`;
export const queryClient = new QueryClient();

export async function fetcher({ queryKey }) {
  const [url, token] = queryKey;

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

export async function poster({ url, body }) {
  try {
    const response = await fetch(`${baseUrl}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add Authorization header if token exists
        ...(body.token && {
          Authorization: `Bearer ${body.token}`,
        }),
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'An error occurred whilse posting data');
    }

    return data;
  } catch (error) {
    // Preserve original error message or fallback
    throw new Error(error.message || 'Failed to make request');
  }
}
