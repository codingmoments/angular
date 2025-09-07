import { Component, inject, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { DataService } from '../shared/data.service';

@Component( {
  selector: 'app-user',
  imports: [],
  templateUrl: './user.html',
  styleUrl: './user.css',
  providers: [ UserService, DataService ]
} )
export class User implements OnInit {
  private userService = inject( UserService );
  private dataService = inject( DataService );

  user!: { name: string };
  isLoggedIn = false;
  data!: string;

  ngOnInit(): void {
    this.user = this.userService.user;
    this.dataService.getDetails().then( ( data: string ) => {
      this.data = data;
    } );
  }
}
