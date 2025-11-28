import { Component } from '@angular/core';

@Component({
  standalone: false,
  selector: 'renovate-playground-root',
  templateUrl: './app.component.html',
  styles: [
    `
      :host {
        display: block;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
      }
      .app-container {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
      }
      .app-header {
        background-color: #1976d2;
        color: white;
        padding: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .app-header h1 {
        margin: 0;
        font-size: 1.5rem;
      }
      .app-header nav a {
        color: white;
        margin-left: 1rem;
        text-decoration: none;
      }
      .app-header nav a:hover,
      .app-header nav a.active {
        text-decoration: underline;
      }
      .app-content {
        flex: 1;
        padding: 2rem;
      }
    `,
  ],
})
export class AppComponent {
  title = 'renovate-playground';
}
