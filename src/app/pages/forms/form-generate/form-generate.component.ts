import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NbToastrService } from '@nebular/theme';
import { NgxModalContentComponent } from '../../extra-components/modal-content';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';

@Component({
  selector: 'ngx-form-generate',
  styleUrls: ['./form-generate.component.scss'],
  templateUrl: './form-generate.component.html',
})
export class FormGenerateComponent {

  creatingUsers = false;
  endpoint = '';
  userids = undefined;
  results = '';

  constructor(private http: HttpClient, private modalService: NgbModal, private toastrService: NbToastrService) {
  }

  createUsers() {

    if (this.userids === undefined || this.userids === '')
     return;

    const modalRef = this.modalService.open(NgxModalContentComponent);
    modalRef.componentInstance.confirmationBoxTitle = 'Confirmation';
    modalRef.componentInstance.confirmationMessage = `This will create users in the system. Do you want to continue?`;

    modalRef.result.then((userResponse) => {
      if (userResponse) {
        this.creatingUsers = true;
        this.http.post(this.endpoint + '/session/create_users', {
          'userIDs': this.userids,
        }, { observe: 'response' })
          .subscribe(
            data => {
                this.creatingUsers = false;
                this.results = '';
                for (const key in data.body['results']) {
                  if (data.body['results'].hasOwnProperty(key)) {
                    this.results += (key + ',' + data.body['results'][key] + '\n');
                  }
                }
                this.toastrService.show(null,
                  'User creation request processed',
                {
                  'status': NbToastStatus.SUCCESS,
                  destroyByClick: true,
                  duration: 10000,
                });
            },
            err => {
              this.creatingUsers = false;
              this.toastrService.show(null,
                'Fail to create users. Error: ' + err['error'],
              {
                'status': NbToastStatus.DANGER,
                destroyByClick: true,
                duration: 20000,
              });
            },
          );
      }
    });
  }

}
