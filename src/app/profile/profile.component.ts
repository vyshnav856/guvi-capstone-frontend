import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [DatePipe, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  providers: [DatePipe]
})
export class ProfileComponent implements OnInit {
	constructor(private apiService: ApiService){}

	username = localStorage.getItem("username")
	id = localStorage.getItem("userId")
	picture = localStorage.getItem("picture")
	posts: any[] = []

	getPosts() {
		this.posts = this.apiService.getProfilePosts();
		console.log(this.posts)
	}

	ngOnInit(): void {
		this.getPosts()
	}
}
