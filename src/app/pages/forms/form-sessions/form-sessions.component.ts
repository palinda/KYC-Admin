import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NbToastrService } from '@nebular/theme';
import { NgxModalContentComponent } from '../../extra-components/modal-content';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';

@Component({
  selector: 'ngx-form-sessions',
  styleUrls: ['./form-sessions.component.scss'],
  templateUrl: './form-sessions.component.html',
})
export class FormSessionsComponent {

  creatingSessions = false;
  endpoint = '';
  userids = undefined;
  results = '';

  constructor(private http: HttpClient, private modalService: NgbModal, private toastrService: NbToastrService) {
  }

  createSessions() {

    if (this.userids === undefined || this.userids === '')
     return;

    const modalRef = this.modalService.open(NgxModalContentComponent);
    modalRef.componentInstance.confirmationBoxTitle = 'Confirmation';
    modalRef.componentInstance.confirmationMessage = `This will create sessions for users. Do you want to continue?`;

    modalRef.result.then((userResponse) => {
      if (userResponse) {
        this.creatingSessions = true;
        this.http.post(this.endpoint + '/session/create_sessions', {
          'userIDs': this.userids,
        }, { observe: 'response' })
          .subscribe(
            data => {
                this.creatingSessions = false;
                this.results = '';
                for (const key in data.body['results']) {
                  if (data.body['results'].hasOwnProperty(key)) {
                    this.results += (key + ',' + data.body['results'][key] + '\n');
                  }
                }
                this.toastrService.show(null,
                  'User session creation request processed',
                {
                  'status': NbToastStatus.SUCCESS,
                  destroyByClick: true,
                  duration: 10000,
                });
            },
            err => {
              this.creatingSessions = false;
              this.toastrService.show(null,
                'Fail to create sessions. Error: ' + err['error'],
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
