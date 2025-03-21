import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'updatePrice',
  standalone: true,
})
export class UpdatePricePipe implements PipeTransform {
  transform(value: number): string {
    return `${value} ГРН.`;
  }
}
