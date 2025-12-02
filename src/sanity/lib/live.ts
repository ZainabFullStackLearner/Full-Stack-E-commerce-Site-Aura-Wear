// Sanity Content API
import { client } from './client'

export async function sanityFetch<T>({ query, params = {} }: { query: string; params?: Record<string, string | number> }): Promise<T> {
  return client.fetch<T>(query, params);
}

export const SanityLive = null;