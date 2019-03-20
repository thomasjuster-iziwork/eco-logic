import { v4 } from 'uuid';
import { ElectricMeterRepository } from '../repository/ElectricMeterRepository';
import { ElectricMeter } from '../entity/ElectricMeter';

export class InitElectricMeter {
  constructor(public readonly hasNightMeter: boolean) {
  }
}


export class InitElectricMeterHandler {
  constructor(private store: ElectricMeterRepository) {
  }

  async handle(request: InitElectricMeter) {
    if (request.hasNightMeter) {
      await this.store.add(new ElectricMeter(v4(), 'Day meter'));
      await this.store.add(new ElectricMeter(v4(), 'Night meter'));
    } else {
      await this.store.add(new ElectricMeter(v4(), 'Electric meter'));
    }
  }
}