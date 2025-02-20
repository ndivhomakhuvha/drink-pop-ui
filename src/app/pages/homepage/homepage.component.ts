import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { catchError, Observable, of, retry, tap } from 'rxjs';
import { ProductResponse } from '../../interfaces/ProductInterface';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WaitlistComponent } from '../../components/waitlist/waitlist.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, WaitlistComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent implements OnInit {
  products$: Observable<ProductResponse> | undefined;
  loading: boolean = false;
  errorMessage: string = '';

  constructor(private productService: ProductService) {}
  ngOnInit(): void {}

  getProducts(): void {
    this.productService
      .getProducts()
      .pipe(
        retry(4),
        tap(() => (this.loading = false))
      )
      .subscribe({
        next: (data) => {
          this.products$ = of(data);
        },
        error: (err) => {
          this.errorMessage = 'Failed to fetch products';
        },
      });
  }
}
