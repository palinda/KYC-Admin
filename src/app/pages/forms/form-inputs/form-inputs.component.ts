import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxModalContentComponent } from '../../extra-components/modal-content';
import { NbToastrService } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';

@Component({
  selector: 'ngx-form-inputs',
  styleUrls: ['./form-inputs.component.scss'],
  templateUrl: './form-inputs.component.html',
})
export class FormInputsComponent {

  endpoint: string = '';
  client_endpoint: string = '';
  api_token: string;
  domains: string;
  generatingToken = false;
  updatingEndpoints = false;
  updatingDomains = false;

  constructor(private http: HttpClient, private modalService: NgbModal, private toastrService: NbToastrService) {
  }

  ngOnInit() {
    return this.http.post(this.endpoint + '/monitoring/get_user_info', {}, { observe: 'response' })
      .subscribe(
        data => {
            this.api_token = data.body['token'];
            this.client_endpoint = data.body['endpoint'];
            this.domains = data.body['domains'];
        },
        err => {
          this.toastrService.show(null,
            'Fail to receive user informations. Error: ' + err['error'],
          {
            'status': NbToastStatus.DANGER,
            destroyByClick: true,
            duration: 20000,
          });
        },
      );
  }

  updateEndpoint() {
    const client_ep = this.client_endpoint;

    this.updatingEndpoints = true;
    this.http.post(this.endpoint + '/monitoring/configure_endpoint', {'endpoint': client_ep}, { observe: 'response' })
      .subscribe(
        data => {
            this.updatingEndpoints = false;
            this.client_endpoint = data.body['endpoint'];
            this.toastrService.show(null,
              'Successfully updated endpoints',
            {
              'status': NbToastStatus.SUCCESS,
              destroyByClick: true,
              duration: 10000,
            });
        },
        err => {
          this.updatingEndpoints = false;
          this.toastrService.show(null,
            'Fail to update enpoints. Error: ' + err['error'],
          {
            'status': NbToastStatus.DANGER,
            destroyByClick: true,
            duration: 20000,
          });
        },
      );
  }

  updateDomains() {
    const domains = this.domains;
    this.updatingDomains = true;
    this.http.post(this.endpoint + '/monitoring/register_domains', {'domains': domains}, { observe: 'response' })
      .subscribe(
        data => {
            this.updatingDomains = false;
            this.domains = data.body['domains'];
            this.toastrService.show(null,
              'Successfully updated domains',
            {
              'status': NbToastStatus.SUCCESS,
              destroyByClick: true,
              duration: 10000,
            });
        },
        err => {
          this.updatingDomains = false;
          this.toastrService.show(null,
            'Fail to update domains. Error: ' + err['error'],
          {
            'status': NbToastStatus.DANGER,
            destroyByClick: true,
            duration: 20000,
          });
        },
      );
  }

  generate() {

    const modalRef = this.modalService.open(NgxModalContentComponent);
    modalRef.componentInstance.confirmationBoxTitle = 'Confirmation';
    modalRef.componentInstance.confirmationMessage = `This will override your existing API token. 
    Do you want to continue?`;

    modalRef.result.then((userResponse) => {
      if (userResponse) {
        this.generatingToken = true;
        this.http.post(this.endpoint + '/monitoring/generate_api_token', {}, { observe: 'response' })
          .subscribe(
            data => {
                this.generatingToken = false;
                this.api_token = data.body['token'];
                this.toastrService.show(null,
                  'Successfully regenerated API token',
                {
                  'status': NbToastStatus.SUCCESS,
                  destroyByClick: true,
                  duration: 10000,
                });
            },
            err => {
              this.generatingToken = false;
              this.toastrService.show(null,
                'Fail to generate API token. Error: ' + err['error'],
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

  copyText() {
    const val = this.api_token;
    const selBox = document.createElement('textarea');
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
