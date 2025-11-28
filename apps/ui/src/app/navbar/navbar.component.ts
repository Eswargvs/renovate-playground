import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule],
  styles: [`
    .navbar {
      border-radius: 0 0 8px 8px;
    }
    .navbar-brand {
      font-weight: 600;
      font-size: 1.5rem;
    }
    .nav-link {
      font-weight: 500;
      font-size: 1rem;
    }
    .navbar-nav .nav-link.active {
      text-decoration: underline;
    }
    .disabled-link {
      cursor: not-allowed;
      opacity: 0.6;
      pointer-events: none;
    }
  `]
})
export class NavbarComponent {}

