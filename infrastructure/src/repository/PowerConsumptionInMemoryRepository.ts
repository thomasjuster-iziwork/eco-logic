import { PowerConsumptionRepository } from '../../../domain/src/electricity/repository/PowerConsumptionRepository';
import { PowerConsumption } from '../../../domain/src/electricity/entity/PowerConsumption';

export class PowerConsumptionInMemoryRepository implements PowerConsumptionRepository {
  private consumptions: PowerConsumption[] = [];

  async add(powerConsumption: PowerConsumption) {
    this.consumptions.push(powerConsumption);
  }

  async getAll() {
    // slice, to be sure to return a COPY of the array (to now be able to push/pop)
    return this.consumptions.slice();
  }
}
