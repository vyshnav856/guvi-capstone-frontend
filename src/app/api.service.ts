import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, timestamp } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
	constructor(private http: HttpClient) {}

	createPost(data: any): Observable<any> {
		return this.http.post("http://localhost:8091/api/posts", data)
	}

	injectAdverts(array1: any[], array2: any[]): any[] {
		const result = [...array1];
		array2.forEach(element => {
			const randomIndex = Math.floor(Math.random() * (result.length + 1));
			result.splice(randomIndex, 0, element);
		});

		return result;
	}

	filteredPosts: any = []
	advertPosts: any = []
	getFeed(): any[] {
		this.http.get("http://localhost:8091/api/posts").subscribe(posts => {
			this.http.get("http://localhost:8091/api/follow").subscribe(follows => {
				this.http.get("http://localhost:8091/api/interact").subscribe(ints => {
					const convertedFollows = Object.values(follows)
					const convertedPosts = Object.values(posts)
					const convertedInts = Object.values(ints)
					const filteredIds = []
					const filteredInts = []
					for (let i of convertedInts) {
						if (i.username == localStorage.getItem("username")) {
							filteredInts.push(i.postId)
							filteredIds.push(i.id)
						}
					}

					const followedUsers = []
					for (let i of convertedFollows) {
						if (i.follower == localStorage.getItem("username")) {
							followedUsers.push(i.following)
						}
					}
					
					for (let i of convertedPosts) {
						if (followedUsers.includes(i.username)) {
							if (filteredInts.includes(i.id)) {
								i.likedByUser = true
							}
							
							else {
								i.likedByUser = false
							}

							this.filteredPosts.push(i)
						}
					}
				})

				this.http.get("http://localhost:8091/api/adverts").subscribe(response => {
					const res = Object.values(response)
					for (let i of res) {
						i.isAdvert = true
					}

					for (let i of this.filteredPosts) {
						i.isAdvert = false
					}

					this.advertPosts = this.injectAdverts(this.filteredPosts, res)
				})
			})
		})

		return this.advertPosts
	}

	likePost(id: string) {
		const url = "http://localhost:8091/api/posts/like/" + id
		this.http.post(url, {username: localStorage.getItem("username"), postId: id}).subscribe(response => {
			console.log("liked post")
		})
	}

	unlikePost(id: string) {
		const url = "http://localhost:8091/api/posts/unlike/" + id
		this.http.post(url, {username: localStorage.getItem("username"), postId: id}).subscribe(response => {
			console.log("liked post")
		})
	}

	submitComment(id: string, comment: string) {
		console.log(comment)
		this.http.post("http://localhost:8091/api/comments", {postId: id, content: comment, username: localStorage.getItem("username"), timestamp: Date.now().toString()}).subscribe(response => console.log(response))
	}

	filteredComments: any[] = []
	getComments(id: string): any[] {
		this.http.get("http://localhost:8091/api/comments").subscribe(comments => {
			const commentsArray = Object.values(comments)
			this.filteredComments = []
			for (let i of commentsArray) {
				if (i.postId == id) {
					this.filteredComments.push(i)
				}
			}
		})

		return this.filteredComments
	}

	notifications: any[] = []
	getNotifications() {
		this.http.get("http://localhost:8091/api/notifications").subscribe(response => {
			const notificationsArr = Object.values(response)
			this.notifications = []
			for (let i of notificationsArr) {
				if (i.username == localStorage.getItem("username")) {
					this.notifications.push(i)
				}
			}
		})

		return this.notifications
	}

	profiles: any[] = []
	getProfiles() {
		this.http.get("http://localhost:8091/api/profiles").subscribe(response => {
			this.http.get("http://localhost:8091/api/follow").subscribe(followResponse => {
				const responses = Object.values(followResponse)
				const following = []
				for (let i of responses) {
					if (i.follower == localStorage.getItem("username")) {
						following.push(i.following)
					}
				}

				const profilesArr = Object.values(response)
				this.profiles = []
				for (let i of profilesArr) {
					if (following.includes(i.username)) {
						i.followed = true
					}

					else {
						i.followed = false
					}

					this.profiles.push(i)
				}


			})
		})

		return this.profiles
	}

	followUser(username: string) {
		const follower = localStorage.getItem("username")
		const following = username
		this.http.post("http://localhost:8091/api/follow", {follower, following}).subscribe(res => console.log(res))
	}

	unfollowUser(username: string) {
		const follower = localStorage.getItem("username")
		const following = username
		this.http.post("http://localhost:8091/api/follow/unfollow", {follower, following}).subscribe(res => console.log(res))
	}

	sendMessage(username: string, content: string) {
		const sender = localStorage.getItem("username")
		const receiver = username
		this.http.post("http://localhost:8091/api/messages", {sender, receiver, content, timestamp: Date.now().toString()}).subscribe(response => {
			console.log(response)
		})
	}

	messages: any[] = []
	getMessages() {
		this.http.get("http://localhost:8091/api/messages").subscribe(response => {
			const response2 = Object.values(response)
			this.messages = []
			for (let i of response2) {
				if (i.receiver == localStorage.getItem("username")) {
					this.messages.push(i)
				}
			}
		})
		
		return this.messages
	}

	sendReport(postId: string, description: string, type: string) {
		this.http.post("http://localhost:8091/api/reports", {username: localStorage.getItem("username"), postId, description, type}).subscribe(response => console.log(response))
	}

	filteredProfilePosts: any[] = []
	getProfilePosts() {
		this.http.get("http://localhost:8091/api/posts").subscribe(response => {
			const res = Object.values(response)
			this.filteredProfilePosts = []
			for (let i of res) {
				if (i.username == localStorage.getItem("username")) {
					this.filteredProfilePosts.push(i)
				}
			}
		})

		return this.filteredProfilePosts
	}

	reports: any[] = []
	getReports() {
		this.http.get("http://localhost:8091/api/reports").subscribe(response => {
			this.reports = Object.values(response)
		})

		return this.reports
	}

	createAdvert(url: string, content: string, link: string) {
		this.http.post("http://localhost:8091/api/adverts", {url, content, link}).subscribe(response => {
			console.log(response)
		})
	}
}
