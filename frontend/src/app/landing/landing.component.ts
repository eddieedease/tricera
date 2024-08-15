import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { StoreSerService } from '../store-ser.service';


@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent {

  message: string = '';

  // environment vars
  constructor(private storeService: StoreSerService) {}

  ngOnInit() {
    this.storeService.getHelloMessage().subscribe({
      next: (response) => {
        this.message = response.message;
      },
      error: (error) => {
        console.error('Error fetching message:', error);
        this.message = 'Error loading message';
      }
    });

    // logger test
    this.storeService.warn('This is a test warning');
  }
}
