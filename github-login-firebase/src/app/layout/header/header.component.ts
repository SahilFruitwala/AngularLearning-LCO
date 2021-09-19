import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  email: string | null = null;

  constructor(
    private auth: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {
    auth.getUser().subscribe((user) => {
      this.email = user?.email || null;
    });
  }

  ngOnInit(): void {}

  async onSignOut() {
    try {
      const res = await this.auth.signOut();
      this.email = null;
      this.router.navigateByUrl('/signin');
      this.toastr.info('Successfully Logged Out!');
    } catch (error) {
      this.toastr.error('Something Went Wrong!');
    }
  }
}
