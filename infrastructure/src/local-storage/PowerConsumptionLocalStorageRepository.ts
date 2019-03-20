import { JsonOf } from './type/JsonOf';
import { PowerConsumptionRepository } from '@eco/core-electricity/src/repository/PowerConsumptionRepository';
import { PowerConsumption } from '@eco/core-electricity/src/entity/PowerConsumption';

export class PowerConsumptionLocalStorageRepository implements PowerConsumptionRepository {
  private key = 'power-consumptions';

  constructor(private localstorage: Storage) {
    if (!this.localstorage.getItem(this.key)) {
      this.saveList([]);
    }
  }

  async add(powerConsumption: PowerConsumption) {
    const list = this.getList();
    list.push(powerConsumption);
    this.saveList(list);
  }

  async getAll() {
    return this.getList();
  }

  async getLastConsumption(): Promise<PowerConsumption | undefined> {
    const consumptions = this.getList();
    if (consumptions.length === 0) {
      return undefined;
    }
    return consumptions[consumptions.length - 1];
  }

  private saveList(list: any[]) {
    const listAsJson = JSON.stringify(list);
    this.localstorage.setItem(this.key, listAsJson);
  }

  private getList(): PowerConsumption[] {
    const rawList: JsonOf<PowerConsumption>[] = JSON.parse(this.localstorage.getItem(this.key) || '[]');
    return rawList.map(raw => new PowerConsumption(raw.id, raw.kWh, raw.electricMeterId, new Date(raw.date)));
  }
}
