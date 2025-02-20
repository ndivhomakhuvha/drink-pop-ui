import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { Icon } from '../../interfaces/IconInterface';

@Component({
  selector: 'app-icons',
  standalone: true,
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './icons.component.html',
  styleUrl: './icons.component.scss',
})
export class IconsComponent {
  @Input() icon: Icon = {
    iconName: '',
    iconColor: '',
    iconHeight: '',
  };
}
