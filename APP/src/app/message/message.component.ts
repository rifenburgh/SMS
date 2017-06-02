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
  text:                 String;
  phone:                String;

  constructor(
    private myHttp:     Http,
    private myMessage:  MessageService
  ) {}

  ngOnInit() {
    this.myMessage.allcustomers()
      .then((item) => {
        this.items    = item;
        console.log('/allcustomers', this.items);
      });
  }

  listmessage(phone) {
    this.phone = phone;
    this.myMessage.listmessage(phone)
      .then((item) => {
        this.messages = item;
        console.log('/component/listmessage/this.phone', phone, this.phone);
        // console.log('/listmessages/:phone', this.messages);
      });
  }

  editcustomer(phone) {
    this.phone = phone;
    
  }
  sendmessage(text) {
    console.log('component/sendmessage/phone', this.phone);
    this.myMessage.sendtext(text, this.phone)
      .then((item) => {
        console.log('component/sendmessage', this.phone);
      });
  }


}
