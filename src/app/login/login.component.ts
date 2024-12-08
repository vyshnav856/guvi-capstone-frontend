import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
	myForm: FormGroup

	constructor(private authService: AuthService) {
		this.myForm = new FormGroup({
			username: new FormControl("", [Validators.required]),
			password: new FormControl("", [Validators.required, Validators.minLength(8)])
		})
	}
	
	onFormSubmit() {
		if (this.myForm.valid) {
			this.authService.login(this.myForm.value.username, this.myForm.value.password)
		}
	}
}
