import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldControl, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  name: String;
  username: String;
  email: String;
  password;
  male: String;
  female: String;
  gender: String;
  dob: Date;
  selectedFile: File = null;
  progress: any;
  profilePicture: any;
  filename: String;

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }
  uploadImage(event) {
    this.filename = Date.now().toString();
    this.selectedFile = <File>event.target.files[0];
  }
  onChange() {
    console.log(this.dob);
  }
  onRegisterSubmit() {
    const fd = new FormData();
    fd.append('upl', this.selectedFile, Date.now().toString() + this.selectedFile.name);
    this.http.post('http://localhost:3000/users/upload', fd, {
      reportProgress: true,
      observe: 'events'
    }).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round(event.loaded / event.total * 100) + '%';
      } else if (event.type === HttpEventType.Response) {
        this.profilePicture = event.body['url'];
        const user = {
          name: this.name,
          email: this.email,
          username: this.username,
          password: this.password,
          gender: this.gender,
          dob: this.dob,
          profilePicture: this.profilePicture
        };

        this.authService.registerUser(user).subscribe(data => {
          if (data.success) {
            this.router.navigate(['/signin']);
            this.openSnackBar(data.msg, 'Okay');
          } else {
            this.router.navigate(['/signup']);
            this.openSnackBar(data.msg, 'Okay');
          }
        });
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000
    });
  }
}
