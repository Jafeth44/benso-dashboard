import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({
  name: 'customTimePipe',
  standalone: true
})
export class CustomTimePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return moment(value,'HH:mm').format("h:mm A");
  }
}