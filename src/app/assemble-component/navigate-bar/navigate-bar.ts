import { Component, OnInit, signal, afterNextRender, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { ThemeSwitcher } from '../theme-switcher/theme-switcher';

@Component({
  selector: 'app-navigate-bar',
  standalone: true,
  imports: [MenubarModule, ButtonModule, MenuModule, CommonModule, ThemeSwitcher],
  templateUrl: './navigate-bar.html',
  styleUrl: './navigate-bar.css'
})
export class NavigateBar implements OnInit {
  // 1. Chuyển sang Signal
  items = signal<MenuItem[] | undefined>(undefined);
  isSmallScreen = signal(false);

  constructor() {
    // 2. Fix lỗi SSR: Sau khi render lần đầu trên Browser mới bắt đầu check window
    afterNextRender(() => {
      this.checkScreenSize();

      // Lắng nghe sự kiện resize thay cho @HostListener để kiểm soát tốt hơn trong Zoneless
      window.addEventListener('resize', () => this.checkScreenSize());
    });
  }

  ngOnInit() {
    this.items.set([
      { label: 'Home', icon: 'pi pi-home', routerLink: '/home' },
      { label: 'Search', icon: 'pi pi-search', routerLink: '/search' },
      { label: 'Topics', icon: 'pi pi-list', routerLink: '/topics' },
      { label: 'Latest Content', icon: 'pi pi-clock', routerLink: '/lastest-content' },
      { label: 'New Item', icon: 'pi pi-file', routerLink: '/newcontent' }
    ]);
  }

  private checkScreenSize() {
    // Chỉ set khi giá trị thực sự thay đổi để tối ưu hiệu năng
    const isSmall = window.innerWidth < 800;
    if (this.isSmallScreen() !== isSmall) {
      this.isSmallScreen.set(isSmall);
    }
  }
}