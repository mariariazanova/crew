import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {ContentModule} from './content/content.module';
import {NgModule} from '@angular/core';
import {BannerComponent} from './banner/banner.component';
import {LayoutComponent} from './layout/layout.component';

@NgModule({
  declarations: [AppComponent, LayoutComponent, BannerComponent],
  imports: [
    BrowserModule,
    ContentModule,
    AppRoutingModule,
    // LayoutComponent,
    // BannerComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
