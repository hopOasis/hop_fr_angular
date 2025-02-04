import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.scss',
})
export class AllProductsComponent implements OnInit {
  private activeRoute = inject(ActivatedRoute);
  private router = inject(Router);
  ngOnInit(): void {
    const subscription = this.activeRoute.queryParams.subscribe(
      ({ sort_by }) => {
        // console.log(sort_by);
        //if (sort_by)
        // this.router.navigate([], {
        //   queryParams: {},
        //   relativeTo: this.activeRoute,
        // });
      }
    );
  }
}
