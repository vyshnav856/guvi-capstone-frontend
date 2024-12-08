import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admindashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admindashboard.component.html',
  styleUrl: './admindashboard.component.css'
})
export class AdmindashboardComponent implements OnInit {
	constructor(private apiService: ApiService){}

	advertLink: string = ""
	advertContent: string = ""
	advertRedirect: string = ""

	reports: any[] = []
	getReports() {
		this.reports = this.apiService.getReports()
		console.log(this.reports)
	}

	ngOnInit(): void {
		this.getReports()
	}

	createAdvert() {
		this.apiService.createAdvert(this.advertLink, this.advertContent, this.advertRedirect)
		this.advertLink = ""
		this.advertContent = ""
		this.advertRedirect = ""
	}
}
