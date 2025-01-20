import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private dataSubject = new BehaviorSubject<any>(null); // Initial state is `null`
  tabledata$ = this.dataSubject.asObservable(); // Expose data as an observable

  // Method to set the data
  setData(tabledata: any) {
    this.dataSubject.next(tabledata);
  }

  // Method to get the current value of the data
  getData(): any {
    return this.dataSubject.value;
  }
}
