import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { auth } from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  User: any[];
  email: string;
  password: string;

  constructor(private Auth: AngularFireAuth, data: AngularFireDatabase) {
    data.list('/User')
      .valueChanges()
      .subscribe(User => {
        this.User = User;
      });
  }

  ngOnInit() {
    this.Auth.authState
      .subscribe((user) => (user));
  }

  signIn() {
    document.getElementById('info').style.display = 'block';
    this.Auth.auth.signInWithEmailAndPassword(this.email, this.password);
  }
  logout() {
    this.Auth.auth.signOut();
  }
}
