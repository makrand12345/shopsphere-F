import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-products.html',
  styleUrls: ['./admin-products.css']
})
export class AdminProductsComponent implements OnInit {
  products: any[] = [];
  name = ''; price: number|null = null; description = ''; image = '';
  api = 'http://localhost:4000/api/products';
  editId: string | null = null;
  editModel: any = { title: '', price: null, description: '', imageUrl: '' };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.http.get<any[]>(this.api).subscribe(p => this.products = p);
  }

  add() {
    const payload = {
      title: this.name,
      price: Number(this.price),
      description: this.description,
      imageUrl: this.image,
      category: 'general',
      stock: 100,
      isActive: true
    };
    this.http.post(this.api, payload)
      .subscribe({
        next: () => { this.load(); this.name=''; this.price=null; this.description=''; this.image=''; },
        error: (err) => {
          const msg = err?.error?.message || err?.statusText || 'Failed to add product';
          alert(`Add product failed: ${msg}`);
        }
      });
  }

  remove(id: string) {
    this.http.delete(`${this.api}/${id}`).subscribe(() => this.load());
  }

  startEdit(p: any) {
    this.editId = p._id;
    this.editModel = {
      title: p.title,
      price: p.price,
      description: p.description,
      imageUrl: p.imageUrl || ''
    };
  }

  cancelEdit() {
    this.editId = null;
  }

  save(id: string) {
    const payload = {
      title: this.editModel.title,
      price: Number(this.editModel.price),
      description: this.editModel.description,
      imageUrl: this.editModel.imageUrl
    };
    this.http.put(`${this.api}/${id}`, payload).subscribe({
      next: () => { this.editId = null; this.load(); },
      error: (err) => alert(err?.error?.message || 'Update failed')
    });
  }
}
