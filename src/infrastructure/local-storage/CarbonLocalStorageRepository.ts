import { JsonOf } from './type/JsonOf';
import { v4 } from 'uuid';
import { CarbonRepository, Carbon } from '../../eco/domain';

export class CarbonLocalStorageRepository implements CarbonRepository {
  private key = 'carbons';

  constructor(private localstorage: Storage) {
    if (!this.localstorage.getItem(this.key)) {
      this.saveList([]);
    }
  }

  async add(carbon: Carbon) {
    const list = this.getList();
    list.push(carbon);
    this.saveList(list);
  }

  async getAll() {
    return this.getList();
  }

  async nextIdentity(): Promise<string> {
    return v4();
  }

  private saveList(list: any[]) {
    const listAsJson = JSON.stringify(list);
    this.localstorage.setItem(this.key, listAsJson);
  }

  private getList(): Carbon[] {
    const rawList: JsonOf<Carbon>[] = JSON.parse(this.localstorage.getItem(this.key) || '[]');
    return rawList.map(raw => new Carbon(raw.id, raw.kg, raw.description, new Date(raw.date)));
  }
}
