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

  async handleSignOut() {
    try {
      await this.auth.signOut()
      this.toastr.success('Signout Success!');
      this.router.navigateByUrl('/signin');
      this.email = null;
    } catch (error) {
      await this.toastr.error('Error while signout!');
    }
  }
}
