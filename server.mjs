import { createServer } from 'node:http';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import { server as wisp, logging } from '@mercuryworkshop/wisp-js/server';
import { scramjetPath } from '@mercuryworkshop/scramjet/path';

const require = createRequire(import.meta.url);
const root = dirname(fileURLToPath(import.meta.url));
const controllerPath = dirname(require.resolve('@mercuryworkshop/scramjet-controller/dist/controller.api.js'));
const libcurlPath = dirname(require.resolve('@mercuryworkshop/libcurl-transport'));
const epoxyPath = dirname(require.resolve('@mercuryworkshop/epoxy-transport'));
const utilsPath = dirname(require.resolve('@mercuryworkshop/scramjet-utils'));

logging.set_level(logging.NONE);
Object.assign(wisp.options, {
  allow_udp_streams: false,
});

const fastify = Fastify({
  logger: false,
  serverFactory: (handler) => {
    return createServer()
      .on('request', (req, res) => {
        res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
        res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
        handler(req, res);
      })
      .on('upgrade', (req, socket, head) => {
        const pathname = new URL(req.url ?? '/', 'http://localhost').pathname;
        if (pathname === '/wisp/' || pathname.endsWith('/wisp/')) {
          wisp.routeRequest(req, socket, head);
        } else {
          socket.end();
        }
      });
  },
});

fastify.register(fastifyStatic, {
  root,
  decorateReply: true,
  index: 'index.html',
});

fastify.register(fastifyStatic, {
  root: scramjetPath,
  prefix: '/scram/',
  decorateReply: false,
  wildcard: false,
});

fastify.register(fastifyStatic, {
  root: controllerPath,
  prefix: '/controller/',
  decorateReply: false,
  wildcard: false,
});

fastify.register(fastifyStatic, {
  root: libcurlPath,
  prefix: '/libcurl/',
  decorateReply: false,
  wildcard: false,
});

fastify.register(fastifyStatic, {
  root: epoxyPath,
  prefix: '/epoxy/',
  decorateReply: false,
  wildcard: false,
});

fastify.register(fastifyStatic, {
  root: utilsPath,
  prefix: '/utils/',
  decorateReply: false,
  wildcard: false,
});

fastify.setNotFoundHandler((req, reply) => {
  if (req.method === 'GET' && !req.url.startsWith('/wisp/')) {
    return reply.code(404).type('text/plain').send('Chicken: file not found');
  }
  return reply.code(404).send();
});

fastify.server.on('listening', () => {
  const address = fastify.server.address();
  const port = typeof address === 'object' && address ? address.port : 8080;
  console.log(`Chicken is running locally: http://localhost:${port}/`);
  console.log('Do not open index.html directly; use this local URL.');
});

const port = Number.parseInt(process.env.PORT ?? '', 10) || 8080;
await fastify.listen({ port, host: '127.0.0.1' });
