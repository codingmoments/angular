import { Component, ElementRef, output, ViewChild, viewChildren } from '@angular/core';
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
  @ViewChild('form') private form?: ElementRef<HTMLFormElement>;
  private controls = viewChildren(ControlComponent);
  add = output<{ title: string; request: string }>();

  onSubmit(title: string, request: string) {
    this.add.emit({ title: title, request: request });
    this.controls().forEach((control) => {
      console.log('Control:', control.label.call(control));
      control.onClick.call(control);
    });
    this.form?.nativeElement.reset();
  }
}
