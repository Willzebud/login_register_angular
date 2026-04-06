import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {

  private readonly router = inject(Router)

  onLogOut(){
    localStorage.removeItem('loginData')
    this.router.navigate(['/auth-page'])
  }
}
