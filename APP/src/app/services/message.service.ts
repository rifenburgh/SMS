import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class MessageService {
  BASE_URL: string      = 'http://localhost:3000';
  // BASE_URL: string      = 'https://radiant-forest-23151.herokuapp.com';

  text: string          = '';
  phone: string         = '';
  sms: Object           = {};
  formInfo: Object      = {};

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

  editcustomer(id) {
    const options       = { withCredentials: true };
    return this.myHttp.get(`${this.BASE_URL}/api/editcustomer/${id}`, options)
      .toPromise()
      .then(apiResponse => apiResponse.json())
  }

  addcustomer(info) {
    console.log('message.service/addcustomer/info', info);
    const options       = { withCredentials: true };
    return this.myHttp.post(`${this.BASE_URL}/api/addcustomer`, info)
      .toPromise()
      .then(apiResponse => apiResponse.json())
  }

}
