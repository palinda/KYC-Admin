import { Component, Input, IterableDiffers, DoCheck } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-modal',
  template: `
    <div class="modal-header">
      <span>{{ modalHeader }}</span>
      <button class="close" aria-label="Close" (click)="closeModal()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>

    <div>
      <div class="inline p-4 h5">Versions</div>
      <div class="inline tablet-btn" *ngFor="let version of versions"
      [ngClass]="current==version.name ? 'active-table-btn' : ''"
      (click)="currentImage = version.url;current=version.name;">
        {{version.name == '' ? 'Active' : version.name}}
      </div>
      <div class="img-container">
        <ngx-image-viewer  [src]="[currentImage]" [config]="{btnIcons:{rotateClockwise: 'fa fa-redo'}}">
        </ngx-image-viewer>
      </div>
    </div>

    <div class="modal-footer">
      <button class="btn btn-md btn-primary" (click)="closeModal()">Close</button>
    </div>
  `,
  styles: [
    `
      .img-container {
        padding: 20px 10px;
      }

      .spinner {
        top: 45% !important;
        left: 45%  !important;
        width: 50px  !important;
        height: 50px  !important;
        background: transparent  !important;
      }
    `,
  ],
})
export class ModalVersionComponent implements DoCheck {

  modalHeader: string;
  @Input() public versions = [];
  currentImage: string = undefined;
  iterableDiffer;
  current;

  ngDoCheck() {
    const changes = this.iterableDiffer.diff(this.versions);
    if (changes) {
      const img = this.versions.find(function(element) {
        return element.name === '';
      });
      if (img) {
        this.currentImage = img.url;
        this.current = '';
      }
    }
  }

  constructor(private activeModal: NgbActiveModal, private _iterableDiffers: IterableDiffers) {
    this.iterableDiffer = _iterableDiffers.find([]).create(null);
  }

  closeModal() {
    this.activeModal.close();
  }
}
