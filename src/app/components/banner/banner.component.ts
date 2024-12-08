import { Component} from '@angular/core';
import {DataService} from '../../modules/content/services/data.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss',
})
export class BannerComponent {
  crewMemberFirstName: string | undefined = undefined;
  crewMemberLastName: string | undefined = undefined;

  constructor(public dataService: DataService) {
    this.crewMemberFirstName = this.dataService.crewMemberFirstName;
    this.crewMemberLastName = this.dataService.crewMemberLastName;
  }

  callHelp(): void {
    window.alert('help');
  }
}
