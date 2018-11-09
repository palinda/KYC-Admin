import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'ngx-form-inputs',
  styleUrls: ['./form-inputs.component.scss'],
  templateUrl: './form-inputs.component.html',
})
export class FormInputsComponent {

  endpoint: string = '';

  api_token: string;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    return this.http.post(this.endpoint + '/monitoring/get_api_token', {}, { observe: 'response' })
      .subscribe(
        data => {
            this.api_token = data.body['token'];
        },
        err => {
          console.log("Error occured.")
        }
      )
  }

  generate() {
    this.http.post(this.endpoint + '/monitoring/generate_api_token', {}, { observe: 'response' })
      .subscribe(
        data => {
            this.api_token = data.body['token'];
        },
        err => {
          console.log("Error occured.")
        }
      )
  }

  copyText(){
    let val = this.api_token;
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

}
