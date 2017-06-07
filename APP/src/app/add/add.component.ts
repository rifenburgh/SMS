import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  constructor(
    private myMessage:  MessageService
  ) { }
  formInfo: Object      = {};

  ngOnInit() {
  }
  addcustomer(info) {
    this.formInfo       = info;
    console.log('/add_component/info', info);
    this.myMessage.addcustomer(info)
      .then((item) => {});
  }
}
