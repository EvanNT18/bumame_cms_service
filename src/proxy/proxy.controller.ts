import { createProxyMiddleware } from 'http-proxy-middleware';
import { All, Controller, Next, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { NextFunction } from 'http-proxy-middleware/dist/types';

const proxy = createProxyMiddleware({
  router: (req: Request) => {
    return req.query.url as string;
  },
  ignorePath: true,
  changeOrigin: true,
  on: {
    proxyRes: (proxyRes, req, res) => {
      proxyRes.headers['Access-Control-Allow-Origin'] = '*';
      proxyRes.headers['Access-Control-Allow-Credentials'] = 'true';
    }
  }
});

@Controller('/proxy')
export class ProxyController {
  @All()
  get(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    proxy(req, res, next);
  }
}