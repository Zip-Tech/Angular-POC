import { Component, OnInit } from '@angular/core';
import { AuthService } from '@firebase/auth/auth.service';
import { Store } from '@ngrx/store';
import { StoreRootState } from '@state/state.reducers';

import * as fromAuth from '@state/auth/auth.selector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  title = 'angular-poc';
  user: any;

  constructor(private store: Store<StoreRootState>, public auth: AuthService) {}

  ngOnInit() {
    this.subscribeToUser();
  }

  subscribeToUser() {
    this.store.select(fromAuth.selectUser).subscribe((user) => {
      if (user) {
        this.user = user;
      }
    });
  }

  public logout() {
    return this.auth.signOut();
  }
}
