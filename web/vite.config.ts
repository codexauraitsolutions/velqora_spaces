import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv, type Plugin } from 'vite'

// Runs the Vercel functions in /api during `npm run dev`, so uploads can be
// tested locally without the Vercel CLI. In production Vercel serves them.
function localApi(): Plugin {
  return {
    name: 'local-vercel-api',
    apply: 'serve',
    configureServer(server) {
      // Server-only secrets (no VITE_ prefix) from .env.local.
      Object.assign(process.env, loadEnv(server.config.mode, server.config.root, ''))

      server.middlewares.use('/api/', async (req, res, next) => {
        const name = (req.url ?? '').split('?')[0].replace(/^\/+|\/+$/g, '')
        if (!/^[\w-]+$/.test(name)) return next()
        try {
          const mod = await server.ssrLoadModule(`/api/${name}.ts`)
          const handler = mod[req.method ?? 'GET']
          if (typeof handler !== 'function') {
            res.statusCode = 405
            return res.end()
          }
          const chunks: Buffer[] = []
          for await (const chunk of req) chunks.push(chunk as Buffer)
          const request = new Request(`http://localhost${req.originalUrl}`, {
            method: req.method,
            headers: req.headers as Record<string, string>,
            body: chunks.length ? Buffer.concat(chunks) : undefined,
          })
          const response: Response = await handler(request)
          res.statusCode = response.status
          response.headers.forEach((value, key) => res.setHeader(key, value))
          res.end(Buffer.from(await response.arrayBuffer()))
        } catch (err) {
          next(err)
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), localApi()],
})
