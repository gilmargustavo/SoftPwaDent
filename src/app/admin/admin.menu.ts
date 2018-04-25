import { Injectable } from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

const APPMENUITEMS = [
  {
    state: 'admin',
    name: 'ADMIN',
    type: 'sub',
    icon: 'equalizer',
    badge: [
      { type: 'purple', value: '10' }
    ],
    children: [
      { state: 'home', name: 'Home' },
      { state: 'paciente', name: 'Pacientes' },
      { state: 'ncgOther', name: 'Citas' },
      { state: 'ncgTypeAndFormat', name: 'Historiales' },
      { state: 'ncgValidation', name: 'Ncg Validation' },
      { state: 'someItem', name: 'Seguimiento' },
      { state: 'tenant', name: 'Odontograma' },
      { state: 'typeOfType', name: 'Examen Clìnico' },
      { state: 'user', name: 'Usuarios' },
      { state: 'validation', name: 'Radiografias' }
    ]
  }
];

@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return APPMENUITEMS;
  }
}