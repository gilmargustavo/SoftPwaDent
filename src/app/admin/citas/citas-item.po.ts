
import { browser, by, element, protractor } from 'protractor';
import { AdminView } from '../admin.po';
import { ValidationService } from '../controllers/services/validation.service';
import { E2eHelper } from '../controllers/e2eHelper';
import { BaseItemPageObject } from '../controllers/base-item.po';

export class CitasItemPageObject extends BaseItemPageObject {
  constructor() {
    super(require('./citas.metadata.json'));
  }
}
