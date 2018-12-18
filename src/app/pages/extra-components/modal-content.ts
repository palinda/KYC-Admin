import {Component, Input} from '@angular/core';

import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-modal-content-component',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">{{confirmationBoxTitle}}</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>{{confirmationMessage}}</p>
    </div>
    <div class="modal-footer">
        <button nbButton outline status="warning" (click)="activeModal.close(true)">Yes</button>
        <button nbButton outline status="success" (click)="activeModal.close(false)">No</button>
    </div>
  `,
})
export class NgxModalContentComponent {
  @Input() confirmationBoxTitle;
  @Input() confirmationMessage;

  constructor(public activeModal: NgbActiveModal) {}
}
