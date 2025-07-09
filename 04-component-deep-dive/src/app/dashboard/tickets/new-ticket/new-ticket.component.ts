import {
  Component,
  ElementRef,
  Query,
  QueryList,
  viewChild,
  viewChildren,
  ViewChildren,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../shared/button/button.component';
import { ControlComponent } from '../../../shared/control/control.component';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [ButtonComponent, ControlComponent, FormsModule],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css',
})
export class NewTicketComponent {
  @ViewChildren(ControlComponent) controls!: ControlComponent[];

  onSubmit(title: string, request: string) {
    console.log('Title:', title);
    console.log('Request:', request);
    this.controls.forEach((control) => {
      console.log('Control:', control.label.call(control));
      control.onClick.call(control);
    });
  }
}
