import { Component } from '@angular/core';
import { fetchStatus } from '../api';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
})
export class StatusComponent {
  status = null;

  constructor() {
    fetchStatus().then(({ status }) => (this.status = status));
  }
}
