import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-crew',
  templateUrl: './crew.component.html',
  styleUrl: './crew.component.scss'
})
export class CrewComponent implements OnInit {
  crewMembers: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get(`https://api.spacexdata.com/v4/crew`).pipe(untilDestroyed(this)).subscribe(data => {
      console.log(data);
      this.crewMembers = data;
      console.log(this.crewMembers);
    //   {
    //   next: (data) => (this.crewMembers = data),
    //   error: (err) => console.error(err),
    }
    );
  }
}
