import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {DataService} from '../content/services/data.service';
import {AsyncPipe, NgIf} from '@angular/common';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [
    RouterLink,
    AsyncPipe,
    NgIf
  ],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent {
  crewMemberFirstName = '';
  crewMemberLastName = '';

  constructor(public dataService: DataService) {
    this.crewMemberFirstName = this.dataService.crewMemberFirstName;
    this.crewMemberLastName = this.dataService.crewMemberLastName;
  }

  callHelp(): void {
    console.log('help');
  }
}
