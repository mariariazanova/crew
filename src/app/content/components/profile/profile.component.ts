import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {DataService} from '../../services/data.service';
import {CrewMember} from '../../../interfaces/crew-member';

@UntilDestroy()
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  // crewMember: any;
  loading = true;
  crewMemberFirstName = '';
  crewMemberLastName = '';
  upcomingLaunchesDefault = {
    name: 'Apollo 24',
    step: 'Health check - pending',
    progress: 60,
  };

  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(public dataService: DataService, private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    console.log(this.route);

    this.dataService.data$.subscribe(res => console.log(res));
    this.getData();



    // this.http.get(`https://api.spacexdata.com/v4/crew/${id}`).pipe(untilDestroyed(this)).subscribe({
    //   next: (data) => {
    //     this.crewMember = data;
    //     this.loading = false;
    //     this.getCrewMemberName();
    //   },
    //   error: (err) => {
    //     console.error(err);
    //     this.loading = false;
    //   },
    // });

    // this.http.get('https://api.spacexdata.com/v4/launches/upcoming').pipe(untilDestroyed(this)).subscribe({
    //   next: (data) => {
    //     console.log(data);
    //
    //     // console.log((<Array<any>>data).filter(d => d.id === '5eb87d46ffd86e000604b388'));
    //     // this.crewMember = data;
    //     this.loading = false;
    //     // this.getCrewMemberName();
    //   },
    //   error: (err) => {
    //     console.error(err);
    //     this.loading = false;
    //   },
    // });

    // this.http.get(' https://lldev.thespacedevs.com/2.3.0/astronauts').pipe(untilDestroyed(this)).subscribe(data => {
    //   console.log(data);
    // });
    //
    // this.http.get(' https://lldev.thespacedevs.com/2.3.0/launches/upcoming').pipe(untilDestroyed(this)).subscribe(data => {
    //   console.log(data);
    // })
  }

  private getData(): void {
    const id = this.route.snapshot.paramMap.get('id') || '5ebf1a6e23a9a60006e03a7a';

    this.dataService.init(id);
    console.log(this.dataService.data$.getValue());
    // this.dataService.data$.subscribe(res => console.log(res));
    // console.log(this.dataService.crewMember);
    // this.crewMember = this.dataService.crewMember;
    console.log(this.dataService.crewMemberFirstName);

    this.crewMemberFirstName = this.dataService.crewMemberFirstName;
    this.crewMemberLastName = this.dataService.crewMemberLastName;
    console.log(1, this.dataService.data$.getValue());
    this.loading = false;
    // !this.dataService.data$.getValue() && (this.loading = false);
  }

  // getCrewMemberName(): void {
  //   if(this.crewMember){
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

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const value = <CrewMember>this.dataService.data$.getValue();
        const updatedValue = { ...value, image: e.target.result };

        this.dataService.data$.next(updatedValue);
        // this.crewMember.image = e.target.result;
      };

      reader.readAsDataURL(file);
    }
  }

  // Remove the image by setting crewMember.image to null or an empty string
  removeImage() {
    const value = this.dataService.data$.getValue();

    if (value) {
      const updatedValue = { ...value, image: null };

      this.dataService.data$.next(<CrewMember>updatedValue);
      // this.crewMember.image = null;
    };
  }
}
