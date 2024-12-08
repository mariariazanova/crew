import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { catchError, of } from 'rxjs';
import { DataService } from '../../services/data.service';
import { StarLink, StarLinkListItem } from '../../../../interfaces/star-link';
import { STAR_LINK_URL } from '../../../../constants/urls';

@UntilDestroy()
@Component({
  templateUrl: './starlink-stats.component.html',
  styleUrl: './starlink-stats.component.scss',
})
export class StarlinkStatsComponent implements OnInit {
  loading = true;
  starLinks: StarLinkListItem[] = [];
  listDivisibleBy3: StarLinkListItem[] = [];
  listDivisibleBy5: StarLinkListItem[] = [];
  listDivisibleBy3And5: StarLinkListItem[] = [];
  listNotDivisibleBy3And5: StarLinkListItem[] = [];
  lists: StarLinkListItem[][] = [];
  crewMemberId: string | null = null;

  get areAllListsEmpty(): boolean {
    return this.lists.every((list) => !list.length);
  }

  constructor(
    private http: HttpClient,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.crewMemberId = this.dataService.data$.getValue()?.id || null;

    this.http
      .get<StarLink[]>(STAR_LINK_URL)
      .pipe(
        catchError(() => of([])),
        untilDestroyed(this)
      )
      .subscribe((data: StarLink[]) => {
        this.starLinks = data.map((starlink) => ({
          id: starlink.id,
          creationDate: starlink.spaceTrack.CREATION_DATE,
          countryCode: starlink.spaceTrack.COUNTRY_CODE,
          height_km: Math.round(starlink.height_km),
          launch: starlink.launch,
        }));

        this.listDivisibleBy3 = this.starLinks.filter(
          (starLink) => starLink.height_km % 3 === 0
        );
        this.listDivisibleBy5 = this.starLinks.filter(
          (starLink) => starLink.height_km % 5 === 0
        );
        this.listDivisibleBy3And5 = this.listDivisibleBy3.filter((starLink) =>
          this.listDivisibleBy5.includes(starLink)
        );
        this.listNotDivisibleBy3And5 = this.starLinks.filter(
          (starLink) =>
            !this.listDivisibleBy3.includes(starLink) &&
            !this.listDivisibleBy5.includes(starLink)
        );
        this.lists = [
          this.listDivisibleBy3,
          this.listDivisibleBy5,
          this.listDivisibleBy3And5,
          this.listNotDivisibleBy3And5,
        ];
        this.loading = false;
      });
  }
}
