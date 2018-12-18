import { Component } from '@angular/core';

import { SmartTableService } from '../../../@core/data/smart-table.service';
import { HttpClient } from '@angular/common/http';
import { CustomServerDataSource } from '../../../@core/data/server-data.service';
import { map } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalVersionComponent } from '../../ui-features/modals/modal/modal-version.component';
import { ModalComponent } from '../../ui-features/modals/modal/modal.component';
import { NbToastrService } from '@nebular/theme';
import { NgxModalContentComponent } from '../../extra-components/modal-content';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
    
    .gray {
      color: gray
    }
  `],
})
export class SmartTableComponent {

  settings = {
    columns: {
      name: {
        title: 'Reference ID',
        type: 'string',
        filter: true,
        width: '50%'
      }
    },
    editable: false,
    delete: {
      deleteButtonContent: '',
      confirmDelete: true
    },
    add:null,
    actions: {
      add: false,
      edit: false,
      position: 'right',
      custom: [
        { name: 'passport', title: `<div class="table-action-text">View Passport</div>` },
        { name: 'face', title: `<div class="table-action-text">View Face</div>` },
        { name: 'details', title: `<div class="table-action-text">View Info</div>`},
        { name: 'manual_approve', title: `<div class="table-action-text">Force Approve</div>`},
      ],

    },
  };

  source: CustomServerDataSource;
  endpoint: string = '';

  constructor(private http: HttpClient, private modalService: NgbModal, private toastrService: NbToastrService) {
    this.source = new CustomServerDataSource(http, this.endpoint + '/monitoring/requests');
    // const data = this.service.getData();
    // this.source.load(data);
  }

  showLargeModal(title, url, versions) {
    const activeModal = this.modalService.open(ModalVersionComponent, { size: 'lg', container: 'nb-layout' });

    activeModal.componentInstance.modalHeader = title ;
    activeModal.componentInstance.versions.splice(0, activeModal.componentInstance.versions.length);
    activeModal.componentInstance.versions.push.apply(activeModal.componentInstance.versions, versions);
  }

  showJsonModal(title, data) {
    const activeModal = this.modalService.open(ModalComponent, { size: 'lg', container: 'nb-layout' });

    activeModal.componentInstance.modalHeader = title ;
    let htmlContent = `<table class="p-3"><tbody>`;
    for(let key in data) {
      htmlContent += ('<tr><td class="w-50 p-2">' + key + '</td><td class="w-50 p-2">' + data[key] + '</td></tr>'); 
    }
    htmlContent += '</tbody></table>';
    activeModal.componentInstance.modalContent = htmlContent;
  }

  onCustom(event) {
    if (event.action == 'face' || event.action == 'passport') {
      return this.http.post(this.endpoint + '/monitoring/viewimage', 
      {'ref': event.data.name, 'type': event.action}, { observe: 'response' })
      .subscribe(
        data => {
            this.showLargeModal('View ' + event.action + ' ' + event.data.name,
            data.body['url'], data.body['versions']);
        },
        err => {
          alert('Error occured.');
        },
      );
    } else if (event.action === 'details') {
      return this.http.post(this.endpoint + '/monitoring/get_details', {'ref': event.data.name}, { observe: 'response' })
      .subscribe(
        data => {
            this.showJsonModal('View ' + event.action + ' ' + event.data.name, data.body['data']);
        },
        err => {
          console.log("Error occured.")
        }
      );
    } else if (event.action === 'manual_approve') {
      const modalRef = this.modalService.open(NgxModalContentComponent);
      modalRef.componentInstance.confirmationBoxTitle = 'Confirmation';
      modalRef.componentInstance.confirmationMessage = `This will approve user ${event.data.name} by forcefully. 
      Do you want to continue?`;

      modalRef.result.then((userResponse) => {
        if (userResponse) {
          this.http.post(this.endpoint + '/session/manual_approve', {
            'userID': event.data.name,
          }, { observe: 'response' })
            .subscribe(
              data => {
                  this.toastrService.show(null,
                    'User approved successfully',
                  {
                    'status': NbToastStatus.SUCCESS,
                    destroyByClick: true,
                    duration: 10000,
                  });
              },
              err => {
                this.toastrService.show(null,
                  'Fail to approve user. Error: ' + err['error']['error'],
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
}
