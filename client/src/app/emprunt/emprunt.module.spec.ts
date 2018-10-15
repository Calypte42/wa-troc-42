import { EmpruntModule } from './emprunt.module';

describe('EmpruntModule', () => {
  let empruntModule: EmpruntModule;

  beforeEach(() => {
    empruntModule = new EmpruntModule();
  });

  it('should create an instance', () => {
    expect(empruntModule).toBeTruthy();
  });
});
