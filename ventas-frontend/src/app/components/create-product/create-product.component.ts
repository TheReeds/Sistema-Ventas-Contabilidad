import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})
export class CreateProductComponent {
  product = { name: '', detail: '', price: 0, imageUrl: '' };

  constructor(private productService: ProductService, private router: Router) {}

  createProduct(): void {
    const formData = new FormData();
    formData.append('name', this.product.name);
    formData.append('detail', this.product.detail);
    formData.append('price', this.product.price.toString());
    formData.append('imageUrl', this.product.imageUrl);

    this.productService.createProduct(formData).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
