import {Component, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import {ActivatedRoute, Data} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {CrewMember} from '../../../interfaces/crew-member';
import {catchError, of, tap} from 'rxjs';
import {StarLink, StarLinkListItem} from '../../../interfaces/star-link';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {STAR_LINK_URL} from '../../constants/urls';

@UntilDestroy()
@Component({
  selector: 'app-starlink-stats',
  templateUrl: './starlink-stats.component.html',
  styleUrl: './starlink-stats.component.scss'
})
export class StarlinkStatsComponent implements OnInit {
  loading = true;
  starLinks: StarLinkListItem[] = [];
  listDivisibleBy3: StarLinkListItem[] = [];
  listDivisibleBy5: StarLinkListItem[] = [];
  listDivisibleBy3And5: StarLinkListItem[] = [];
  listNotDivisibleBy3And5: StarLinkListItem[] = [];
  lists: StarLinkListItem[][] = [];
  crewMemberId: string | undefined = undefined;

  get areAllListsEmpty(): boolean {
    return this.lists.every(list => !list.length);
  }

  constructor(private route: ActivatedRoute, private http: HttpClient, private dataService: DataService) {}

  ngOnInit(): void {
    this.crewMemberId = this.dataService.data$.getValue()?.id;

    this.http.get<StarLink[]>(STAR_LINK_URL).
    pipe(catchError(() => of([])), untilDestroyed(this)).subscribe((data: StarLink[]) => {
      console.log(data);
      this.starLinks = data.map(starlink => ({
        id: starlink.id,
        creationDate: starlink.spaceTrack.CREATION_DATE,
        countryCode: starlink.spaceTrack.COUNTRY_CODE,
        height_km: Math.round(starlink.height_km),
        launch: starlink.launch,
      }));
      console.log(this.starLinks);


      this.listDivisibleBy3 = this.starLinks.filter(starLink => starLink.height_km % 3 === 0);
      this.listDivisibleBy5 = this.starLinks.filter(starLink => starLink.height_km % 5 === 0);
      this.listDivisibleBy3And5 = this.listDivisibleBy3.filter(starLink => this.listDivisibleBy5.includes(starLink));
      this.listNotDivisibleBy3And5 = this.starLinks.filter(starLink => (!this.listDivisibleBy3.includes(starLink) && !this.listDivisibleBy5.includes(starLink)));
      this.lists = [this.listDivisibleBy3, this.listDivisibleBy5, this.listDivisibleBy3And5, this.listNotDivisibleBy3And5];
      this.loading = false;
    });
  }
}
