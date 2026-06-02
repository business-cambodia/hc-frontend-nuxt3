// server/api/[...path].ts
// Simple in-memory cache — avoids hammering the CMS on every SSR render.
// Mirrors the same pattern used in nuxt3_bc_frontend.
const _cache = new Map<string, { value: unknown; expiresAt: number }>();
const CACHE_TTL_MS = 60 * 3 * 1000; // 3 minutes
const CACHEABLE_METHODS = new Set(['GET', 'HEAD']);

// Paths that must NEVER be cached — they mutate counts on every request
const NOCACHE_PATHS = [
  '/article/views/',          // view counts — updated on every article visit
  '/advertisement/impressions/', // impression counts
  '/advertisement/clicks/',      // click counts
];

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const path = event.context.params?.path || '';
  const targetUrl = `${config.public.API_BASE_URL}/${path}`;
  const query = getQuery(event);
  const method = (event.node.req.method || 'GET').toUpperCase();
  const isVolatile = NOCACHE_PATHS.some(
    (p) => path.startsWith(p) || `/${path}`.startsWith(p)
  );
  const shouldCache = CACHEABLE_METHODS.has(method) && !isVolatile;

  // --- Cache read (GET / HEAD only) ---
  if (shouldCache) {
    const queryStr = new URLSearchParams(query as Record<string, string>).toString();
    const cacheKey = `${path}?${queryStr}`;

    const hit = _cache.get(cacheKey);
    if (hit && hit.expiresAt > Date.now()) {
      return hit.value;
    }

    try {
      const response = await $fetch(targetUrl, {
        method: method as any,
        query,
      });

      // Only cache plain JSON-serializable values to be safe
      try {
        const safe = JSON.parse(JSON.stringify(response));
        _cache.set(cacheKey, { value: safe, expiresAt: Date.now() + CACHE_TTL_MS });
        return safe;
      } catch {
        // Response isn't serializable — return as-is without caching
        return response;
      }
    } catch (error: any) {
      throw createError({
        statusCode: error?.response?.status || 500,
        statusMessage: error?.message || 'Internal Server Error',
        data: error?.data,
      });
    }
  }

  // --- Non-cacheable requests (POST, PUT, DELETE, PATCH, volatile GETs) ---
  try {
    return await $fetch(targetUrl, {
      method: method as any,
      query,
    });
  } catch (error: any) {
    throw createError({
      statusCode: error?.response?.status || 500,
      statusMessage: error?.message || 'Internal Server Error',
      data: error?.data,
    });
  }
});
