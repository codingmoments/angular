import {
  Component,
  ContentChild,
  ElementRef,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'control',
    '(click)': 'onClick()',
  },
})
export class ControlComponent {
  private el = inject(ElementRef);

  @ContentChild('input') private input!: ElementRef<
    HTMLInputElement | HTMLTextAreaElement
  >;

  label = input.required<string>();

  onClick() {
    console.log('Clicked!');
    console.log(this.el);
    console.dir(this.input.nativeElement);
  }
}
