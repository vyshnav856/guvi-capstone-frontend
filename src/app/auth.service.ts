import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
	private loginUrl = "http://localhost:8091/auth/login"
	private signupUrl = "http://localhost:8091/auth/signup"

	constructor(private httpClient: HttpClient, private router: Router) { }

	login(username: string, password: string) {
		this.httpClient.post<any>(this.loginUrl, {username, password}).subscribe(response => {
			console.log(response)
			if (response.success) {
				localStorage.setItem("token", response.token)
				localStorage.setItem("username", response.username)
				localStorage.setItem("userId", response.userId)
				localStorage.setItem("role", response.role)
				localStorage.setItem("picture", response.picture)
				this.router.navigate(["/home"])
			}

			else {
				alert(response.message)
			}
		})
	}

	signup(username: string, password: string, email: string, role: string, bio: string, picture: string) {
		this.httpClient.post<any>(this.signupUrl, {username, password, email, role, bio, picture}).subscribe(response => {
			if (response.success) {
				this.login(username, password)
			}

			else {
				alert(response.message)
			}
		})
	}

	isLoggedIn(): boolean {
		return localStorage.getItem("token") != null
	}

	getToken(): string | null {
		return localStorage.getItem("token")
	}

	logout() {
		localStorage.removeItem("token")
		localStorage.removeItem("username")
		localStorage.removeItem("role")
		localStorage.removeItem("userId")
		this.router.navigate(["/"])
	}
}
