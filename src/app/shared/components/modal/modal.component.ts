import { DOCUMENT } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() modalID = '';
  @Output() close = new EventEmitter<void>();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    public modal: ModalService,
    public el: ElementRef
  ) {}

  ngOnInit(): void {
    this.document.body.appendChild(this.el.nativeElement);
  }

  closeModal() {
    this.modal.toggleModal(this.modalID);
    this.close.emit();
  }

  ngOnDestroy(): void {
    document.body.removeChild(this.el.nativeElement);
  }
}
