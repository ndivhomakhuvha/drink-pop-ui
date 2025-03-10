import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, Pipe } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { catchError, Observable, of, retry, tap } from 'rxjs';
import { Product } from '../../interfaces/Product';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductComponent } from '../../components/product/product.component';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { ResponseInterface } from '../../interfaces/ResponeInterface';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProductComponent,
    SearchInputComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent implements OnInit {
  products$: Observable<ResponseInterface<Product[]>> | undefined;
  loading: boolean = false;
  errorMessage: string = '';

  constructor(private productService: ProductService) {}
  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.loading = true;
    this.products$ = this.productService.getProducts().pipe(
      retry(4),
      tap(() => (this.loading = false)),
      catchError((error) => {
        this.loading = false;
        return of({
          message: 'Error fetching products',
          statusCode: 500,
          data: [],
        } as ResponseInterface<Product[]>);
      })
    );
  }
}
