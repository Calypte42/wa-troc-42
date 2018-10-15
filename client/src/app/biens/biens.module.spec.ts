import { BiensModule } from './biens.module';

describe('BiensModule', () => {
  let biensModule: BiensModule;

  beforeEach(() => {
    biensModule = new BiensModule();
  });

  it('should create an instance', () => {
    expect(biensModule).toBeTruthy();
  });
});
