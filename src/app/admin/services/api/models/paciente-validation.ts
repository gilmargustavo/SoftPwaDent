// angular
import { Injectable } from '@angular/core';

import { IPacienteValidation } from './paciente-validation-interface';


'use strict';

export class PacienteValidation implements IPacienteValidation {

  // keys
  //id: number;

  // properties
  ci:number;
  nombre: string;
  paterno: string;
  materno: string;
  celular: number;


}
