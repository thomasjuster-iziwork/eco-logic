import { UpdateOdometerPresenterInterface } from '@eco/domain/src/Traveling/UseCase/UpdateOdometer/UpdateOdometerPresenterInterface';
import { AddCarPresenterInterface } from '@eco/domain/src/Traveling/UseCase/AddCar/AddCarPresenterInterface';
import { AddFlightPresenterInterface } from '@eco/domain/src/Traveling/UseCase/AddFlight/AddFlightPresenterInterface';
import { AddFlightResponse } from '@eco/domain/src/Traveling/UseCase/AddFlight/AddFlightResponse';
import { AddCarResponse } from '@eco/domain/src/Traveling/UseCase/AddCar/AddCarResponse';
import { GetCarsResponse } from '@eco/domain/src/Traveling/UseCase/GetCars/GetCarsResponse';
import { UpdateOdometerResponse } from '@eco/domain/src/Traveling/UseCase/UpdateOdometer/UpdateOdometerResponse';
import { GetFlightsPresenterInterface } from '@eco/domain/src/Traveling/UseCase/GetFlights/GetFlightsPresenterInterface';
import { GetCarsPresenterInterface } from '@eco/domain/src/Traveling/UseCase/GetCars/GetCarsPresenterInterface';
import { TravelingUI } from '@eco/frontend-interface-adapter/src/Traveling/TravelingUI';
import { Car } from '@eco/domain/src/Traveling/Entity/Car';
import { PlaneTravel } from '@eco/domain/src/Traveling/Entity/PlaneTravel';
import { CarViewModel, FlightViewModel, ViewModel } from '@eco/frontend-interface-adapter/src/Traveling/ViewModel';
import { GetFlightsResponse } from '@eco/domain/src/Traveling/UseCase/GetFlights/GetFlightsResponse';

export class TravelingUIPresenter
  implements UpdateOdometerPresenterInterface,
    GetCarsPresenterInterface,
    AddCarPresenterInterface,
    AddFlightPresenterInterface,
    GetCarsPresenterInterface,
    GetFlightsPresenterInterface,
    TravelingUI {

  private cars: Car[] = [];
  private _viewModel = new ViewModel();
  private flights: PlaneTravel[] = [];

  constructor() {
  }

  get viewModel() {
    return this._viewModel;
  }

  presentGetCars(response: GetCarsResponse): void {
    this.cars = response.cars;
    this.updateCarViewModel();
  }

  presentGetFlights(response: GetFlightsResponse): void {
    this.flights = response.flights;
    this.updateFlightViewModel();
  }

  showUpdateOdometer(selectedCar: CarViewModel) {
    this.viewModel.doUpdateOdometerView({ displayed: true, selectedCar });
  }

  hideUpdateOdometer(): any {
    this.viewModel.doUpdateOdometerView({ displayed: false, selectedCar: undefined });
  }

  presentUpdateOdometer(response: UpdateOdometerResponse): void {
    if (response.isCarUnknown) {
      console.error('isCarEmpty');
    }
    if (response.isKmEmpty) {
      console.error('isKmEmpty');
    }
    if (response.isKmInvalid) {
      console.error('isKmInvalid');
    }
    if (response.updatedCar !== undefined) {
      const updatedCar = response.updatedCar;
      const index = this.cars.findIndex(car => car.id === updatedCar.id);
      if (index > -1) {
        this.cars[index] = updatedCar;
      }
      this.updateCarViewModel();
      this.viewModel.doUpdateOdometerView({ displayed: false, selectedCar: undefined });
    }
  }

  hideAddCar(): void {
    this.viewModel.doUpdateAddCarView({ displayed: false });
  }

  showAddCar(): void {
    this.viewModel.doUpdateAddCarView({ displayed: true });
  }

  presentAddCar(response: AddCarResponse): void {
    if (response.isConsumptionInvalid) {
      console.error('isConsumptionInvalid');
    }
    if (response.isEngineInvalid) {
      console.error('isEngineInvalid');
    }
    if (response.isKmInvalid) {
      console.error('isKmInvalid');
    }
    if (response.isNameEmpty) {
      console.error('isNameEmpty');
    }
    if (response.newCar !== undefined) {
      this.cars.unshift(response.newCar);
      this.updateCarViewModel();
      this.viewModel.doUpdateAddCarView({ displayed: false });
    }
  }

  cancelAddFlight(): void {
    this.viewModel.doUpdateAddFlightView({ displayed: false });
  }

  showAddFlight(): void {
    this.viewModel.doUpdateAddFlightView({ displayed: true });
  }

  presentAddFlight(response: AddFlightResponse): void {
    if (response.isInvalidKm) {
      console.error('invalid km');
    }
    if (response.isInvalidSeat) {
      console.error('invalid seat');
    }
    if (response.newFlight !== undefined) {
      this.flights.unshift(response.newFlight);
      this.updateFlightViewModel();
      this.viewModel.doUpdateAddFlightView({ displayed: false });
    }
  }

  private updateCarViewModel() {
    const cars = this.cars.map(car => {
      return new CarViewModel(car.id, car.name, car.km + ' Km');
    });

    this.viewModel.doUpdate({ cars });
  }

  private updateFlightViewModel() {
    const flights = this.flights.map(flight => {
      return new FlightViewModel(
        flight.date.toLocaleDateString('fr'),
        flight.km + ' Km',
        flight.description,
      );
    });
    this.viewModel.doUpdate({ flights });
  }
}
