import {Router} from 'express'
import * as consulta from '../database/consulta'
import {Erro} from '../utils/erro'

export const turmasRoute = Router()

turmasRoute.get('/', async (req, res) => {
  const todasTurmas = await consulta.pegarTodasTurmas()
  res.send(todasTurmas)
})

turmasRoute.post('/', async (req, res) => {
  const {nome} = req.body

  if (!nome || typeof nome !== 'string') {
    throw Erro.dadosIncorretos('Faz favor ne')
  }

  const [idNovaTurma] = await consulta.criarTurma({nome})

  const novaTurma = {
    id: idNovaTurma,
    nome
  }
  res.send(novaTurma)
})

turmasRoute.get('/:id', async (req, res) => {
  const {id} = req.params

  if (!Number(id)) throw Erro.dadosIncorretos('Id precisa ser numero')

  const alunosDaTruma = await consulta.pegarTodosAlunosPorIdTurma(Number(id))

  res.send(alunosDaTruma)
})

turmasRoute.delete('/:id', async (req, res) => {
  const {id} = req.params

  if (!Number(id)) throw Erro.dadosIncorretos('Id precisa ser numero')

  const turmaDeletada = await consulta.deletarTurmaPorId(Number(id))

  if (turmaDeletada) {
    res.send('Turma deletada!')
  } else {
    res.send('Turma nao existe')
  }
})
