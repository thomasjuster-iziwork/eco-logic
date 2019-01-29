import { CarRepository } from '@eco/domain/src/traveling/repository/CarRepository';

export class GetCars {
  constructor() {
  }
}

export class GetCarsHandler {
  constructor(private store: CarRepository) {
  }

  handle() {
    return this.store.getAll();
  }
}
