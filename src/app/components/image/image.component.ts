import { Component, Input } from '@angular/core';
import {
  LazyLoadImageModule,
  LAZYLOAD_IMAGE_HOOKS,
  ScrollHooks,
} from 'ng-lazyload-image';

@Component({
  selector: 'app-image',
  standalone: true,
  imports: [LazyLoadImageModule],
  providers: [{ provide: LAZYLOAD_IMAGE_HOOKS, useClass: ScrollHooks }],
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss',
})
export class ImageComponent {
  @Input() defaultImage: string = '';
  @Input() image: string = '';
  @Input() height: string = '';
}
