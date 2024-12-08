import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {DataService} from '../../services/data.service';
import {CrewMember} from '../../../../interfaces/crew-member';
import {ID} from '../../../../constants/paths';
import {upcomingLaunchesData} from '../../../../mocks/upcoming-launches-data';

@UntilDestroy()
@Component({
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  loading = true;
  crewMemberFirstName: string | undefined = undefined;
  crewMemberLastName: string | undefined = undefined;
  upcomingLaunchesDefault = upcomingLaunchesData;

  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(public dataService: DataService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getData();
  }

  private getData(): void {
    const id = this.route.snapshot.paramMap.get(ID);

    id && this.dataService.getProfileData(id);

    this.crewMemberFirstName = this.dataService.crewMemberFirstName;
    this.crewMemberLastName = this.dataService.crewMemberLastName;
    this.loading = false;
  }

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
      };

      reader.readAsDataURL(file);
    }
  }

  removeImage() {
    const value = this.dataService.data$.getValue();

    if (value) {
      const updatedValue = { ...value, image: null };

      this.dataService.data$.next(<CrewMember>updatedValue);
    }
  }
}
