import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { AuthService } from 'src/app/services/auth.service';

import { ToastrService } from 'ngx-toastr';

import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireDatabase } from '@angular/fire/compat/database';

import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  picture: string =
    'https://learnyst.s3.amazonaws.com/assets/schools/2410/resources/images/logo_lco_i3oab.png';
  uploadPercent: number | null = null;

  compressedImage?: any;

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private auth: AuthService,
    private db: AngularFireDatabase,
    private storage: AngularFireStorage
  ) {}

  ngOnInit(): void {}

  onSubmit(f: NgForm) {
    const { email, password, username, country, bio, name } = f.form.value;
    this.auth
      .singUp(email, password)
      .then((res: any) => {
        console.log(res);
        const { uid } = res.user;
        this.db.object(`/users/${uid}`).set({
          id: uid,
          name: name,
          instaUserName: username,
          bio: bio,
          country: country,
          picture: this.picture,
        });
      })
      .then(() => {
        this.toastr.success('User Registered!');
        this.router.navigateByUrl('');
      })
      .catch((err) => {
        this.toastr.error('Signup Failed!');
      });
  }

  async uploadFile(event: any) {
    const file = event.target.files[0];

    const filePath = uuidv4() + file.name;
    const fileRef = this.storage.ref(filePath);

    const task = this.storage.upload(filePath, file);
    task.percentageChanges().subscribe((percentage) => {
      this.uploadPercent = percentage || null;
    });

    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.picture = url;
            this.toastr.success('Image Uploaded!');
          });
        })
      )
      .subscribe();
  }
}
