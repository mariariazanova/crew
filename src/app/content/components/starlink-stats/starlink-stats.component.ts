import {Component, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {CrewMember} from '../../../interfaces/crew-member';
import {tap} from 'rxjs';
import {StarLink, StarLinkListItem} from '../../../interfaces/star-link';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-starlink-stats',
  templateUrl: './starlink-stats.component.html',
  styleUrl: './starlink-stats.component.scss'
})
export class StarlinkStatsComponent implements OnInit {
  starLinks: StarLinkListItem[] = [];
  list1: StarLinkListItem[] = [];
  list2: StarLinkListItem[] = [];
  list3: StarLinkListItem[] = [];
  list4: StarLinkListItem[] = [];

  lists: StarLinkListItem[][] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<StarLink[]>(`https://api.spacexdata.com/v4/starlink`).pipe(untilDestroyed(this)).subscribe((data: StarLink[]) => {
      console.log(data);
      this.starLinks = data.map(starlink => ({
        id: starlink.id,
        creationDate: starlink.spaceTrack.CREATION_DATE,
        countryCode: starlink.spaceTrack.COUNTRY_CODE,
        height_km: Math.round(starlink.height_km),
      }));

      this.list1 = this.starLinks.filter(starLink => starLink.height_km % 3 === 0);
      this.list2 = this.starLinks.filter(starLink => starLink.height_km % 5 === 0);
      this.list3 = this.list1.filter(starLink => this.list2.includes(starLink));
      this.list4 = this.starLinks.filter(starLink => (!this.list1.includes(starLink) && !this.list2.includes(starLink)));
      this.lists = [this.list1, this.list2, this.list3, this.list4];
    });
  }
}
