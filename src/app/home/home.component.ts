import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
	username: string | null = null;
	isAdmin = false

	ngOnInit(): void {
		this.username = localStorage.getItem("username")
		this.isAdmin = localStorage.getItem("role") == "admin"
	}
	
	constructor(private authService: AuthService){}

	logout() {
		this.authService.logout()
	}
}
