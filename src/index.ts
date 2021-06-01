import {criarAlunos, criarTurmas, deletarTabelas} from './database/migration'
import {app} from './server'

const criarTabelasSeNaoExistir = async () => {
  await criarTurmas()
  await criarAlunos()
  console.log('Banco de dados prontinho!')
}

criarTabelasSeNaoExistir()

// DESMARQUE se quiser DELETAR as TABELAS
// deletarTabelas()

app.listen(3000, () => console.log('server rodando da porta 3000'))
