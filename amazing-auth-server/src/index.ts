import express, {Express} from 'express'
import dotenv from 'dotenv';
import 'reflect-metadata'
import bodyParser from 'body-parser'
import { AppDataSource } from './data-source';
import * as importedModules from './modules'
import { ImportedModule } from './types/Module';
import helmet from 'helmet';
dotenv.config()


const app: Express = express();
app.use(bodyParser.json());
app.use(helmet());

const modules = importedModules as unknown as ImportedModule[]

const prepareApp = async () => {
  try {
    console.log('[AA] Preparing app...')
    await AppDataSource.initialize()
    Object.keys(modules).forEach((importedModuleKey: string) => {
      //@ts-ignore
      const mod = modules[importedModuleKey as string] as ImportedModule
      mod.registerModule(app)
    })
  } catch(e) {
    console.error('[AA] Error app', e)
  }
}

prepareApp()

app.listen(process.env.PORT, () => console.log('[AA] App ready'))
