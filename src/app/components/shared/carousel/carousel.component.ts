import { Component, HostListener, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { ICarousel } from '../../../core/models/interfaces/carousel.interface';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  standalone: true,
  imports: [CommonModule, MatCardModule]
})
export class CarouselComponent implements OnInit {
  @Input() itemsToShow: number = 3;
  @Input() items: ICarousel[] = [];
  @Input() caroulselContainerWidth: string = '100%';
  @Input() imgsFromAssets: boolean = false;
  currentIndex: number = 0;
  isMobile: boolean = false;
  transition: boolean = true;

  ngOnInit(): void {
    this.checkScreenSize();
  }

  @HostListener('window:resize', [])
  checkScreenSize(): void {
    this.isMobile = window.innerWidth <= 768;
    this.itemsToShow = this.isMobile ? 1 : this.itemsToShow;
  }

  previous(): void {
    this.transition = true;
    if (this.currentIndex === 0) {
      this.currentIndex = this.items.length - this.itemsToShow;
    } else {
      this.currentIndex--;
    }
  }

  next(): void {
    this.transition = true;
    if (this.currentIndex >= this.items.length - this.itemsToShow) {
      this.currentIndex = 0;
    } else {
      this.currentIndex++;
    }
  }

  getTransform(): string {
    const percentage = -(this.currentIndex * (100 / this.itemsToShow));
    return `translateX(${percentage}%)`;
  }

  get assets(): string {
    return '../../../../assets/img/'
  }
}
