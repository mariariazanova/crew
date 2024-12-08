import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {StarLink} from '../../../interfaces/star-link';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {Launch} from '../../../interfaces/launch';
import {filter, from, map, mergeMap, of, reduce, switchMap, tap} from 'rxjs';
import {Payload} from '../../../interfaces/payload';
import {Core, CoreDetail} from '../../../interfaces/core';
import {CORE_URL, LAUNCH_URL, PAYLOAD_URL} from '../../constants/urls';
import {DataService} from '../../services/data.service';

@UntilDestroy()
@Component({
  selector: 'app-starlink-details',
  templateUrl: './starlink-details.component.html',
  styleUrl: './starlink-details.component.scss'
})
export class StarlinkDetailsComponent implements OnInit {
  starLinkDetails: Launch | null = null;
  totalPayloadMass: number | null = null;
  coreMessage: string | null = null;
  loading = true;
  crewMemberId: string | undefined = undefined;

  get areNoDetails(): boolean {
    return !this.starLinkDetails && !this.totalPayloadMass && !this.coreMessage;
  }

  constructor(private route: ActivatedRoute, private http: HttpClient, private dataService: DataService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') || '5eb87d30ffd86e000604b378';
    this.crewMemberId = this.dataService.data$.getValue()?.id;

    this.http.get<Launch>(`${LAUNCH_URL}/${ id }`).pipe(
      tap(data => (this.starLinkDetails = data)),
      tap(data => console.log(this.starLinkDetails)),
      mergeMap(data =>
        from(data.payloads).pipe(
          mergeMap((payload) =>
            this.http.get<Payload>(`${PAYLOAD_URL}/${ payload }`).pipe(
              tap(data => console.log(data)),
              map(payload => payload.mass_kg)
            ),
          ),
          reduce((acc, currentValue: number) => acc + currentValue, 0)
        )
      ),
      tap((totalMass: number) => (this.totalPayloadMass = totalMass)),
      mergeMap(() => {
        const coreId = this.starLinkDetails?.cores[0]?.core || null;

        if (coreId) {
          return this.http.get<CoreDetail>(`${CORE_URL}/${coreId}`).pipe(
            tap(coreData => (this.coreMessage = coreData.last_update)),
          )
        } else {
          return of(null).pipe(
            tap(() => {
              console.warn('No core ID available.');
              this.coreMessage = null;
            })
          );
        }
      }),
      tap(() => (this.loading = false)),
      untilDestroyed(this),
    ).subscribe();
  }
}
