import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Recommendation {
  photo: string;
  name: string;
  position: string;
  comment: string;
  productLink: string;
}

@Injectable({ providedIn: 'root' })
export class TeamRecsService {
  private recommendations: Recommendation[] = [
    {
      photo: '/assets/olena.png',
      name: 'Олена',
      position: 'технолог',
      comment:
        'Подобається пиво сорту IPA (India Pale Ale) через його характерний гіркий смак, який надається використанням великої кількості хмелю. Також IPA часто має яскравий аромат хмелю, що робить його цікавим для любителів насичених смаків. ',
      productLink: 'http://localhost:4200/shop/details/30004?type=CIDER',
    },
    {
      photo: '/assets/andrew.png',
      name: 'Андрій',
      position: 'технолог',
      comment:
        'Подобається пиво сорту IPA (India Pale Ale) через його характерний гіркий смак, який надається використанням великої кількості хмелю. Також IPA часто має яскравий аромат хмелю, що робить його цікавим для любителів насичених смаків.',
      productLink: 'http://localhost:4200/shop/details/30004?type=CIDER',
    },
    {
      photo: '/assets/oleg.png',
      name: 'Олег',
      position: 'технолог',
      comment:
        'Подобається пиво сорту IPA (India Pale Ale) через його характерний гіркий смак, який надається використанням великої кількості хмелю.',
      productLink: 'http://localhost:4200/shop/details/30004?type=CIDER',
    },
  ];

  getRecommendations(): Observable<Recommendation[]> {
    return of(this.recommendations);
  }
}
