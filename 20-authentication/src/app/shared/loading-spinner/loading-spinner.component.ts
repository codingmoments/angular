import { Component } from "@angular/core";

@Component( {
  selector: 'app-loading-spinner',
  template: '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>',
  styleUrl: './loading-spinner.component.css',
  standalone: true
} )
export class LoadingSpinnerComponent { }