import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {DataService} from '../content/services/data.service';
import {AsyncPipe, NgIf} from '@angular/common';

@Component({
  selector: 'app-banner',
  // standalone: true,
  // imports: [
  //   RouterLink,
  //   AsyncPipe,
  //   NgIf
  // ],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class BannerComponent {
  crewMemberFirstName = '';
  crewMemberLastName = '';

  constructor(public dataService: DataService) {
    console.log('constructor BannerComponent');
    this.crewMemberFirstName = this.dataService.crewMemberFirstName;
    this.crewMemberLastName = this.dataService.crewMemberLastName;
    this.dataService.data$.subscribe(res => console.log(res));
  }

  callHelp(): void {
    console.log('help');
  }
}
