import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class MessageService {
  BASE_URL: string      = 'http://localhost:3000';
  text: string          = '';
  phone: string         = '';
  sms: Object           = {};

  constructor(
    private myHttp:     Http
  ) { }

  allcustomers() {
    const options       = { withCredentials: true };
    return this.myHttp.get(`${this.BASE_URL}/api/listcustomers`, options)
      .toPromise()
      .then(apiResponse => apiResponse.json())
  }

  listmessage(phone) {
    const options       = { withCredentials: true };
    return this.myHttp.get(`${this.BASE_URL}/api/listmessage/${phone}`)
      .toPromise()
      .then(apiResponse => apiResponse.json())
  }
  sendtext(text, phone) {
    console.log('service/sendtext/text', text);
    console.log('service/sendtext/phone', phone );
    const options       = { withCredentials: true };
    return this.myHttp.post(`${this.BASE_URL}/api/sendtext/${phone}/${text}`, options)
      .toPromise()
      .then(apiResponse => apiResponse.json())
  }
}
