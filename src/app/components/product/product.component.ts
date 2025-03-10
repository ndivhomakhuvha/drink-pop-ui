import { Component, Input } from '@angular/core';
import { Product } from '../../interfaces/Product';
import { ImageComponent } from '../image/image.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [ImageComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  @Input() product!: Product;
  imageHeight: string = '100px';
}
