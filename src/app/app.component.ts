import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NavBarComponent} from './components/nav-bar/nav-bar.component';
import {AlertDisplayComponent} from "./components/crud-alert/alert-display.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, AlertDisplayComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'SportsPeak';
}
