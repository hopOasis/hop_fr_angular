import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ending',
  standalone: true,
})
export class EndingPipe implements PipeTransform {
  transform(value: string, ...args: number[]): unknown {
    const id = args[0] + 1;
    if (id > 1 && id < 5) {
      return value.slice(0, value.length - 1) + 'и';
    } else if (id >= 5) {
      return value.slice(0, value.length - 2) + 'ок';
    }
    return value;
  }
}
