import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.css',
})
export class ServerStatusComponent implements OnInit, OnDestroy {
  currentStatus: 'online' | 'offline' | 'unknown' = 'online';
  private interval?: ReturnType<typeof setInterval>;

  ngOnInit() {
    this.interval = setInterval(() => {
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

  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
