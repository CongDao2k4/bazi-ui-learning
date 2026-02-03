import { Component, signal, afterNextRender } from '@angular/core';
import { Button } from "primeng/button";

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  templateUrl: './theme-switcher.html',
  styleUrl: './theme-switcher.css',
  imports: [Button]
})
export class ThemeSwitcher {
  // 1. Dùng Signal để lưu trạng thái
  isDarkMode = signal(false);

  // Trong ThemeSwitcher component
  constructor() {
    afterNextRender(() => {
      // Code này chỉ chạy ở Browser, an toàn với localStorage và document
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') {
        this.isDarkMode.set(true);
        this.applyTheme(true);
      }
    });
  }

  toggleDarkMode() {
    this.isDarkMode.update(val => !val);
    this.applyTheme(this.isDarkMode());

    // Lưu lại cho lần sau
    localStorage.setItem('theme', this.isDarkMode() ? 'dark' : 'light');
  }

  private applyTheme(isDark: boolean) {
    const element = document.documentElement;
    if (isDark) {
      element.classList.add('my-app-dark');
    } else {
      element.classList.remove('my-app-dark');
    }
  }
}