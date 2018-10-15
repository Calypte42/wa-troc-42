import { CompetencesModule } from './competences.module';

describe('CompetencesModule', () => {
  let competencesModule: CompetencesModule;

  beforeEach(() => {
    competencesModule = new CompetencesModule();
  });

  it('should create an instance', () => {
    expect(competencesModule).toBeTruthy();
  });
});
