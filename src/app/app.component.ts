import {ChangeDetectionStrategy, Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HttpClientModule, provideHttpClient} from '@angular/common/http';
import { BannerComponent } from './components/banner/banner.component';
import { ContentModule } from './modules/content/content.module';

@Component({
  selector: 'app-root',
  // standalone: true,
  // imports: [RouterOutlet, ContentModule, BannerComponent],
  // providers: [provideHttpClient()],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'start-app';
  constructor() {
    console.log('Crew App');
  }
}
