
import { BackgroundComponent } from '../background/background.component';
import { FooterComponent } from '../footer/footer.component';
import { MenubarComponent } from '../menubar/menubar.component';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HomeComponent } from "../../../features/components/home/home.component";

@Component({
  selector: 'app-layout',
  imports: [MenubarComponent, FooterComponent, BackgroundComponent, HomeComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent {

}
