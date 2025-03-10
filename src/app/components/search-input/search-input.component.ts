import { Component } from '@angular/core';
import { IconsComponent } from '../icons/icons.component';
import { Icon } from '../../interfaces/IconInterface';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [IconsComponent],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss',
})
export class SearchInputComponent {
  iconSearch: Icon = {
    iconName: 'search-circle',
    iconColor: 'black',
    iconHeight: '30px',
  };

  filterIcon: Icon = {
    iconName: 'logo-apple-ar',
    iconColor: 'black',
    iconHeight: '20px',
  };
}
