import { NextFunction, Request, Response } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import { createClient } from 'redis';

export const rateLimiterMiddleware = async (request: Request, response: Response, next: NextFunction) => {
  const redisClient = createClient({
    legacyMode: true,
    socket: {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
    },
  });

  await redisClient.connect();

  const rateLimiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'rate-limiter',
    points: 3, // 3 requests
    duration: 1, // per 1 second by IP
  });

  try {
    await rateLimiter.consume(request.ip);
    return next();
  } catch (err) {
    response.status(429).send('Too Many Requests');
  }
};
