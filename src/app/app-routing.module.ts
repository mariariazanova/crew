import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './modules/content/components/profile/profile.component';
import { StarlinkStatsComponent } from './modules/content/components/starlink-stats/starlink-stats.component';
import { StarlinkDetailsComponent } from './modules/content/components/starlink-details/starlink-details.component';
import { StartComponent } from './modules/content/components/start/start.component';
import { ID, PROFILE, STARLINK_STATS } from './constants/paths';

const routes: Routes = [
  { path: '', component: StartComponent },
  { path: `${PROFILE}/:${ID}`, component: ProfileComponent },
  { path: STARLINK_STATS, component: StarlinkStatsComponent },
  { path: `${STARLINK_STATS}/:${ID}`, component: StarlinkDetailsComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
