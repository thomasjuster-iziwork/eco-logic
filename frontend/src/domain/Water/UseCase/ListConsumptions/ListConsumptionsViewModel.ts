import { WaterConsumption } from '@eco/core-water/src/entity/WaterConsumption';

export class ListConsumptionsViewModel {
  consumptions: WaterConsumption[] = [];
  noConsumptionsMessage = 'No consumption for the moment. Don\'t forget to add yours quickly';
  headerM3Label = 'm3';
  headerMeterNameLabel = 'Meter';
  headerDateLabel = 'Date';
}