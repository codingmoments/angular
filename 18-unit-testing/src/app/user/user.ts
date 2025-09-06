import { Component, inject, OnInit } from '@angular/core';
import { UserService } from './user.service';

@Component( {
  selector: 'app-user',
  imports: [],
  templateUrl: './user.html',
  styleUrl: './user.css',
  providers: [ UserService ]
} )
export class User implements OnInit {
  private userService = inject( UserService );

  user!: { name: string };
  isLoggedIn = false;

  ngOnInit(): void {
    this.user = this.userService.user;
  }
}
