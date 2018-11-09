import { Component } from '@angular/core';

import { SmartTableService } from '../../../@core/data/smart-table.service';
import { HttpClient } from '@angular/common/http';
import { CustomServerDataSource } from '../../../@core/data/server-data.service';
import { map } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../../ui-features/modals/modal/modal.component';

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
      edit: false,
      position: 'right',
      custom: [
        { name: 'passport', title: `<div class="table-action-text">View Passport</div>` },
        { name: 'face', title: `<div class="table-action-text">View Face</div>` },
        { name: 'info', title: `<div class="table-action-text">View Info</div>` }
      ],
    
    }
  };

  source: CustomServerDataSource;
  endpoint: string = '';

  constructor(private http: HttpClient, private modalService: NgbModal) {
    this.source = new CustomServerDataSource(http, this.endpoint + '/monitoring/requests');
    // const data = this.service.getData();
    // this.source.load(data);
  }

  showLargeModal(title, url) {
    const activeModal = this.modalService.open(ModalComponent, { size: 'lg', container: 'nb-layout' });

    activeModal.componentInstance.modalHeader = title ;
    activeModal.componentInstance.modalContent = `<img src="${url}" class="w-100"/>`
  }

  onCustom(event) {
    if (event.action == 'face' || event.action == 'passport') {
      return this.http.post(this.endpoint + '/monitoring/viewimage', {'ref': event.data.name, 'type': event.action}, { observe: 'response' })
      .subscribe(
        data => {
            this.showLargeModal('View ' + event.action, data.body['url']);
        },
        err => {
          console.log("Error occured.")
        }
      )
    }
  }
}
