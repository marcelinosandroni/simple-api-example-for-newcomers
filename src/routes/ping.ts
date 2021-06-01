import {Router} from 'express'
import {Erro} from '../utils/erro'

export const pingRoute = Router()

pingRoute.get('/', async (req, res) => {
  // throw Erro.dadosIncorretos('vish')
  throw new Error('kkkkk')
  res.send('Pong!')
})
