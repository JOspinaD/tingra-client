import { BaseEntity } from './base-entity';
export interface Empresa extends BaseEntity {
    nombre: string;
    direccion: string;
    telefono: number;
    email: string;
    propietario: string;
    fechaCreacion?: Date;
    servicios?: string;
    redesSociales?: string;
    perteneceRedEmprendedores?: boolean;
    redEmprendedoresConfirmada?: boolean;
    aspectosMejorar?: string;
    capacitadores?: string;
    fechaLlamada?: Date;
    observaciones?: string;
    disponibilidad?: string;
    capacitacionRecibida?: boolean;
}
