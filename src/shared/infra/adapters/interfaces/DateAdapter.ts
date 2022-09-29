export interface DateAdapterInterface {
  diffInDays(startDate: Date, endDate: Date): number;
  addDays(date: Date, days: number): Date;
}
