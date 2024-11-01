import { Express, Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";
import { passwordToHash } from "../../utils/hash";

type ReqiestWithBody<T,> = Request<any, any, T, any>


export const registerModule = (app: Express) => {
  //@ts-ignore
  app.post('/register', async (req: ReqiestWithBody<RegisterRequest>, res: any) => {
    try {
      const requestBody = req.body
      if (!requestBody?.password || !requestBody?.username) {
        return res.sendStatus(400)
      }

      const {hash, salt} = await passwordToHash(requestBody.password);


      const newUser: Partial<User> = {
        username: requestBody.username,
        password: hash,
        salt
      } 
      
      await AppDataSource.getRepository(User).insert(newUser)
      res.sendStatus(201)
    } catch {
      res.sendStatus(500)
    }
  })
  console.log('[AA] MODULE REGISTERED - REGISTER')
};
