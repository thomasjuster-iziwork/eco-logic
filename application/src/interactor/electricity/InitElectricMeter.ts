import { ElectricMeterRepository } from 'domain/src/electricity/repository/ElectricMeterRepository';
import ElectricMeter from 'domain/src/electricity/entity/ElectricMeter';
import { v4 } from 'uuid';

export class InitElectricMeter {
  constructor(public readonly hasNightMeter: boolean) {
  }
}


export class InitElectricMeterHandler {
  constructor(private powerConsumptionStore: ElectricMeterRepository) {
  }

  async handle(request: InitElectricMeter) {
    if (request.hasNightMeter) {
      await this.powerConsumptionStore.add(new ElectricMeter(v4(), 'Day meter'));
      await this.powerConsumptionStore.add(new ElectricMeter(v4(), 'Night meter'));
    } else {
      await this.powerConsumptionStore.add(new ElectricMeter(v4(), 'Electric meter'));
    }
  }
}
