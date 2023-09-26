import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  totalProducts: number = 20;
  pageSize = 5;
  currentPage:number=1;
  allProducts: any[] = [];
  constructor(private prodServ: ProductService) {}

  ngOnInit(): void {
    this.prodServ.getAllProducts(this.currentPage,this.pageSize).subscribe({
      next: (data) => {
        console.log(data);
        this.allProducts = data.products;
        this.totalProducts=data.totalProducts;
      },
    });
  }
  changePage(pageData:PageEvent){
    this.currentPage=pageData.pageIndex+1;
    this.pageSize=pageData.pageSize;    
    this.prodServ.getAllProducts(this.currentPage,this.pageSize).subscribe({
      next: (data) => {
        console.log(data);
        this.allProducts = data.products;
        this.totalProducts=data.totalProducts;
      },
    });
    
  }
}
