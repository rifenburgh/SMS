import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from '../services/message.service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})

export class EditComponent implements OnInit {
  items:                Object;

  constructor(
    private myMessage:  MessageService
  ) { }

  ngOnInit() {
    this.myMessage.editcustomer()
      .then((item) => {
        this.items      = item;
      });
  }

}
