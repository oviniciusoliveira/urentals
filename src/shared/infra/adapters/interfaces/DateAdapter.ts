export interface DateAdapterInterface {
  diffInDays(startDate: Date, endDate: Date): number;
  addDays(date: Date, days: number): Date;
  addHours(date: Date, hours: number): Date;
  isBefore(referenceDate: Date, dateToCompare: Date): boolean;
}
