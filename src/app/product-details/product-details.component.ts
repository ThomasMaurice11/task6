import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product!: any;
  constructor(private prodSer: ProductService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    let id = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.prodSer.getProductById(id).subscribe({
      next: (data) => {
        console.log(data);
        this.product=data;
      },
    });
  }

}
