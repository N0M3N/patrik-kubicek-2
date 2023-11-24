import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputComponent } from '../../../../components/input/input.component';
import { LoginService } from '../../services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from '../../../../components/dialog/dialog.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, InputComponent, DialogComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly loginService = inject(LoginService);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  password: string = '';
  registerDialogVisible = signal(false);

  constructor() {
    const id = sessionStorage.getItem('gifts-login-id');
    if (id)
      this.onLogin(Number.parseInt(id));
  }

  async onAuthorize() {
    const login = await this.loginService.get(this.password);
    if (!login) {
      this.registerDialogVisible.set(true);
    }
    else {
      this.onLogin(login.id);
    }
  }

  async onRegister() {
    this.registerDialogVisible.set(false);
    const id = await this.loginService.create(this.password);
    this.onLogin(id);
  }

  private onLogin(id: number) {
    sessionStorage.setItem('gifts-login-id', id.toString())
    this.router.navigate(['../giftees'], { state: { id }, relativeTo: this.activatedRoute })
  }
}
