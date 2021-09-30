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
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.css'],
})
export class AddpostComponent implements OnInit {
  locationName?: string;
  description?: string;
  picture?: string;

  user?: any;
  uploadPercent?: number;

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private auth: AuthService,
    private db: AngularFireDatabase,
    private storage: AngularFireStorage
  ) {
    auth.getUser().subscribe((user) => {
      this.db
        .object(`/users/${user?.uid}`)
        .valueChanges()
        .subscribe((user: any) => {
          this.user = user;
        });
    });
  }

  ngOnInit(): void {}

  async uploadFile(event: any) {
    const file = event.target.files[0];

    const filePath = uuidv4() + file.name;
    const fileRef = this.storage.ref(filePath);

    const task = this.storage.upload(filePath, file);
    task.percentageChanges().subscribe((percentage: any) => {
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

  onSubmit() {
    const uid = uuidv4();
    this.db
      .object(`/posts/${uid}`)
      .set({
        id: uid,
        locationName: this.locationName,
        description: this.description,
        picture: this.picture,
        by: this.user.name,
        instaId: this.user.instaUserName,
        date: Date.now(),
      })
      .then(() => {
        this.toastr.success('Post Uploaded!');
        this.router.navigateByUrl('/');
      })
      .catch((err) => this.toastr.error('Oops!'));
  }
}
