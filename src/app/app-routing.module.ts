import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProfileComponent} from './content/components/profile/profile.component';
import {StarlinkStatsComponent} from './content/components/starlink-stats/starlink-stats.component';
import {StarlinkDetailsComponent} from './content/components/starlink-details/starlink-details.component';
import {CrewComponent} from './content/components/crew/crew.component';

const predefinedIds = ['5ebf1a6e23a9a60006e03a7a',
  '5ebf1b7323a9a60006e03a7b',
  '5f7f1543bf32c864a529b23e',
  '5f7f158bbf32c864a529b23f',
  '5f7f15d5bf32c864a529b240'];
const randomId = predefinedIds[Math.floor(Math.random() * predefinedIds.length)];

const routes: Routes = [
  { path: '', redirectTo: `/profile/${randomId}`, pathMatch: 'full' }, // Redirect root to /profile/:randomId
  { path: 'profile/:id', component: ProfileComponent }, // Define the profile route
  { path: '**', redirectTo: `/profile/${randomId}` },
  // { path: '', component: CrewComponent },
  // { path: 'profile/:id', component: ProfileComponent },
  // { path: 'starlink-stats', component: StarlinkStatsComponent },
  // { path: 'starlink/:id', component: StarlinkDetailsComponent },

  // { path: '', redirectTo: '/starlink-stats', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
