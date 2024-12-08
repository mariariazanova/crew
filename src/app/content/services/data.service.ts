import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, shareReplay, tap} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {CrewMember} from '../../interfaces/crew-member';
import {CREW_MEMBER_URl} from '../constants/urls';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class DataService {
  // get crewMember(): any {
  //   this.crewMemberSource.getValue();
  // }
  // crewMember: any;
  loading = true;
  crewMemberFirstName = '';
  crewMemberLastName = '';
  // data$: Observable<any>;

  data$ = new BehaviorSubject<CrewMember | null>(null);

  // private crewMemberSource = new BehaviorSubject<any>(null);
  // crewMember$ = this.crewMemberSource.asObservable();

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  init(id: string): void {
    console.log(id);
    this.getCrewMember(id);
    // this.getCrewMemberName();
  }

  // Fetch data from API and update shared data
  private getCrewMember(id: string): void {
    // const id = this.route.snapshot.paramMap.get('id');

    // this.http.get(`https://api.spacexdata.com/v4/crew/${id}`).pipe(untilDestroyed(this)).subscribe({
    //   next: (data) => {
    //     .next(data);
    //     // this.loading = false;
    //     this.getCrewMemberName();
    //   },
    //   error: (err) => {
    //     console.error(err);
    //     this.loading = false;
    //   },
    // });
    this.http.get<CrewMember>(`${CREW_MEMBER_URl}/${id}`).pipe(
      tap((data: CrewMember) => {
        console.log(data);
        this.data$.next(data);
        this.getCrewMemberName(data);
        console.log('set loader to false');
        this.loading = false;
      }),
      untilDestroyed(this),
      // shareReplay(1), // Ensures the request is cached and shared
    ).subscribe();


    // this.data$ = this.http.get(`https://api.spacexdata.com/v4/crew/${id}`).pipe(
    //   shareReplay(1), // Ensures the request is cached and shared
    //   tap(data => {
    //     this.getCrewMemberName(data);
    //   })
    // );


    // this.http.get(`https://api.spacexdata.com/v4/crew/${id}`).pipe(untilDestroyed(this)).subscribe({
    //   next: (data) => {
    //     console.log(data);
    //     this.crewMember = data;
    //     this.loading = false;
    //     this.getCrewMemberName();
    //   },
    //   error: (err) => {
    //     console.error(err);
    //     this.loading = false;
    //   },
    // });
  }

  private getCrewMemberName(crewMember: CrewMember): void {
    if (crewMember) {
      console.log('crewMember', crewMember);
      const fullName = crewMember.name;
      console.log('fullName', fullName);

      const nameParts = fullName.split(' ');

      // If the first part is a single letter (e.g., "K."), include the second part
      if (nameParts[0].length === 2 && nameParts[0].endsWith('.')) {
        this.crewMemberFirstName = `${nameParts[0]} ${nameParts[1]}`;
      } else {
        // Otherwise, return only the first part (first name)
        this.crewMemberFirstName = nameParts[0];
      }

      this.crewMemberLastName = nameParts[nameParts.length - 1];
    } else {
      this.crewMemberFirstName = '';
      this.crewMemberLastName = '';
    }
  }

  // private getCrewMemberName(): void {
  //   if (this.crewMember) {
  //     const fullName = this.crewMember?.name;
  //
  //     const nameParts = fullName.split(' ');
  //
  //     // If the first part is a single letter (e.g., "K."), include the second part
  //     if (nameParts[0].length === 2 && nameParts[0].endsWith('.')) {
  //       this.crewMemberFirstName = `${nameParts[0]} ${nameParts[1]}`;
  //     } else {
  //       // Otherwise, return only the first part (first name)
  //       this.crewMemberFirstName = nameParts[0];
  //     }
  //
  //     this.crewMemberLastName = nameParts[nameParts.length - 1];
  //   } else {
  //     this.crewMemberFirstName = '';
  //     this.crewMemberLastName = '';
  //   }
  // }

  // // Method to manually set data
  // setCrewMember(data: any): void {
  //   this.crewMemberSource.next(data);
  // }

  // // Method to retrieve the current value
  // getCrewMember(): any {
  //   return this.crewMemberSource.getValue();
  // }
}
