import { BaseEntity } from "./base-entity";

export interface Usuario extends BaseEntity{
  nombre: string;
  correo: string;
  hashContraseña: string;
  direccion?: string;
  telefono?: string;
}
