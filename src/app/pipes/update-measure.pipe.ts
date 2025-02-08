import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'updateMeasure',
  standalone: true,
})
export class UpdateMeasurePipe implements PipeTransform {
  transform(value: number, itemType: string): string {
    if (itemType === 'SNACK') return `${value} ГР`;
    return `${value} л`;
  }
}
