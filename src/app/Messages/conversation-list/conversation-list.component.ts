import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Conversation } from 'src/app/Models/Conversation';
import { MessagesService } from 'src/app/Services/messages.service';
import { UserService } from 'src/app/Services/user.service';
import { IError } from 'src/IError';
import { Utils } from 'src/Utlis';

@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.css']
})
export class ConversationListComponent implements OnInit, IError {

  collection: Conversation[] = [];
  current = 1;
  perPage = 20;

  constructor(private messagesService: MessagesService,
              private userService: UserService) { }
  error: boolean;
  errorMessage: string;

  ngOnInit(): void {
    this.messagesService.getConversations(this.userService.GetCurrentUser().id).subscribe(
      dt => {
        this.collection = dt;
        this.collection.sort((first, second) => new Date(second.lastMessageTime).valueOf() - new Date(first.lastMessageTime).valueOf());
      }, err => {
        Utils.HandleError(this, err);
      }
    );
  }
}
