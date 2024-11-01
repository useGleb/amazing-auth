import { Express } from 'express'
type ImportedModule = {
  registerModule: (app: Express) => void
}