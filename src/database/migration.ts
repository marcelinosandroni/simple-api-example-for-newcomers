import {connection} from './connection'

const temTabela = async (name: string) => connection.schema.hasTable(name)

export const criarAlunos = async () => {
  try {
    const tabelaExiste = await temTabela('Alunos')
    if (tabelaExiste) {
      console.log('Tabela alunos? Confere...')
      return
    }

    let r = await connection.schema.createTable('Alunos', table => {
      table.increments('id')
      table.string('nome')
      table.integer('idade')
      table.integer('turma_id').unsigned()
      table.foreign('turma_id').references('Turmas.id')
    })
    console.log('Tabela Alunos criada!')

    const alunosParaInserir = [
      {
        nome: 'Marcelino',
        idade: 29
      },
      {
        nome: 'Carol',
        idade: 27
      }
    ]

    r = await connection('Alunos').insert(alunosParaInserir)

    const describe = await connection.raw('describe Alunos')

    console.table(describe[0])
  } catch (e) {
    console.error(e.message.slice(0, e.message.indexOf('\n')))
  }
}

export const criarTurmas = async () => {
  try {
    const tabelaExiste = await temTabela('Turmas')
    if (tabelaExiste) {
      console.log('Tabela Turmas? Confere...')
      return
    }

    let r = await connection.schema.createTable('Turmas', table => {
      table.increments('id')
      table.string('nome')
    })
    console.log('Tabela Turmas criada!')

    const TurmasParaInserir = [
      {
        nome: 'cruz'
      },
      {
        nome: 'Epis'
      }
    ]

    r = await connection('Turmas').insert(TurmasParaInserir)

    const describe = await connection.raw('describe Turmas')

    console.table(describe[0])
  } catch (e) {
    console.error(e.message.slice(0, e.message.indexOf('\n')))
  }
}

export const deletarTabelas = async () => {
  try {
    const tabelaAlunosExiste = await temTabela('Alunos')
    if (!tabelaAlunosExiste) {
      console.log('Tabela Alunos nao existe')
    } else {
      const retorno = await connection.schema.dropTable('Alunos')
      console.log('Tabela Alunos deletada')
    }

    const tabelaTurmasExiste = await temTabela('Turmas')
    if (!tabelaTurmasExiste) {
      console.log('Tabela Turmas nao existe')
    } else {
      const retorno = await connection.schema.dropTable('Turmas')
      console.log('Tabela Turmas deletada')
    }
    console.log('Inicie o App novamente agora...')
    process.exit(0)
  } catch (e) {
    console.error(e.message.slice(0, e.message.indexOf('\n')))
  }
}
