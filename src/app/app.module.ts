import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {ContentModule} from './content/content.module';
import {NgModule} from '@angular/core';
import {BannerComponent} from './banner/banner.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ContentModule,
    BannerComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
