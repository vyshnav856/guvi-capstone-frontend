import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-createpost',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './createpost.component.html',
  styleUrl: './createpost.component.css'
})
export class CreatepostComponent {
	@Output() close = new EventEmitter<void>();
	inputForm: FormGroup

	constructor(private formBuilder: FormBuilder, private apiService: ApiService) {
		this.inputForm = this.formBuilder.group({
			mediaUrl: ["", Validators.required],
			content: ["", Validators.required],
			isVideo: [false]
		})
	}

	submitForm() {
		if (this.inputForm.valid) {
			const formData = this.inputForm.value
			const mediaType = formData.isVideo ? "video" : "image"
			formData.mediaType = mediaType
			delete formData.isVideo
			formData.username = localStorage.getItem("username")
			formData.timestamp = Date.now().toString();

			this.apiService.createPost(formData).subscribe(response => {
				console.log(response)
			})

			this.close.emit()
		}	
	}
}
