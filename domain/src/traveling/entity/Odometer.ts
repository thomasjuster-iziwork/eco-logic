export class Odometer {
  constructor(public readonly id: string, public readonly carId: string, public readonly km: number, public readonly date: Date) {
    if (!km) {
      throw new Error('km is required');
    }
  }

}
