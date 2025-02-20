import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'alert',
  standalone: true,
})
export class AlertPipe implements PipeTransform {
  transform(succesAlert: boolean | null): string {
    if (succesAlert == true) {
      return 'alert alert-success';
    } else if (succesAlert == false) {
      return 'alert alert-danger';
    } else {
      return 'alert alert-info';
    }
  }
}
