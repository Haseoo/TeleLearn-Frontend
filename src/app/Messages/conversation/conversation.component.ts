import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Message } from 'src/app/Models/Message';
import { SendMessageRequest } from 'src/app/Models/Requests/SendMessageRequest';
import { User } from 'src/app/Models/User';
import { MessagesService } from 'src/app/Services/messages.service';
import { UserService } from 'src/app/Services/user.service';
import { IError } from 'src/IError';
import { Utils } from 'src/Utlis';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit, IError {

  error: boolean;
  errorMessage: string;

  participant: User;
  messages: Message[] = [];

  sendMessageForm: FormGroup;

  @ViewChild('messageContainer') private myScrollContainer: ElementRef;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private userService: UserService,
              private messagesService: MessagesService,
              private loadingBarService: LoadingBarService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => {
        this.loadingBarService.useRef('fetchMessages').start();
        this.userService.getUser(params.id).subscribe (
          dt => {
            this.participant = dt;
            this.FetchMessages();
            this.loadingBarService.useRef('fetchMessages').stop();
          },
          err => {
            Utils.HandleError(this, err);
            this.loadingBarService.useRef('fetchMessages').stop();
          }
        );
      }
    );
    this.sendMessageForm = this.formBuilder.group({
      message: ['']
    });
  }


  GetUserUrl(): string {
    return `/user/${this.participant.id}?backUrl=${this.router.url}`;
  }

  SendMessage() {
    this.error = false;
    const msg = this.sendMessageForm.value.message;
    if (!msg) {
      this.errorMessage = 'Nie można wysłać pustej wiadomości';
      this.error = true;
      return;
    }
    const request = new SendMessageRequest();
    request.content = msg;
    request.senderId = this.userService.GetCurrentUser().id;
    request.receiverId = this.participant.id;
    this.messagesService.sendMessage(request).subscribe(
      dt => {
        this.FetchMessages();
      }, err => {
        Utils.HandleError(this, err);
      }
    );
    this.sendMessageForm.reset();
  }

  SanitazeMessage(message: string): string{
    return message.replace(/<[^>]*>/g, '').replace('\n', '<br />');
  }

  FetchMessages() {
    this.messagesService.getConversation(this.userService.GetCurrentUser().id, this.participant.id).subscribe (
      dt => {
        this.messages = dt;
        setTimeout(() => this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight);
      }, err => {
         Utils.HandleError(this, err);
      }
    );
  }

  GetAuthorFromMessage(message: Message) {
    return `${message.sender.name} ${message.sender.surname}`;
  }

  IsMessageSendByParticipant(message: Message) {
    return message.sender.id === this.participant.id;
  }

}
