import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { PLATFORM_ID } from '@angular/core';

import { of } from 'rxjs';

import { Page1Component } from './page-1.component';
import { ActiveOffersService } from '../data-access/services/active-offers.service';
import { ProductDescription } from '../../../catalog/data-access/models/product-description.model';

describe('Page1Component', () => {
  let component: Page1Component;
  let fixture: ComponentFixture<Page1Component>;
  let productsSpy: jasmine.SpyObj<ActiveOffersService>;

  const mockProducts: ProductDescription[] = [
    {
      id: 30001,
      beerName: 'Camelot',
      description:
        'Темний ель із глибокими нотами карамелі та дуба. Натхненний середньовічною міфологією, цей напій перенесе вас у часи королівських бенкетів.',
      beerColor: 'Brown',
      imageName: [
        'https://images-hop-oasis.s3.eu-central-1.amazonaws.com/beers/Camelot.jpg',
      ],
      averageRating: 0,
      ratingCount: 0,
      specialOfferIds: [],
      itemType: 'BEER',
      options: [
        {
          id: 30001,
          volume: 0.3,
          quantity: 0,
          price: 85,
        },
        {
          id: 30002,
          volume: 0.5,
          quantity: 0,
          price: 120,
        },
      ],
      reviews: [],
    },
    {
      id: 30003,
      beerName: 'Celestial Dream Brew',
      description:
        'Містичний нефільтрований IPA з цитрусовими відтінками та легким ароматом тропічних фруктів. Ідеально підходить для тих, хто мріє про небесні висоти.',
      beerColor: 'Golden',
      imageName: [
        'https://images-hop-oasis.s3.eu-central-1.amazonaws.com/beers/Celestial%20Dream%20Brew.jpg',
      ],
      averageRating: 0,
      ratingCount: 0,
      specialOfferIds: [],
      itemType: 'BEER',
      options: [
        {
          id: 30005,
          volume: 0.3,
          quantity: 52,
          price: 90,
        },
        {
          id: 30006,
          volume: 0.5,
          quantity: 62,
          price: 130,
        },
      ],
      reviews: [],
    },
    {
      id: 30004,
      beerName: 'Chornobyl Echo',
      description:
        'Сильний стаут із димним післясмаком, що передає дух занедбаного міста. Містить легкі ноти обсмаженого ячменю та кави.',
      beerColor: 'Green',
      imageName: [
        'https://images-hop-oasis.s3.eu-central-1.amazonaws.com/beers/Chornobyl%20Echo.jpg',
      ],
      averageRating: 0,
      ratingCount: 0,
      specialOfferIds: [],
      itemType: 'BEER',
      options: [
        {
          id: 30007,
          volume: 0.3,
          quantity: 50,
          price: 95,
        },
        {
          id: 30008,
          volume: 0.5,
          quantity: 70,
          price: 140,
        },
      ],
      reviews: [],
    },
    {
      id: 30005,
      beerName: 'Deserted Titan',
      description:
        'Барлівайн із потужним характером, що нагадує велич могутніх титанів. Поєднує смак сушених фруктів, меду та карамелі.',
      beerColor: 'Amber',
      imageName: [
        'https://images-hop-oasis.s3.eu-central-1.amazonaws.com/beers/Deserted%20Titan.jpg',
      ],
      averageRating: 0,
      ratingCount: 0,
      specialOfferIds: [],
      itemType: 'BEER',
      options: [
        {
          id: 30009,
          volume: 0.3,
          quantity: 55,
          price: 100,
        },
        {
          id: 30010,
          volume: 0.5,
          quantity: 70,
          price: 150,
        },
      ],
      reviews: [],
    },
    {
      id: 30006,
      beerName: 'Drifter’s Rest',
      description:
        'Пшеничне пиво з нотками спецій та цитрусових. Це ідеальний напій для мандрівників, які шукають короткий відпочинок серед хаосу.',
      beerColor: 'Yellow',
      imageName: [
        'https://images-hop-oasis.s3.eu-central-1.amazonaws.com/beers/Drifter_s%20Rest.jpg',
      ],
      averageRating: 0,
      ratingCount: 0,
      specialOfferIds: [],
      itemType: 'BEER',
      options: [
        {
          id: 30011,
          volume: 0.3,
          quantity: 49,
          price: 80,
        },
        {
          id: 30012,
          volume: 0.5,
          quantity: 70,
          price: 115,
        },
      ],
      reviews: [],
    },
  ];

  beforeEach(async () => {
    productsSpy = jasmine.createSpyObj('ActiveOffersService', [
      'getActiveOffers',
    ]);
    productsSpy.getActiveOffers.and.returnValue(of(mockProducts));

    await TestBed.configureTestingModule({
      imports: [Page1Component],
      providers: [
        provideHttpClient(),
        { provide: ActiveOffersService, useValue: productsSpy },
        { provide: PLATFORM_ID, useValue: 'browser' },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Page1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
