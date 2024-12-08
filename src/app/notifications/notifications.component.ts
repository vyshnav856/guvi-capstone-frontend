import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent implements OnInit {
	constructor(private apiService: ApiService){}

	notifications: any[] = []
	ngOnInit(): void {
		this.notifications = this.apiService.getNotifications()
		console.log(this.notifications)
	}
}
