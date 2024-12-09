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

export async function poster({ url, body, token }) {
  try {
    const response = await fetch(`${baseUrl}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'An error occurred while posting data');
    }

    return data;
  } catch (error) {
    throw new Error(error.message || 'Failed to make request');
  }
}

export async function patcher({ url, body, token }) {
  try {
    const response = await fetch(`${baseUrl}${url}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'An error occurred while updating data');
    }

    return data;
  } catch (error) {
    throw new Error(error.message || 'Failed to make request');
  }
}

export async function deleter({ url, token }) {
  try {
    console.log(url, token);
    const response = await fetch(`${baseUrl}${url}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'An error occurred while deleting data');
    }

    return data;
  } catch (error) {
    throw new Error(error.message || 'Failed to make request');
  }
}
