import { AddConsumption } from '@eco/domain/src/Water/UseCase/AddConsumption/AddConsumption';
import { InitWaterMeter } from '@eco/domain/src/Water/UseCase/InitWaterMeter/InitWaterMeter';
import { GetWaterMeters } from '@eco/domain/src/Water/UseCase/GetWaterMeters/GetWaterMeters';
import { ListConsumptions } from '@eco/domain/src/Water/UseCase/ListConsumptions/ListConsumptions';
import { HomePresenterInterface } from '@eco/domain/src/Water/UseCase/Home/HomePresenterInterface';
import { WaterPresenter } from '@eco/domain/src/Water/WaterPresenter';
import { AddConsumptionPresenterInterface } from '@eco/domain/src/Water/UseCase/AddConsumption/AddConsumptionPresenterInterface';
import { GetWaterMetersPresenterInterface } from '@eco/domain/src/Water/UseCase/GetWaterMeters/GetWaterMetersPresenterInterface';
import { ListConsumptionsPresenterInterface } from '@eco/domain/src/Water/UseCase/ListConsumptions/ListConsumptionsPresenterInterface';
import { WaterController } from '@eco/domain/src/Water/WaterController';
import { api } from '@eco/domain/src/Temp/Api';

export class WaterFactory {
  private instances: any = {};

  get getWaterMeterPresenter(): GetWaterMetersPresenterInterface {
    return this.waterPresenter;
  }

  get controller() {

    return this.reuseOrInstantiate(
      WaterController.name,
      () => new WaterController(
        this.addConsumptionPresenter,
        this.getWaterMeterPresenter,
        this.listConsumptionsPresenter,
        new AddConsumption(api),
        new InitWaterMeter(api),
        new GetWaterMeters(api),
        new ListConsumptions(api),
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