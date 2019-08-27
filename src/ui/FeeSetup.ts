import init from '../domain/student/FeeSetup/FeeSetupApp';

export class FeeSetup {
  static templateUrl = '/partials/feesetup.html';
  constructor() {
    init();
  }
}
