import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { MessagesService } from '../messages.service';

@Component( {
  selector: 'app-messages-list',
  standalone: true,
  templateUrl: './messages-list.component.html',
  styleUrl: './messages-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class MessagesListComponent implements OnInit {
  private messagesService = inject( MessagesService );
  private cdRef = inject( ChangeDetectorRef );

  messages: string[] = [];

  ngOnInit(): void {
    this.messagesService.messages$.subscribe( ( messages ) => {
      this.messages = messages;
      this.cdRef.markForCheck();
    } );
  }

  get debugOutput() {
    console.log( '[MessagesList] "debugOutput" binding re-evaluated.' );
    return 'MessagesList Component Debug Output';
  }
}
