import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'customTime'
})
export class CustomTimePipe implements PipeTransform {
  constructor(private datePipe: DatePipe) {}

  transform(value: string, format: string = 'hh:mm a'): any {
    if (!value) return null;

    // Extract the hours, minutes, and seconds with milliseconds
    const timeParts = value.split('.')[0]; // Ignore the microseconds
    const dateStr = `1970-01-01T${timeParts}Z`;
    const date = new Date(dateStr);

    // Adjust for IST by adding 5 hours and 30 minutes
    const istDate = new Date(date.getTime() + (5 * 60 + 30) * 60000);

    // Format the IST date
    return this.datePipe.transform(istDate, format);
  }
}
