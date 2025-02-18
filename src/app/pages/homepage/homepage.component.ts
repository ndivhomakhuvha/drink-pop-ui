import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { catchError, Observable, of, tap } from 'rxjs';
import { ProductResponse } from '../../interfaces/ProductInterface';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent implements OnInit {
  products$: Observable<ProductResponse> | undefined;
  loading: boolean = true;
  errorMessage: string = '';
  constructor(private productService: ProductService) {}
  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService
      .getProducts()
      .pipe(
        tap(() => (this.loading = false)),
        catchError((error) => {
          this.errorMessage = 'An error occurred while fetching products.';
          this.loading = false;
          return of({ message: 'Error', statusCode: 500, data: [] });
        })
      )
      .subscribe({
        next: (data) => {
          console.log('Data fetched:', data);
          this.products$ = of(data);
        },
        error: (err) => {
          console.error('Error:', err);
          this.errorMessage = 'Failed to fetch products';
        },
      });
  }
}
