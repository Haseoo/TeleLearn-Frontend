import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Conversation } from 'src/app/Models/Conversation';
import { MessagesService } from 'src/app/Services/messages.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.css']
})
export class ConversationListComponent implements OnInit {

  collection: Conversation[] = [];
  current: number = 1;
  perPage: number = 20;
  fetchError: boolean;
  errorMessage: string;

  constructor(private messagesService: MessagesService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.messagesService.getConversations(this.userService.GetCurrentUser().id).subscribe(
      dt => {
        this.collection = dt;
        this.collection.sort((first, second) => {return new Date(second.lastMessageTime).valueOf() - new Date(first.lastMessageTime).valueOf()})
      }, err => {
        this.errorMessage = (err.error.message) ? err.error.message : err.message;
        this.fetchError = true;
      }
    )
  }

  OnConversationClick(userId: number) {
    this.router.navigateByUrl(`/messages/${userId}`);
  }

}
