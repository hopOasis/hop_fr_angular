// order.store.ts
import {
  signalStore,
  withState,
  withMethods,
  withComputed,
  patchState,
} from '@ngrx/signals';
import { computed, DestroyRef, inject } from '@angular/core';
import { OrderService } from './order.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { OrderRes } from '../interfaces/order.interface';

export interface OrderState {
  orders: OrderRes[];
  sortBy: 'price' | 'date' | null;
  dateRange: { from: Date | null; to: Date | null };
  loading: boolean;
}

const initialState: OrderState = {
  orders: [],
  sortBy: null,
  dateRange: { from: null, to: null },
  loading: false,
};

export const OrderStore = signalStore(
  withState(initialState),

  withMethods((store) => {
    const orderService = inject(OrderService);
    const destroyRef = inject(DestroyRef);

    return {
      loadOrders() {
        patchState(store, { loading: true });
        orderService
          .getOrder()
          .pipe(takeUntilDestroyed(destroyRef))
          .subscribe((orders) => patchState(store, { orders, loading: false }));
      },

      setSort(sort: 'price' | 'date' | null) {
        patchState(store, { sortBy: sort });
      },

      setDateRange(from: Date | null, to: Date | null) {
        patchState(store, { dateRange: { from, to } });
      },
    };
  }),

  withComputed((state) => ({
    sortedOrders: computed(() => {
      let orders = [...state.orders()];

      if (state.sortBy() === 'price') {
        return orders.sort((a, b) => a.totalPrice - b.totalPrice);
      }

      if (state.sortBy() === 'date') {
        return orders.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      }

      return orders;
    }),

    filteredOrders: computed(() => {
      const { from, to } = state.dateRange();

      let orders = [...state.orders()];

      // 1. сортування
      if (state.sortBy() === 'price') {
        orders = orders.sort((a, b) => a.totalPrice - b.totalPrice);
      }

      if (state.sortBy() === 'date') {
        orders = orders.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      }

      // 2. фільтрація
      if (from) orders = orders.filter((o) => new Date(o.createdAt) >= from);
      if (to) orders = orders.filter((o) => new Date(o.createdAt) <= to);
      console.log(orders);
      return orders;
    }),
  }))
);
