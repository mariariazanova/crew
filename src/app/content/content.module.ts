import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ProfileComponent} from './components/profile/profile.component';
import {StarlinkStatsComponent} from './components/starlink-stats/starlink-stats.component';
import {StarlinkDetailsComponent} from './components/starlink-details/starlink-details.component';
import { provideHttpClient } from '@angular/common/http';
import {CrewComponent} from './components/crew/crew.component';
import {RouterLink} from '@angular/router';

@NgModule({
  declarations: [CrewComponent, ProfileComponent, StarlinkStatsComponent, StarlinkDetailsComponent],
  imports: [CommonModule, RouterLink, NgOptimizedImage],
  providers: [provideHttpClient()]
})
export class ContentModule {}
