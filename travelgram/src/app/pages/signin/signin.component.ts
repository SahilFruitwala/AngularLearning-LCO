import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(f: NgForm) {
    const { email, password } = f.form.value;
    this.auth
      .signIn(email, password)
      .then(() => {
        this.toastr.success('Authentication Success!', '', { closeButton: true });
        this.router.navigateByUrl('/');
      })
      .catch((err) => {
        this.toastr.error('Authentication Failed!', '', { closeButton: true });
      });
  }
}
