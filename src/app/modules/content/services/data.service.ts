import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CrewMember } from '../../../interfaces/crew-member';
import { CREW_MEMBER_URl } from '../../../constants/urls';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class DataService {
  loading = true;
  crewMemberFirstName: string | null = null;
  crewMemberLastName: string | null = null;
  data$ = new BehaviorSubject<CrewMember | null>(null);

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  getProfileData(id: string): void {
    this.http
      .get<CrewMember | null>(`${CREW_MEMBER_URl}/${id}`)
      .pipe(
        tap((data: CrewMember | null) => {
          this.data$.next(data);
          data && this.getCrewMemberName(data);
          this.loading = false;
        }),
        catchError(() => {
          this.data$.next(null);
          this.loading = false;

          return of(null);
        }),
        untilDestroyed(this)
      )
      .subscribe();
  }

  private getCrewMemberName(crewMember: CrewMember): void {
    const fullName = crewMember.name;
    const nameParts = fullName.split(' ');

    if (nameParts[0].length > 1) {
      this.crewMemberFirstName = nameParts.slice(0, -1).join(' ');
    } else {
      this.crewMemberFirstName = nameParts[0];
    }

    this.crewMemberLastName = nameParts[nameParts.length - 1];
  }
}
