import { Component, OnInit } from '@angular/core';
import { CreatepostComponent } from '../createpost/createpost.component';
import { CommonModule, DatePipe } from '@angular/common';
import { ApiService } from '../api.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-feed',
	standalone: true,
	imports: [CreatepostComponent, CommonModule, RouterLink, FormsModule],
	templateUrl: './feed.component.html',
	styleUrl: './feed.component.css',
	providers: [DatePipe]
})

export class FeedComponent implements OnInit {
	constructor(private apiService: ApiService, private datePipe: DatePipe, private sanitizer: DomSanitizer){}
	posts: any = []
	createFormVisible = false
	showComments = false
	showReport = false
	commentValue: string = "";
	reportValue: string = ""
	reportType: string = ""
	openCreateForm() {
		this.createFormVisible = true
	}

	closeCreateForm() {
		this.createFormVisible = false
	}

	ngOnInit(): void {
		this.posts = this.apiService.getFeed()
		console.log(this.posts)
	}

	likePost(id: string) {
		this.apiService.likePost(id)

	}

	unlikePost(id: string) {
		this.apiService.unlikePost(id)
		
	}

	submitComment(id: string) {
		console.log(this.commentValue)
		console.log(id)
		this.apiService.submitComment(id, this.commentValue)
		this.commentValue = ""
	}

	comments: any = []
	getComments(id: string) {
		const comments = this.apiService.getComments(id)
		this.comments = comments
	}

	sendReport(id: string) {
		this.apiService.sendReport(id, this.reportValue, this.reportType)
		this.reportValue = ""
		this.reportType = ""
	}
}
