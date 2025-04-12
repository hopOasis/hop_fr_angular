import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { faqData } from '../../data-access/constants/faq';

@Component({
  selector: 'app-faq-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq-section.component.html',
  styleUrl: './faq-section.component.scss',
  animations: [
    trigger('accordion', [
      state(
        'open',
        style({ height: '*', opacity: 1, paddingTop: '*', paddingBottom: '*' })
      ),
      state(
        'closed',
        style({
          height: '0px',
          opacity: 0,
          paddingTop: '0px',
          paddingBottom: '0px',
        })
      ),
      transition('open <=> closed', [animate('200ms ease-in')]),
    ]),
  ],
})
export class FAQSectionComponent {
  openIndex: number[] = [];
  items = faqData.map((el, i) => ({
    ...el,
    title: `${i + 1}. ${el.title}`,
  }));

  toggle(index: number) {
    if (this.openIndex.includes(index)) {
      this.openIndex = this.openIndex.filter((el) => el !== index);
    } else {
      this.openIndex.push(index);
    }
  }
}
