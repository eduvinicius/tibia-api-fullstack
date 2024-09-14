/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MyErrorStateMatcherService } from './my-error-state-matcher.service';

describe('Service: MyErrorStateMatcher', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyErrorStateMatcherService]
    });
  });

  it('should ...', inject([MyErrorStateMatcherService], (service: MyErrorStateMatcherService) => {
    expect(service).toBeTruthy();
  }));
});
