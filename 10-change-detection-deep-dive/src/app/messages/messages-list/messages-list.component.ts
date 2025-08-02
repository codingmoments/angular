import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MessagesService } from '../messages.service';

@Component( {
  selector: 'app-messages-list',
  standalone: true,
  templateUrl: './messages-list.component.html',
  styleUrl: './messages-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ AsyncPipe ],
} )
export class MessagesListComponent {
  private messagesService = inject( MessagesService );
  messages$ = this.messagesService.messages$;

  get debugOutput() {
    console.log( '[MessagesList] "debugOutput" binding re-evaluated.' );
    return 'MessagesList Component Debug Output';
  }
}
