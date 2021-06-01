import {Erro} from '../utils/erro'
import {connection} from './connection'

enum Tabela {
  Aluno = 'Alunos',
  Turma = 'Turmas'
}

export type Aluno = {
  id: number
  nome: string
  idade: number
  turma_id: number
}

export type Turma = {
  id: number
  nome: string
}

// atalho pra alunos
const alunos = () => connection(Tabela.Aluno)
// atalho pra turmas
const turmas = () => connection(Tabela.Turma)

// pega tudo!
export const pegarTodosAlunos = async () => {
  const todosAlunos = await alunos()
  return todosAlunos
}

// pega um aluno por id
export const procurarAlunoPorId = async (id: number) => {
  // colocando um objeto id vai ser = {id: numero}
  // automaticamente o Knex entender coluna ID e o valor o numero
  const alunoProcurado = await alunos().where({id})
  return alunoProcurado
}

// pega aluno por nome
export const procurarAlunoPorNome = async (nome: string) => {
  const alunoProcurado = await alunos().where('nome', 'like', `%${nome}%`)
  return alunoProcurado
}

// cria um novo aluno
// Omit pega todos os campo do Aluno, mas omite (tira) o ID
export const criarAluno = async (aluno: Omit<Aluno, 'id'>) => {
  // cria usuário e retorna o id
  try {
    const novoAluno = await alunos().insert(aluno)
    return novoAluno
  } catch (e) {
    throw Erro.bancoDeDados()
  }
}

// atualizar aluno por ID
// Partial faz todos os campos do Aluno ser opcional
export const atualizarAluno = async (id: number, dados: Partial<Aluno>) => {
  // objeto em update, pega certinho as propriedades
  // colocando um array apos dados, vai retornar os dados novos
  const alunoAtualizado = alunos().update(dados).where({id})
  return alunoAtualizado
}

// deletar aluno por ID
export const deletarAluno = async (id: number) => {
  const alunoDeletado = await alunos().delete().where({id})
  return alunoDeletado
}

// pega todas as turmas
export const pegarTodasTurmas = async () => {
  const todasTurmas = await turmas()
  return todasTurmas
}

export const procurarTurmaPorId = async (id: number) => {
  const turmaProcurada = await turmas().where({id})
  return turmaProcurada
}

export const procurarTurmaPorNome = async (nome: string) => {
  const turmaProcurada = await turmas().where('nome', 'like', `%${nome}%`)
  return turmaProcurada
}

// cria um nova turma
export const criarTurma = async (turma: Omit<Turma, 'id'>) => {
  const novaTurma = await turmas().insert(turma)
  return novaTurma
}

// deleta por id
export const deletarTurmaPorId = async (id: number) => {
  const turmaDeletada = await turmas().delete().where({id})
  return turmaDeletada
}

export const pegarTurmaPorIdAluno = async (id: number) => {
  const turmaDoAluno = await turmas()
    .select('nome')
    .join(Tabela.Aluno, `${Tabela.Aluno}.turma_id`, `${Tabela.Turma}.id`)

  return turmaDoAluno
}

export const pegarTodosAlunosPorIdTurma = async (id: number) => {
  const alunosDaTurma = await alunos()
    .select(
      `${Tabela.Aluno}.nome as aluno`,
      `${Tabela.Aluno}.idade`,
      `${Tabela.Turma}.nome as turma`
    )
    .join(Tabela.Turma, `${Tabela.Aluno}.turma_id`, `${Tabela.Turma}.id`)
    .where(`${Tabela.Turma}.id`, id)
  return alunosDaTurma
}
