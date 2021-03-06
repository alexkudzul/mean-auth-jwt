import { Component, OnInit } from '@angular/core';

// Services
import { AuthService } from '../../services/auth.service';


// Enrutador
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user = {
    email: '',
    password: ''
  }

  constructor(private _authService: AuthService, private _router: Router) { }

  ngOnInit(): void {
  }

  signUp(){
    this._authService.signUp(this.user).subscribe(
      res => {
        console.log(res)
        // Guardar el token en localStorage, setItem (name y value)
        localStorage.setItem('token', res.token);
        // Una vez guardado enviarlo a posts-private
        this._router.navigate(['/posts-private']);
      },
      err => {
        console.log(err)
      }
    );
  }
}
