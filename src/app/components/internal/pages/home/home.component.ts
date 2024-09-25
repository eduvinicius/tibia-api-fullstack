import { Component, OnInit } from '@angular/core';
import { CarouselComponent } from '../../../shared/carousel/carousel.component';
import { ICarousel } from '../../../../core/models/interfaces/carousel.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CarouselComponent]
})
export class HomeComponent implements OnInit {

  constructor() { }

  carouselItems: ICarousel[] = [
    {
      title: 'Personagens',
      subtitle: 'First slide subtitle',
      image: 'character.png',
      link: 'https://www.google.com',
      description: 'Navegue para conhecer os personagens cadastrados no Tibia'
    },
    {
      title: 'Criaturas',
      subtitle: 'Second slide subtitle',
      image: 'creatures.jpg',
      link: 'https://www.google.com',
      description: 'Conheça as criaturas do Tibia'
    },
    {
      title: 'Third slide',
      subtitle: 'Third slide subtitle',
      image: 'https://via.placeholder.com/100',
      link: 'https://www.google.com',
      description: 'Third slide description'
    },
    {
      title: 'Fourth slide',
      subtitle: 'Fourth slide subtitle',
      image: 'https://via.placeholder.com/100',
      link: 'https://www.google.com',
      description: 'Fourth slide description'
    },
    {
      title: 'Fifth slide',
      subtitle: 'Fifth slide subtitle',
      image: 'https://via.placeholder.com/100',
      link: 'https://www.google.com',
      description: 'Fifth slide description'
    },
    {
      title: 'Sixth slide',
      subtitle: 'Sixth slide subtitle',
      image: 'https://via.placeholder.com/100',
      link: 'https://www.google.com',
      description: 'Sixth slide description'
    }
  ];

  ngOnInit() {
  }

}
