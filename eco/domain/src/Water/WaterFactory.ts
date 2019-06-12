import { AddConsumption } from '@eco/domain/src/Water/UseCase/AddConsumption/AddConsumption';
import { AddWaterMeter } from '@eco/domain/src/Water/UseCase/InitWaterMeter/AddWaterMeter';
import { GetWaterMeters } from '@eco/domain/src/Water/UseCase/GetWaterMeters/GetWaterMeters';
import { ListConsumptions } from '@eco/domain/src/Water/UseCase/ListConsumptions/ListConsumptions';
import { HomePresenterInterface } from '@eco/domain/src/Water/UseCase/Home/HomePresenterInterface';
import { WaterPresenter } from '@eco/domain/src/Water/WaterPresenter';
import { AddConsumptionPresenterInterface } from '@eco/domain/src/Water/UseCase/AddConsumption/AddConsumptionPresenterInterface';
import { GetWaterMetersPresenterInterface } from '@eco/domain/src/Water/UseCase/GetWaterMeters/GetWaterMetersPresenterInterface';
import { ListConsumptionsPresenterInterface } from '@eco/domain/src/Water/UseCase/ListConsumptions/ListConsumptionsPresenterInterface';
import { WaterController } from '@eco/domain/src/Water/WaterController';
import { api } from '@eco/domain/src/Temp/Api';
import { ConsumptionFakeApiRepository } from 'frontend/src/infrastructure/Water/ConsumptionFakeApiRepository';
import { AddWaterMeterPresenterInterface } from '@eco/domain/src/Water/UseCase/InitWaterMeter/AddWaterMeterPresenterInterface';
import { WaterMeterFakeApiRepository } from 'frontend/src/infrastructure/Water/WaterMeterFakeApiRepository';

export class WaterFactory {
  private instances: any = {};

  get getWaterMeterPresenter(): GetWaterMetersPresenterInterface {
    return this.waterPresenter;
  }

  get addWaterMeterPresenter(): AddWaterMeterPresenterInterface {
    return this.waterPresenter;
  }

  get controller() {

    return this.reuseOrInstantiate(
      WaterController.name,
      () => new WaterController(
        this.addConsumptionPresenter,
        this.getWaterMeterPresenter,
        this.addWaterMeterPresenter,
        this.listConsumptionsPresenter,
        new AddConsumption(new ConsumptionFakeApiRepository(api)),
        new AddWaterMeter(new WaterMeterFakeApiRepository(api)),
        new GetWaterMeters(new WaterMeterFakeApiRepository(api)),
        new ListConsumptions(new ConsumptionFakeApiRepository(api)),
      ),
    );
  }

  get listConsumptionsPresenter(): ListConsumptionsPresenterInterface {
    return this.waterPresenter;
  }

  get homePresenter(): HomePresenterInterface {
    return this.waterPresenter;
  }

  get addConsumptionPresenter(): AddConsumptionPresenterInterface {
    return this.waterPresenter;
  }

  private get waterPresenter(): WaterPresenter {
    return this.reuseOrInstantiate(WaterPresenter.name, () => new WaterPresenter());
  }

  private reuseOrInstantiate<T>(id: string, callback: () => T): T {
    if (this.instances[id] === undefined) {
      this.instances[id] = callback();
    }
    return this.instances[id];
  }
}
