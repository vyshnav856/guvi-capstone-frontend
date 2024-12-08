import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { LandingComponent } from "./landing/landing.component";
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LandingComponent, RouterLink, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
	title = 'guvi-capstone-frontend';
}
