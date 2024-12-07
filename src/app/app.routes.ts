import { Routes } from '@angular/router';
import {ProfileComponent} from './content/components/profile/profile.component';
import {StarlinkStatsComponent} from './content/components/starlink-stats/starlink-stats.component';
import {StarlinkDetailsComponent} from './content/components/starlink-details/starlink-details.component';

export const routes: Routes = [
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'starlink-stats', component: StarlinkStatsComponent },
  { path: 'starlink/:id', component: StarlinkDetailsComponent },
  // { path: '', redirectTo: '/starlink-stats', pathMatch: 'full' }
];
