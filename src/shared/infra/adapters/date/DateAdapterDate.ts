import { DateAdapterInterface } from '../interfaces/DateAdapter';

export class DateAdapterDate implements DateAdapterInterface {
  private _MS_PER_DAY = 1000 * 60 * 60 * 24;

  diffInDays(startDate: Date, endDate: Date): number {
    const startDatUTC = Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
    const endDateUTC = Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());

    return Math.floor((endDateUTC - startDatUTC) / this._MS_PER_DAY);
  }

  addDays(date: Date, days: number): Date {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + days);
    return newDate;
  }

  addHours(date: Date, hours: number): Date {
    const newDate = new Date(date);
    newDate.setHours(newDate.getHours() + hours);
    return newDate;
  }

  isBefore(referenceDate: Date, dateToCompare: Date): boolean {
    return referenceDate > dateToCompare;
  }
}
