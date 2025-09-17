import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { PLATFORM_ID } from '@angular/core';

import { of } from 'rxjs';

import { Page1Component } from './page-1.component';
import { GetProductsService } from './services/get-products.service';
import { ProductDescription } from '../../catalog/data-access/models/product-description.model';

describe('Page1Component', () => {
  let component: Page1Component;
  let fixture: ComponentFixture<Page1Component>;
  let productsSpy: jasmine.SpyObj<GetProductsService>;

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

  let service: GetProductsService;
  beforeEach(async () => {
    productsSpy = jasmine.createSpyObj('GetProductsService', ['getProducts']);
    productsSpy.getProducts.and.returnValue(of(mockProducts));

    await TestBed.configureTestingModule({
      imports: [Page1Component],
      providers: [
        provideHttpClient(),
        { provide: GetProductsService, useValue: productsSpy },
        { provide: PLATFORM_ID, useValue: 'browser' },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Page1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products on init', async () => {
    await fixture.whenStable();
    // expect(productsSpy.getProducts).toHaveBeenCalled();
    expect(component.weekProductsCount).toBe(10);
    expect(component.currentProducts().length).toBeGreaterThan(0);
  });

  describe('updateStepper()', () => {
    it('should set step = 1 for mobile (<640px)', () => {
      spyOnProperty(window, 'innerWidth').and.returnValue(500);
      component.updateStepper();
      expect(component['step']()).toBe(1);
    });

    it('should set step = 2 for tablet (<1024px)', () => {
      spyOnProperty(window, 'innerWidth').and.returnValue(800);
      component.updateStepper();
      expect(component['step']()).toBe(2);
    });

    it('should set step = 3 for small desktop (<1440px)', () => {
      spyOnProperty(window, 'innerWidth').and.returnValue(1200);
      component.updateStepper();
      expect(component['step']()).toBe(3);
    });

    it('should set step = 4 for large desktop (>=1440px)', () => {
      spyOnProperty(window, 'innerWidth').and.returnValue(1600);
      component.updateStepper();
      expect(component['step']()).toBe(4);
    });
  });

  describe('slideLeft()', () => {
    beforeEach(() => {
      component['step'].set(2);
      component['startIndex'].set(2);
      fixture.detectChanges();
    });

    it('should decrease startIndex when possible', () => {
      component.slideLeft();
      expect(component['startIndex']()).toBe(0);
      expect(component.disabledLeft).toBeTrue();
    });

    it('should not go below zero', () => {
      component['startIndex'].set(0);
      component.slideLeft();

      expect(component['startIndex']()).toBe(0);
      expect(component.disabledLeft).toBeTrue();
    });
  });

  describe('slideRight()', () => {
    beforeEach(() => {
      component['step'].set(2);
      component['startIndex'].set(0);
      fixture.detectChanges();
    });

    it('should increase startIndex when possible', async () => {
      await fixture.whenStable();
      component.slideRight();
      expect(component['startIndex']()).toBe(2);
      expect(component.disabledRight).toBeFalse();
    });

    it('should disable right button at end', () => {
      component['startIndex'].set(4);
      component.slideRight();
      expect(component.disabledRight).toBeTrue();
    });
  });
});
