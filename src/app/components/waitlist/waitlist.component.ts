import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  ViewChild,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { retry, tap, catchError, of } from 'rxjs';

import { ResponseInterface } from '../../interfaces/ResponeInterface';
import confetti from 'canvas-confetti';
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
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './waitlist.component.html',
  styleUrl: './waitlist.component.scss',
})
export class WaitlistComponent {
  @ViewChild('confettiCanvas') confettiCanvas!: ElementRef<HTMLCanvasElement>;
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
            this.errorMessage = data.message;
            this.launchConfetti();
          },
          error: (err) => {
            this.showAlert = true;
            this.successResponse = false;
            this.loading = false;
            if (err.error.message != 'Failed to fetch') {
              this.errorMessage = err.error.message; // Display actual error message
            } else {
              this.errorMessage = 'Oops! Something went wrong on our end.';
            }
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

  launchConfetti() {
    const myCanvas = this.confettiCanvas.nativeElement;
    const confettiInstance = confetti.create(myCanvas, { resize: true });

    confettiInstance({
      particleCount: 250,
      spread: 150,
      origin: { y: 0.6 },
      startVelocity: 15,
      decay: 0.95,
      ticks: 100,
    });
  }
}
