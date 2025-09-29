import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainNavComponent } from "./main-nav/main-nav.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MainNavComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('23-project-config');
}
