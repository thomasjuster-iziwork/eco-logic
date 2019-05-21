import { api } from '../../../../api/frontend/src/Api';
import { HomePresenterInterface } from '@/domain/Traveling/UseCase/Home/HomePresenterInterface';

export class RefreshFlights {
  constructor(private presenter: HomePresenterInterface) {

  }

  async execute() {
    const flights = await api.getPlaneTravels();
    this.presenter.setFlights(flights);
  }
}