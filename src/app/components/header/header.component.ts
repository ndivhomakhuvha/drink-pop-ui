import { Component } from '@angular/core';
import { ImageComponent } from '../image/image.component';
import { IconsComponent } from '../icons/icons.component';
import { Icon } from '../../interfaces/IconInterface';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ImageComponent, IconsComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  logoImage: string =
    'https://res.cloudinary.com/dpf2xpavj/image/upload/v1740163067/drink-pop_m40wea.png';
  imageHeight: string = '35px';
  icon: Icon = {
    iconName: 'bag-handle',
    iconColor: 'black',
    iconHeight: '20px',
  };
  authenticated: boolean = true;
}
