import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
	myForm: FormGroup

	constructor(private authService: AuthService) {
		this.myForm = new FormGroup({
			username: new FormControl("", [Validators.required]),
			password: new FormControl("", [Validators.required, Validators.minLength(8)]),
			email: new FormControl("", [Validators.required, Validators.email]),
			role: new FormControl("user"),
			picture: new FormControl("", [Validators.required]),
			bio: new FormControl("", [Validators.required])  
		})
	}

	onFormSubmit() {
		if (this.myForm.valid) {
			const username: string = this.myForm.value.username;
			const password: string = this.myForm.value.password;
			const email: string = this.myForm.value.email;
			const role: string = this.myForm.value.role;
			const picture: string = this.myForm.value.picture;
			const bio: string = this.myForm.value.bio;
			this.authService.signup(username, password, email, role, bio, picture)
		}
	}
}
