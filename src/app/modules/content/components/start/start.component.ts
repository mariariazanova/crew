import {Component, OnInit} from '@angular/core';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {Router} from '@angular/router';
import {DataService} from '../../services/data.service';
import {predefinedCrewMemberIds} from '../../../../mocks/crew-member-ids';

@Component({
  templateUrl: './start.component.html',
  styleUrl: './start.component.scss'
})
export class StartComponent implements OnInit {
  constructor(private router: Router, private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.data$.next(null);
  }

  navigateToProfile(): void {
    const randomId = predefinedCrewMemberIds[Math.floor(Math.random() * predefinedCrewMemberIds.length)];

    this.router.navigate(['/profile', randomId]);
  }
}
