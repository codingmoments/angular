import { Component } from '@angular/core';
import { ButtonComponent } from '../../../shared/button/button.component';
import { ControlComponent } from '../../../shared/control/control.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [ButtonComponent, ControlComponent, FormsModule],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css',
})
export class NewTicketComponent {
  onSubmit(titleElement: HTMLInputElement, requestElement: HTMLTextAreaElement) {
    console.log('Form submitted');
    console.dir(titleElement);
    console.dir(requestElement);
    console.log('Title:', titleElement.value);
    console.log('Request:', requestElement.value);
  }
}
