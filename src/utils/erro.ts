export class Erro {
  constructor(public code: number, public message: string) {}

  static dadosIncorretos(message: string) {
    return new Erro(404, message)
  }

  static bancoDeDados() {
    return new Erro(500, 'Erro do banco de dados')
  }

  static interno() {
    return new Erro(500, 'Erro interno do servidor')
  }
}
