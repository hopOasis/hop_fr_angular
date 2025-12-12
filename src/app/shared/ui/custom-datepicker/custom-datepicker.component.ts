import { Component, output, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-custom-datepicker',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './custom-datepicker.component.html',
  styleUrl: './custom-datepicker.component.scss',
})
export class CustomDatepickerComponent {
  dateRange = output<string>();
  open = signal(false);
  selectedRange = signal('');
  start: Date | null = null;
  end: Date | null = null;

  currentYear = signal(new Date().getFullYear());
  currentMonth = signal(new Date().getMonth());

  weekdays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

  toggle() {
    this.open.update((v) => !v);
  }

  pick(date: Date) {
    if (!this.start) {
      this.start = date;
    } else if (!this.end) {
      if (date < this.start) {
        this.end = this.start;
        this.start = date;
      } else this.end = date;
    } else {
      this.start = date;
      this.end = null;
    }

    if (this.start && this.end) {
      this.selectedRange.set(
        `${this.format(this.start)} - ${this.format(this.end)}`
      );
      this.dateRange.emit(this.selectedRange());
    }
  }

  format(d: Date) {
    return d.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: '2-digit',
    });
  }

  isSelected(date: Date) {
    return (
      (this.start && this.same(date, this.start)) ||
      (this.end && this.same(date, this.end))
    );
  }

  isBetween(date: Date) {
    return this.start && this.end && date > this.start && date < this.end;
  }

  same(a: Date, b: Date) {
    return a.toDateString() === b.toDateString();
  }

  monthName(i: number) {
    return [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ][i];
  }

  calendarDays() {
    const y = this.currentYear();
    const m = this.currentMonth();
    const first = new Date(y, m, 1);
    const last = new Date(y, m + 1, 0);

    const days = [];
    const offset = (first.getDay() + 6) % 7;

    for (let i = offset; i > 0; i--) {
      const d = new Date(y, m, 1 - i);
      days.push({ date: d, other: true });
    }

    for (let i = 1; i <= last.getDate(); i++) {
      days.push({ date: new Date(y, m, i), other: false });
    }

    const tail = 42 - days.length;
    for (let i = 1; i <= tail; i++) {
      days.push({ date: new Date(y, m + 1, i), other: true });
    }

    return days;
  }

  prevMonth() {
    let m = this.currentMonth() - 1;
    if (m < 0) {
      this.currentMonth.set(11);
      this.currentYear.update((y) => y - 1);
      return;
    }
    this.currentMonth.set(m);
  }

  nextMonth() {
    let m = this.currentMonth() + 1;
    if (m > 11) {
      this.currentMonth.set(0);
      this.currentYear.update((y) => y + 1);
      return;
    }
    this.currentMonth.set(m);
  }

  reset() {
    this.start = null;
    this.end = null;
    this.selectedRange.set('');
    this.dateRange.emit('reset');
  }

  selectToday() {
    const d = new Date();
    this.start = d;
    this.end = d;
    this.selectedRange.set(this.format(d));
    this.dateRange.emit(this.selectedRange());
  }

  selectYesterday() {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    this.start = d;
    this.end = d;
    this.selectedRange.set(this.format(d));

    this.dateRange.emit(this.selectedRange());
  }

  selectLastWeek() {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - 7);
    this.start = start;
    this.end = end;
    this.selectedRange.set(`${this.format(start)} - ${this.format(end)}`);
    this.dateRange.emit(this.selectedRange());
  }

  selectLastMonth() {
    const end = new Date();
    const start = new Date();
    start.setMonth(start.getMonth() - 1);
    this.start = start;
    this.end = end;
    this.selectedRange.set(`${this.format(start)} – ${this.format(end)}`);
    this.dateRange.emit(this.selectedRange());
  }

  selectLastQuarter() {
    const end = new Date();
    const start = new Date();
    start.setMonth(start.getMonth() - 3);
    this.start = start;
    this.end = end;
    this.selectedRange.set(`${this.format(start)} – ${this.format(end)}`);
    this.dateRange.emit(this.selectedRange());
  }
}
