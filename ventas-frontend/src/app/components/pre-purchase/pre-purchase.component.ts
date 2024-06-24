import { Component, OnInit } from '@angular/core';
import { PrePurchaseService } from '../../services/pre-purchase.service';
import { SaleService } from '../../services/sale.service';
import { Router } from 'express';

@Component({
  selector: 'app-pre-purchase',
  standalone: true,
  imports: [],
  templateUrl: './pre-purchase.component.html',
  styleUrl: './pre-purchase.component.css'
})
export class PrePurchaseComponent implements OnInit {
  prePurchase: any;

  constructor(
    private prePurchaseService: PrePurchaseService,
    private saleService: SaleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.prePurchase = JSON.parse(localStorage.getItem('prePurchase') || '{}');
  }

  finalizePurchase(): void {
    this.saleService.createSale(this.prePurchase.id).subscribe(() => {
      (<any>this.router).navigate([`/sales`]);
    });
  }
}
