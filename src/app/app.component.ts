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
  items: any[];
  email: string;
  password: string;

  constructor(private Auth: AngularFireAuth, data: AngularFireDatabase){
    data.list('/items')
      .valueChanges()
      .subscribe(items => {
        this.items = items;
        console.log(items)
      });
  }


  ngOnInit() {
    this.Auth.authState
      .subscribe((user) => console.log(user));
  }

  signIn(){
    document.getElementById('info').style.display = "block";
    this.Auth.auth.signInWithEmailAndPassword(this.email, this.password)
      .then((userCred) => console.log(userCred));
  }
  logout() {
    this.Auth.auth.signOut();
  }
}
