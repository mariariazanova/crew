import {ChangeDetectionStrategy, Component} from '@angular/core';
import {BannerComponent} from "../banner/banner.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-layout',
  // standalone: true,
  //   imports: [
  //       BannerComponent,
  //       RouterOutlet
  //   ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent {

}
