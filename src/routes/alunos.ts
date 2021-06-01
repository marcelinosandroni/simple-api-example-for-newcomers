import {Router} from 'express'
import * as consulta from '../database/consulta'
import {Erro} from '../utils/erro'
import {validarAluno} from '../utils/validar'

export const alunosRoute = Router()

// LISTA ALUNOS
// locahost/alunos
alunosRoute.get('/', async (req, res) => {
  const todosAlunos = await consulta.pegarTodosAlunos()
  res.send(todosAlunos)
})

// CRIA ALUNO
// localhost/alunos
alunosRoute.post('/', async (req, res) => {
  const alunoLimpinho = validarAluno(req.body)

  if (alunoLimpinho.turma_id) {
    const id = alunoLimpinho.turma_id
    const turma = await consulta.procurarTurmaPorId(id)
    if (!turma.length) throw Erro.dadosIncorretos('Numero da turma nao existe')
  }

  let novoAlunoId = (await consulta.criarAluno(alunoLimpinho)) as number[]

  const novoAluno = {
    id: novoAlunoId[0],
    ...alunoLimpinho
  }

  res.status(201).send(novoAluno)
})

// ATUALIZA ALUNO
// locahost/alunos/id
alunosRoute.put('/:id', async (req, res) => {
  const {id} = req.params
  const alunoComportado = validarAluno(req.body)

  const alunoComNovoVisual = consulta.atualizarAluno(
    Number(id),
    alunoComportado
  )

  res.send('Aluno atualizado')
})

alunosRoute.delete('/:id', async (req, res) => {
  const {id} = req.params

  const alunoExpulso = await consulta.deletarAluno(Number(id))

  if (alunoExpulso) {
    res.send(`Aluno expulso!`)
  } else {
    res.send('Aluno nao existe')
  }
})

alunosRoute.get('/procurar', async (req, res) => {
  const {nome} = req.query

  if (!nome) {
    throw Erro.dadosIncorretos('Pesquisa apenas por nome')
  }

  const alunoProcurado = await consulta.procurarAlunoPorNome(nome as string)

  res.send(alunoProcurado)
})
