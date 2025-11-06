import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'updateMeasure',
  standalone: true,
})
export class UpdateMeasurePipe implements PipeTransform {
  transform(value: number | undefined, itemType: string | undefined): string {
    if (itemType === 'SNACK') return value ? `${value} гр` : '';
    return value ? `${value} л` : '';
  }
}
