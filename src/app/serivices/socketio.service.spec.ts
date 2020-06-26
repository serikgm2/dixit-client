import { TestBed } from '@angular/core/testing';

import { SocketIoService } from './socket-io.service';

describe('GameService', () => {
  let service: SocketIoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocketIoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
