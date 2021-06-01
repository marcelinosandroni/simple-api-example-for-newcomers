import {Aluno} from '../database/consulta'
import {Erro} from './erro'

export const validarAluno = (aluno: Omit<Aluno, 'id'>) => {
  const {nome, idade, turma_id = null} = aluno

  if (!nome || !idade) {
    throw Erro.dadosIncorretos('Informe nome e idade')
  }

  if (
    typeof nome !== 'string' ||
    typeof idade !== 'number' ||
    (turma_id && typeof turma_id !== 'number')
  ) {
    throw Erro.dadosIncorretos('nome deve ser texto, e idade deve ser numero')
  }

  return aluno
}
