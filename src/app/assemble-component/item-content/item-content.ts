import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectModule } from 'primeng/select'; // Sử dụng Select thay cho Dropdown
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { EditorModule } from 'primeng/editor';
import { ToastModule } from 'primeng/toast';
import { MessageService, MenuItem } from 'primeng/api';
import { DataViewModule } from 'primeng/dataview'; // Import DataView

// Giả định LasoService để tìm kiếm dữ liệu
class LasoService {
  findSimilar(bazi: any): Promise<any[]> {
    // Giả lập trả về 5 kết quả
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([
          { id: 1, title: 'Lá số Nguyễn Văn A', desc: 'Giống 90% trụ ngày' },
          { id: 2, title: 'Lá số Trần Thị B', desc: 'Cùng can ngày, chi tháng' },
          { id: 3, title: 'Lá số Lê Văn C', desc: 'Mệnh cục tương đồng' },
          { id: 4, title: 'Lá số Phạm D', desc: 'Cách cục đặc biệt' },
          { id: 5, title: 'Lá số Hoàng E', desc: 'Năm sinh trùng khớp' }
        ]);
      }, 500);
    });
  }
}

@Component({
  selector: 'app-item-content',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    SelectModule, ButtonModule, ToolbarModule, SplitButtonModule,
    InputTextModule, IconFieldModule, InputIconModule, EditorModule, ToastModule, DataViewModule, CommonModule
  ],
  providers: [MessageService, LasoService],
  templateUrl: './item-content.html',
  styleUrl: './item-content.css'
})
export class ItemContent implements OnInit {
  // Dữ liệu Can/Chi
  thienCan = [
    { label: 'Giáp', value: 'Giáp' }, { label: 'Ất', value: 'Ất' }, { label: 'Bính', value: 'Bính' },
    { label: 'Đinh', value: 'Đinh' }, { label: 'Mậu', value: 'Mậu' }, { label: 'Kỷ', value: 'Kỷ' },
    { label: 'Canh', value: 'Canh' }, { label: 'Tân', value: 'Tân' }, { label: 'Nhâm', value: 'Nhâm' }, { label: 'Quý', value: 'Quý' }
  ];

  diaChi = [
    { label: 'Tý', value: 'Tý' }, { label: 'Sửu', value: 'Sửu' }, { label: 'Dần', value: 'Dần' },
    { label: 'Mão', value: 'Mão' }, { label: 'Thìn', value: 'Thìn' }, { label: 'Tỵ', value: 'Tỵ' },
    { label: 'Ngọ', value: 'Ngọ' }, { label: 'Mùi', value: 'Mùi' }, { label: 'Thân', value: 'Thân' },
    { label: 'Dậu', value: 'Dậu' }, { label: 'Tuất', value: 'Tuất' }, { label: 'Hợi', value: 'Hợi' }
  ];

  baziData = [
    { can: '', chi: '' }, // 0: Năm
    { can: '', chi: '' }, // 1: Tháng
    { can: '', chi: '' }, // 2: Ngày (Trọng tâm)
    { can: '', chi: '' }  // 3: Giờ
  ];

  valueLasoTitle = '';
  similarLaso = signal<any[]>([]); // Danh sách 5 lá số tương tự
  isListVisible = signal(true);
  items: MenuItem[] | undefined;
  exampleForm: FormGroup;
  formSubmitted = false;

  private messageService = inject(MessageService);
  private lasoService = inject(LasoService);
  private fb = inject(FormBuilder);

  constructor() {
    this.exampleForm = this.fb.group({
      text: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.items = [{ label: 'Update', icon: 'pi pi-refresh' }, { label: 'Delete', icon: 'pi pi-times' }];
  }

  toggleList() {
    this.isListVisible.update(v => !v);
  }

  // Khi có dữ liệu mới, tự động mở danh sách ra hoặc khi thay đổi dữ liệu can chi 
  onValueChange() {
    if (this.baziData[2].can && this.baziData[2].chi) {
      this.lasoService.findSimilar(this.baziData).then(res => {
        this.similarLaso.set(res);
        this.isListVisible.set(true); 
      });
    }
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.exampleForm.valid) {
      this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Dữ liệu đã ghi nhận', life: 3000 });
      this.formSubmitted = false;
    }
  }

  isInvalid(controlName: string) {
    const control = this.exampleForm.get(controlName);
    return control ? control.invalid && (control.touched || this.formSubmitted) : false;
  }
}