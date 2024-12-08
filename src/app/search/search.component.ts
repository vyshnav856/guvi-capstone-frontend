import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
	constructor(private apiService: ApiService){}

	query: string = ""
	profiles: any[] = []
	profilesFiltered: any[] = []

	getSearch() {
		this.profiles = this.apiService.getProfiles()
		this.profilesFiltered = []
		for (let i of this.profiles) {
			if (i.username.includes(this.query) && i.username != localStorage.getItem("username")) {
				this.profilesFiltered.push(i)
			}
		}
	}

	followUser(username: string) {
		console.log("follwing " + username)
		this.apiService.followUser(username)
	}

	unfollowUser(username: string) {
		console.log("unfollwing " + username)
		this.apiService.unfollowUser(username)
	}
}
