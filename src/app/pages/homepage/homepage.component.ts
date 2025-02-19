import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { catchError, Observable, of, retry, tap } from 'rxjs';
import { ProductResponse } from '../../interfaces/ProductInterface';
import { WaitlistService } from '../../services/waitlist.service';
import { error } from 'console';
import { ResponseInterface } from '../../interfaces/ResponeInterface';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent implements OnInit {
  products$: Observable<ProductResponse> | undefined;
  loading: boolean = false;
  errorMessage: string = '';
  showInputValue: boolean = false;
  succesfullMessafe: boolean = false;
  email: string = '';
  emailForm: FormGroup;
  constructor(
    private productService: ProductService,
    private waitlistService: WaitlistService,
    private fb: FormBuilder
  ) {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
  ngOnInit(): void {
    // this.getProducts();
  }

  // getProducts(): void {
  //   this.productService
  //     .getProducts()
  //     .pipe(
  //       retry(4),
  //       tap(() => (this.loading = false)),
  //       catchError((error) => {
  //         this.errorMessage = 'An error occurred while fetching products.';
  //         this.loading = false;
  //         return of({ message: 'Error', statusCode: 500, data: [] });
  //       })
  //     )
  //     .subscribe({
  //       next: (data) => {
  //         console.log('Data fetched:', data);
  //         this.products$ = of(data);
  //       },
  //       error: (err) => {
  //         console.error('Error:', err);
  //         this.errorMessage = 'Failed to fetch products';
  //       },
  //     });
  // }

  showInput() {
    this.showInputValue = true;
  }
  submit() {
    if (this.emailForm.valid) {
      this.loading = true;
      this.waitlistService
        .addToWaitlist(this.emailForm.value.email)
        .pipe(
          retry(3),
          tap(() => this.loading == false),
          catchError((error: ResponseInterface) => {
            this.errorMessage = error.message;
            this.loading = false;
            return of({
              message: error.message + 'error here',
              statusCode: error.statusCode,
              data: [],
            });
          })
        )
        .subscribe({
          next: (data) => {
            this.succesfullMessafe = true;
            this.loading = false;
            this.errorMessage = data.message;
            console.log(data);
          },
          error: (err) => {
            this.errorMessage = err.message;
            console.log(err);
          },
        });
    }
  }
}
