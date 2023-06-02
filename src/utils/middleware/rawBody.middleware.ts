import { RequestWithRawBody } from '../request-with-raw-body.interface';
import { json } from 'body-parser';
import { Response } from 'express';

export default function rawBodyMiddleware() {
  return json({
    verify: (req: RequestWithRawBody, res: Response, buf: Buffer) => {
      if (req.url.startsWith('/webhook') && Buffer.isBuffer(buf)) {
        req.rawBody = Buffer.from(buf);
      }
      return true;
    },
  });
}
