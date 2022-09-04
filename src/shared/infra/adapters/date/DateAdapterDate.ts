import { DateAdapterInterface } from '../interfaces/DateAdapter';

export class DateAdapterDate implements DateAdapterInterface {
  private _MS_PER_DAY = 1000 * 60 * 60 * 24;

  diffInDays(startDate: Date, endDate: Date): number {
    const startDatUTC = Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
    const endDateUTC = Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());

    return Math.floor((endDateUTC - startDatUTC) / this._MS_PER_DAY);
  }
}
