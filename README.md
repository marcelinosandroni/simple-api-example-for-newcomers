# Pequeno projeto demonstração

Este é um projeto simples para demonstração de como usar rotas com o Express, e utilizar o querybuilder do knex com mysql, e com erros customizados para definir textos sem informações internas do servidor, e com pegador de erros inclusive em modo assíncrono para não ocorrer erros fatais na aplicação e não precisar utilizar muito try e catch.

## Principais Dependências

- Express 5
- Knex
- Mysql
- Typescript

## Define o banco de dados

Crie um arquivo .env na pasta raiz, e insira os dados para conexão com um servidor mysql

```
DB_HOST = link
DB_USER = login
DB_PW = segredin
DB_SCHEMA = database
DB_PORT = 3306
```

## Scripts de tabelas

As tabelas `Alunos` e `Turmas` são criadas automaticamente caso não existam.

## Comandos para execução

**Para iniciar em modo desenvolvimento**

```
yarn dev
```

**Para iniciar em modo produçao**

```
yarn build
```

## Rotas

Consulte o arquivo `localhost.rest` para ver todas as rotas existentes.

## Autor

**Marcelino Sandroni**
