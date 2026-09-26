import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginCredentials, LoginErrors, LoginValidationResult } from '../../../core/models';
import { AuthService } from '../../../core/services/auth.service';
import { validateCredentials } from '../../../core/utils/login-validator';

/**
 * Interfaz del formulario: dice qué controles tiene y de qué tipo es cada uno.
 * Gracias a esto, `form.getRawValue()` devuelve exactamente
 * `{ username: string; password: string; rememberMe: boolean }`,
 * que coincide con la interfaz `LoginCredentials`.
 */
interface LoginForm {
  username: FormControl<string>;
  password: FormControl<string>;
  rememberMe: FormControl<boolean>;
}

/** Pantalla de inicio de sesión. */
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly auth: AuthService = inject(AuthService);
  private readonly router: Router = inject(Router);

  /** Errores a mostrar debajo de cada campo. */
  protected readonly errors = signal<LoginErrors>({});
  /** true mientras se verifica el login (para mostrar "Entrando…"). */
  protected readonly loading = signal<boolean>(false);

  /**
   * Formulario reactivo tipado. `nonNullable: true` hace que al reiniciar
   * el campo vuelva a '' en lugar de null.
   */
  protected readonly form = new FormGroup<LoginForm>({
    username: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6)],
    }),
    rememberMe: new FormControl<boolean>(true, { nonNullable: true }),
  });

  /** Se ejecuta al presionar "Entrar". `async` permite usar `await` adentro. */
  protected async submit(): Promise<void> {
    const credentials: LoginCredentials = this.form.getRawValue();
    const result: LoginValidationResult = validateCredentials(credentials);
    this.errors.set(result.errors);
    if (!result.valid) return; // si hay errores, no seguimos

    // Comprobamos usuario + hash de la contraseña (Punto 3).
    this.loading.set(true);
    const ok: boolean = await this.auth.login(credentials);
    this.loading.set(false);

    if (ok) {
      await this.router.navigate(['/bienvenida']);
    } else {
      this.errors.set({ general: 'Usuario o contraseña incorrectos' });
    }
  }
}
