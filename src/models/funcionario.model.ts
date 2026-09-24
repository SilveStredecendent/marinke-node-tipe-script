export interface IFuncionario {
  id?: number;
  nome: string;
  cargo: string;
  salario: number;
}

export class Funcionario{
  id?: number;
  nome: string;
  cargo: string;
  salario: number;  

  constructor({ id, nome, cargo, salario }: IFuncionario) {
    this.id = id;
    this.nome = nome;
    this.cargo = cargo;
    this.salario = salario;
  }

  estaAtivo(): boolean {
    return this.salario > 0;
  } 
}