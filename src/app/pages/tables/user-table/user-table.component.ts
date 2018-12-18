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
  selector: 'ngx-user-table',
  templateUrl: './user-table.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
    .gray {
      color: gray
    }
  `],
})
export class UserTableComponent {

  statusList = [
              {value: 'Unverified', title: 'Unverified'},
              { value: 'Verified', title: 'Verified'},
              { value: 'Deleted', title: 'Deleted'},
              { value: 'Vendor Rejected', title: 'Vendor Rejected'},
  ];
  settings = {
    edit: {
      confirmSave: true,
    },
    columns: {
      userID: {
        title: 'User ID',
        type: 'string',
        filter: true,
        width: '50%',
        editable: false,
      },
      status: {
        title: 'Status',
        type: 'string',
        width: '50%',
        editable: true,
        filter: {
          type: 'list',
          config: {
            selectText: 'Select...',
            list: this.statusList,
          },
        },
        editor: {
          type: 'list',
          config: {
            list: this.statusList,
          },
        },
      },
    },
    editable: false,
    actions: {
      edit: true,
      delete: false,
      add: false,
      position: 'right',
    },
  };

  source: CustomServerDataSource;
  endpoint: string = '';

  constructor(private http: HttpClient, private modalService: NgbModal, private toastrService: NbToastrService) {
    this.source = new CustomServerDataSource(http, this.endpoint + '/session/view_sessions');
    // const data = this.service.getData();
    // this.source.load(data);
  }



  onSaveConfirm(event) {
    const modalRef = this.modalService.open(NgxModalContentComponent);
    modalRef.componentInstance.confirmationBoxTitle = 'Confirmation';
    modalRef.componentInstance.confirmationMessage = `This will change user ${event.newData['userID']} status. 
    Do you want to continue?`;

    modalRef.result.then((userResponse) => {
      if (userResponse) {
        this.http.post(this.endpoint + '/session/update_user_status', {
          'userID': event.newData['userID'],
          'status': event.newData['status'],
        }, { observe: 'response' })
          .subscribe(
            data => {
                event.confirm.resolve(event.newData);
                this.toastrService.show(null,
                  'Successfully updated user',
                {
                  'status': NbToastStatus.SUCCESS,
                  destroyByClick: true,
                  duration: 10000,
                });
            },
            err => {
              event.confirm.reject();
              this.toastrService.show(null,
                'Fail to update user. Error: ' + err['error']['error'],
              {
                'status': NbToastStatus.DANGER,
                destroyByClick: true,
                duration: 20000,
              });
            },
          );
      } else {
        event.confirm.reject();
      }
    });
  }
}
