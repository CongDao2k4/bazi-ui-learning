import { Component, OnInit, inject, signal, Output, EventEmitter } from '@angular/core';
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
import { LasoService } from '../../services/laso-service';

@Component({
  selector: 'app-item-content',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    SelectModule, ButtonModule, ToolbarModule, SplitButtonModule,
    InputTextModule, IconFieldModule, InputIconModule, EditorModule, ToastModule, DataViewModule, CommonModule
  ],
  providers: [MessageService],
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

  @Output() searchTrigger = new EventEmitter<any>();

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
    // Check if Year, Month, and Day are selected
    const isYearSelected = this.baziData[0].can && this.baziData[0].chi;
    const isMonthSelected = this.baziData[1].can && this.baziData[1].chi;
    const isDaySelected = this.baziData[2].can && this.baziData[2].chi;

    if (isYearSelected && isMonthSelected && isDaySelected) {
      // Local search (preserve existing behavior if needed, or update to use the shared service return)
      // The user said: "item-content thì đã có code kích hoạt... rồi". 
      // I am assuming the local display is still desired.

      this.lasoService.findSimilar(this.baziData).then(res => {
        // Using the new mock data structure, we might need to adapt it for the local display 
        // or if the local display expects {title, desc}.
        // The new mock data has {laso_id, tc1, ...}. 
        // I should probably map it if I want to keep the local display working OR update the local template.
        // Let's preserve the existing template logic by mapping or just letting it be if the template is robust.
        // Looking at item-content.html: it uses {{ item.title }} and {{ item.desc }}.
        // The new data doesn't have these. I should probably map the new data or update the mock.
        // To stay safe: I'll map it for local display.
        const mappedRes = res.map(item => ({
          title: `Lá số ${item.laso_id}`,
          desc: `Ngày: ${item.tc3} ${item.dc3}`
        }));
        this.similarLaso.set(mappedRes);
        this.isListVisible.set(true);
      });

      // Emit event for parent
      this.searchTrigger.emit(this.baziData);
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
