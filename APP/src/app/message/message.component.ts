import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  // items:               Array<any>;
  items:                Object;
  messages:             Object;

  constructor(
    private myHttp:     Http,
    private myMessage:  MessageService
  ) {}

  ngOnInit() {
    this.myMessage.allcustomers()
      .then((item) => {
        this.items = item;
        console.log('/allcustomers', this.items);
      });
  }

  listmessage(phone) {
    this.myMessage.listmessage(phone)
      .then((item) => {
        this.messages = item;
        console.log('/listmessages/:phone', this.messages);
      });
  }



}
