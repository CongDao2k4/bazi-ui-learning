import { Component, inject, signal, Input, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemCard } from '../item-card/item-card';
import { LasoService } from '../../services/laso-service';
import { DataViewModule } from 'primeng/dataview';

@Component({
  selector: 'app-relative-item',
  standalone: true,
  imports: [CommonModule, ItemCard, DataViewModule],
  templateUrl: './relative-item.html',
  styleUrl: './relative-item.css'
})
export class RelativeItem {
  private lasoService = inject(LasoService);

  resultList = signal<any[]>([]);
  isLoading = signal(false);

  @Input() set searchCriteria(value: any) {
    if (value) {
      this.search(value);
    }
  }

  search(criteria: any) {
    this.isLoading.set(true);
    this.lasoService.findSimilar(criteria).then(results => {
      this.resultList.set(results);
      this.isLoading.set(false);
    });
  }

  // Resizing logic
  private startX: number = 0;
  private startWidth: number = 0;
  private resizeListener: any;
  private stopResizeListener: any;

  onMouseDown(event: MouseEvent) {
    event.preventDefault(); // Prevent text selection
    this.startX = event.clientX;
    const element = (event.target as HTMLElement).closest('app-relative-item') as HTMLElement;
    // We need to resize the host element or the container. 
    // Since we are inside the component which is <app-relative-item>, we need reference to it.
    // Instead of complex DOM traversal, let's just bind a width variable if possible, 
    // OR we can emit an event to the parent? 
    // The user said "code làm sao cho cái bên phải của relative-item có thể kéo căn chỉnh chiều rộng".
    // I will use a direct DOM manipulation on a wrapper div inside the template, 
    // OR inject ElementRef to resize the host.

    // Let's rely on a wrapper div in the template for simplicity if the host is not easily accessible via event.target in that way.
    // Actually, handling this globally on document is better.
    this.startWidth = this.elementRef.nativeElement.offsetWidth;

    this.resizeListener = (e: MouseEvent) => this.onMouseMove(e);
    this.stopResizeListener = () => this.onMouseUp();

    document.addEventListener('mousemove', this.resizeListener);
    document.addEventListener('mouseup', this.stopResizeListener);
  }

  onMouseMove(event: MouseEvent) {
    const dx = event.clientX - this.startX;
    const newWidth = this.startWidth + dx;
    if (newWidth > 150 && newWidth < 800) { // Min/Max constraints
      this.elementRef.nativeElement.style.width = `${newWidth}px`;
    }
  }

  onMouseUp() {
    document.removeEventListener('mousemove', this.resizeListener);
    document.removeEventListener('mouseup', this.stopResizeListener);
  }

  constructor(private elementRef: ElementRef) { }
}

