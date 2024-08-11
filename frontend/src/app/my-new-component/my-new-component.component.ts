import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-new-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-new-component.component.html',
  styleUrl: './my-new-component.component.css',
})
export class MyNewComponentComponent {}
