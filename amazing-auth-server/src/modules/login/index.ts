import { Express, Request, Response } from 'express';
import { AppDataSource } from '../../data-source';
import { User } from '../../entity/User';
import { passwordToHashWithSalt } from '../../utils/hash';

type ReqiestWithBody<T> = Request<any, any, T, any>;

export const registerModule = (app: Express) => {
  //@ts-ignore
  app.post('/login', async (req: ReqiestWithBody<LoginRequest>, res: any) => {
    try {
      const requestBody = req.body;
      if (!requestBody?.username || !requestBody?.password) {
        return res.sendStatus(400);
      }
      const user = await AppDataSource.getRepository(User).findOne({
        where: {
          username: requestBody.username,
        }
      });
      if (!user.salt) {
        throw new Error('[AA] No salt')
      }
      const expectedHash = await passwordToHashWithSalt(requestBody.password, user.salt);
      if (expectedHash === user.password) {
        return res.sendStatus(200)
      } else {
        return res.sendStatus(400)
      }
    } catch {
      res.sendStatus(500);
    }
  });

  console.log('[AA] MODULE REGISTERED - LOGIN');
};
