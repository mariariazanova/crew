import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {CrewMember} from '../../../interfaces/crew-member';
import {Router} from '@angular/router';
import {CREW_MEMBER_URl} from '../../constants/urls';
import {DataService} from '../../services/data.service';

@UntilDestroy()
@Component({
  selector: 'app-crew',
  templateUrl: './crew.component.html',
  styleUrl: './crew.component.scss'
})
export class CrewComponent implements OnInit {
  crewMembers: any;

  constructor(private http: HttpClient, private router: Router, private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.data$.next(null);
  //   this.http.get(`https://api.spacexdata.com/v4/crew`).pipe(untilDestroyed(this)).subscribe(data => {
  //     console.log(data);
  //     this.crewMembers = data;
  //     console.log(this.crewMembers);
  //   //   {
  //   //   next: (data) => (this.crewMembers = data),
  //   //   error: (err) => console.error(err),
  //   }
  //   );
  }

  navigateToProfile(): void {
    const predefinedIds = ['5ebf1a6e23a9a60006e03a7a',
      '5ebf1b7323a9a60006e03a7b',
      '5f7f1543bf32c864a529b23e',
      '5f7f158bbf32c864a529b23f',
      '5f7f15d5bf32c864a529b240'];
    const randomId = predefinedIds[Math.floor(Math.random() * predefinedIds.length)];

    console.log(randomId);

    this.router.navigate(['/profile', randomId]);
  }
}
