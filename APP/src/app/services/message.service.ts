import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class MessageService {
  BASE_URL: string      = 'http://localhost:3000';


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

}
