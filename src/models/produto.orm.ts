import { DataTypes, Model, type Optional } from 'sequelize';
import { sequelize } from '../config/database.js';

interface ProdutoAttributes {
  id: number;
  nome: string;
  preco: number;
}

type ProdutoCreationAttributes = Optional<ProdutoAttributes, 'id'>;

export class ProdutoOrm
  extends Model<ProdutoAttributes, ProdutoCreationAttributes>
  implements ProdutoAttributes
{
  declare id: number;
  declare nome: string;
  declare preco: number;
}

ProdutoOrm.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nome: { type: DataTypes.STRING, allowNull: false },
    preco: { type: DataTypes.FLOAT, allowNull: false },
  },
  { sequelize, tableName: 'produtos', timestamps: false }
);