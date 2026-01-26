import {
  Component,
  computed,
  input,
  OnInit,
  output,
  signal,
  WritableSignal,
} from '@angular/core';
import { SelectOption } from '../../interfaces/select-option.interface';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-sorting',
  standalone: true,
  imports: [FormsModule, ButtonComponent, TitleCasePipe],
  templateUrl: './sorting.component.html',
  styleUrl: './sorting.component.scss',
})
export class SortingComponent implements OnInit {
  disabled = input<string>();
  name = input.required<string>();
  selectOptions = input<SelectOption[] | undefined>();
  sortBy = output<string>();
  selectedOption = signal<string | null>(null);
  isActive = signal(false);
  iconToggle = computed(() =>
    this.isActive() ? 'icon-chevron-up' : 'icon-chevron-down'
  );

  defaultOptions: WritableSignal<SelectOption[]> = signal([
    { value: 'abc', text: 'Від дешевих' },
    { value: 'desc', text: 'Від дорогих' },
    { value: 'review', text: 'За рейтингом' },
    { value: 'bestsellers', text: 'За продажами' },
    { value: 'featured', text: 'Сортувати ', selected: true },
  ]);

  ngOnInit(): void {
    if (this.selectOptions()?.length) {
      this.defaultOptions.set(this.selectOptions()!);
    }
    this.updateActiveSelect();
  }

  onSelect(newValue: string) {
    this.selectedOption.set(newValue);
    this.sortBy.emit(newValue);
  }

  onClicked() {
    this.isActive.set(!this.isActive());
  }

  setSelect(id: number) {
    this.defaultOptions().forEach((item) => {
      item.selected = false;
    });
    this.defaultOptions()[id].selected = true;
    this.updateActiveSelect();
    this.sortBy.emit(this.defaultOptions()[id].value);
  }

  updateActiveSelect() {
    let activeSelect =
      this.defaultOptions().find((select) => select.selected) || null;

    this.selectedOption.set(activeSelect ? activeSelect.text : null);
  }
}
