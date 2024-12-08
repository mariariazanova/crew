import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { StarlinkStatsComponent } from './components/starlink-stats/starlink-stats.component';
import { StarlinkDetailsComponent } from './components/starlink-details/starlink-details.component';
import { StartComponent } from './components/start/start.component';
import { DateFormatPipe } from './pipes/date-format.pipe';

@NgModule({
  declarations: [
    StartComponent,
    ProfileComponent,
    StarlinkStatsComponent,
    StarlinkDetailsComponent,
    DateFormatPipe,
  ],
  imports: [CommonModule, RouterLink, NgOptimizedImage],
  providers: [provideHttpClient()],
})
export class ContentModule {}
