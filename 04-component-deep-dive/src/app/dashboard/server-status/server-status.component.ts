import { Component } from '@angular/core';

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.css',
})
export class ServerStatusComponent {
  currentStatus: 'online' | 'offline' | 'unknown' = 'online';

  ngOnInit() {
    setInterval(() => {
      const randomNumber = Math.random();
      if (randomNumber < 0.33) {
        this.currentStatus = 'online';
      } else if (randomNumber < 0.66) {
        this.currentStatus = 'offline';
      } else {
        this.currentStatus = 'unknown';
      }
    }, 5000);
  }
}
