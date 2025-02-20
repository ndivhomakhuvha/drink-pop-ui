import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { retry, tap, catchError, of } from 'rxjs';

import { ResponseInterface } from '../../interfaces/ResponeInterface';

import { WaitlistService } from '../../services/waitlist.service';
import { AlertComponent } from '../alert/alert.component';
import { ImageComponent } from '../image/image.component';
import { IconsComponent } from '../icons/icons.component';
import { Icon } from '../../interfaces/IconInterface';

@Component({
  selector: 'app-waitlist',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AlertComponent,
    ImageComponent,
    IconsComponent,
  ],
  templateUrl: './waitlist.component.html',
  styleUrl: './waitlist.component.scss',
})
export class WaitlistComponent {
  imageUrl: string =
    '../../../assets/images/500-ml-empty-glass-bottle-for-bevarage-500x500-removebg-preview.png';
  imageHeight: string = '300px';

  loading: boolean = false;
  successResponse: boolean = false;
  errorMessage: string = '';
  showInputValue: boolean = false;
  showAlert: boolean = false;
  emailForm: FormGroup;

  icon: Icon = {
    iconName: 'refresh-circle',
    iconColor: 'black',
    iconHeight: '30px',
  };

  constructor(
    private waitlistService: WaitlistService,
    private fb: FormBuilder
  ) {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
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
          tap(() => {
            this.loading = false;
          })
        )
        .subscribe({
          next: (data) => {
            this.showAlert = true;
            this.successResponse = true;
            this.loading = false;
            this.errorMessage = 'Sent data succesfully';
          },
          error: (err) => {
            this.showAlert = true;
            this.successResponse = false;
            this.loading = false;
            this.errorMessage = 'Something wrong happend to the server';
          },
          complete: () => {
            this.loading = false;
          },
        });
    }
  }

  restart() {
    this.showAlert = false;
    this.showInputValue = true;
    this.errorMessage = '';
    this.emailForm.reset();
  }
}
