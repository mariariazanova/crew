import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ContentModule } from './modules/content/content.module';
import { BannerComponent } from './components/banner/banner.component';

@NgModule({
  declarations: [AppComponent, BannerComponent],
  imports: [BrowserModule, ContentModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
