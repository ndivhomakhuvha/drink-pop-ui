import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AlertPipe } from '../../pipes/alert.pipe';
import { IconsComponent } from '../icons/icons.component';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule, AlertPipe, IconsComponent],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
})
export class AlertComponent implements OnInit {
  @Input() alertMessage: string = '';
  @Input() successAlert: boolean | null = true;
  ngOnInit(): void {}
}
