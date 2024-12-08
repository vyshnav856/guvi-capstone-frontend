import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
	constructor(private router: Router) {}

	navigateToLogin() {
		this.router.navigate(["/login"])
	}

	navigateToSignup() {
		this.router.navigate(["/signup"])
	}
}
