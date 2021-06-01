import {NextFunction, Request, Response} from 'express'
import {Erro} from './erro'

export const pegarErro = (
  error: Error | Erro,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof Erro) {
    res.status(error.code).send(error.message)
  } else {
    console.log(error)
    res.status(500).send('Erro desconhecido, me avisa ai')
  }
}
