import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css',
  providers: [DatePipe]
})
export class MessagesComponent implements OnInit {
	constructor(private apiService: ApiService, private datePipe: DatePipe){}

	username: string = ""
	message: string = ""

	sendMessage() {
		this.apiService.sendMessage(this.username, this.message)
		this.username = ""
		this.message = ""
	}

	messages: any[] = []
	getMessages() {
		this.messages = this.apiService.getMessages()
		console.log(this.messages)
	}

	ngOnInit(): void {
		this.getMessages()
	}
}
