
import { browser, by, element, protractor } from 'protractor';
import { AdminView } from '../admin.po';
import { ValidationService } from '../common/services/validation.service';
import { E2eHelper } from '../common/e2eHelper';
import { BaseItemPageObject } from '../common/base-item.po';

export class PacienteItemPageObject extends BaseItemPageObject {
  constructor() {
    super(require('./paciente.metadata.json'));
  }
}
