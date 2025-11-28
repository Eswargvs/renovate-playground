import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'renovate-playground-home',
  templateUrl: './home.component.html',
  styles: [
    `
      .home-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 3rem 2rem;
        text-align: center;
      }
      h1 {
        color: #1976d2;
        font-size: 2.5rem;
        margin-bottom: 1rem;
      }
      .intro {
        font-size: 1.2rem;
        line-height: 1.6;
        color: #555;
        margin-bottom: 3rem;
      }
      .features {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        margin-top: 2rem;
        max-width: 800px;
        margin-left: auto;
        margin-right: auto;
      }
      .feature {
        background: #f9f9f9;
        border-radius: 12px;
        padding: 2rem;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        position: relative;
      }
      .feature:not(.feature-disabled):hover {
        transform: translateY(-5px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        cursor: pointer;
      }
      .feature-disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
      .feature h3 {
        color: #1976d2;
        margin-top: 0;
        margin-bottom: 1rem;
        font-size: 1.5rem;
      }
      .feature p {
        margin: 0;
        font-size: 1rem;
        color: #555;
        line-height: 1.5;
      }
      .coming-soon {
        display: inline-block;
        margin-top: 1rem;
        padding: 0.5rem 1rem;
        background: #ff9800;
        color: white;
        border-radius: 20px;
        font-size: 0.85rem;
        font-weight: 600;
      }
    `,
  ],
})
export class HomeComponent {
  constructor(private router: Router) {}

  navigateToPlayground(): void {
    this.router.navigate(['/playground']);
  }
}
