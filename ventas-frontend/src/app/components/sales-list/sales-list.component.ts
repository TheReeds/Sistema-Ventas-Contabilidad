import { Component, OnInit } from '@angular/core';
import { SaleService } from '../../services/sale.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sales-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './sales-list.component.html',
  styleUrl: './sales-list.component.css'
})
export class SalesListComponent implements OnInit {
  sales: any[] = [];

  constructor(private saleService: SaleService) {}

  ngOnInit(): void {
    this.saleService.getSales().subscribe((data) => {
      this.sales = data;
    });
  }

  generateReport(): void {
    this.saleService.generateSalesReport().subscribe((blob) => {
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }
}
