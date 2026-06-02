import type { IAPIOption } from '~/types/api';

// Route all API calls through the Nitro server proxy (/api/...).
// On SSR this is an in-process call (no external HTTP round-trip).
// The proxy caches GET responses for 3 minutes, drastically reducing
// the number of real CMS requests when running under PM2 cluster mode.
export const useApi = async <T>(endpoint: string, options: IAPIOption): Promise<T> => {
  const response = await $fetch<T>(`/api${endpoint}`, {
    method: options.method as any,
    ...(options.data ? { body: options.data } : {}),
    ...(options.headers ? { headers: options.headers } : {}),
  });
  return response;
};
