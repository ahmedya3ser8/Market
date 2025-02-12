import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  imports: [],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent {
  @Input() data!: string[];
  @Input() title: string = '';
  @Output() itemEvent: EventEmitter<any> = new EventEmitter();
  detectChanges(event: any) {
    this.itemEvent.emit(event);
  }
}
