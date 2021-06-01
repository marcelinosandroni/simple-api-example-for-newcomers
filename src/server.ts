import express from 'express'
import cors from 'cors'
import {alunosRoute} from './routes/alunos'
import {turmasRoute} from './routes/turmas'
import {pingRoute} from './routes/ping'
import {pegarErro} from './utils/pegarErro'

export const app = express()

app.use(express.json())
app.use(cors())

app.use('/alunos', alunosRoute)
app.use('/turmas', turmasRoute)
app.use('/ping', pingRoute)

app.use(pegarErro)
