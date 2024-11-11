import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'customTime'
})
export class CustomTimePipe implements PipeTransform {

  constructor(private datePipe: DatePipe) {}

  transform(value: any, format: string = 'hh:mm a'): any {
    if (!value) return null;

    // Prepend a default date to make it a valid ISO datetime string
    const dateStr = `1970-01-01T${value}Z`;
    const date = new Date(dateStr);

    // Use the injected DatePipe instance to format the date
    return this.datePipe.transform(date, format);
  }

}
