import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { apiConstant } from '../../constant/APIConstant';
import { LoginData } from '../../interfaces/login/login-data';
import { LoginResponse } from '../../interfaces/login/login-response';
import { ErrorHandler } from '../../../shared/error-handler/error-handler'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private readonly http: HttpClient, @Inject(ErrorHandler) private readonly errorHandler: ErrorHandler) {}

  // User login method
  public logIn(loginData: LoginData): Observable<LoginResponse> {
    // Login endpoint URL
    const loginEndpoint = apiConstant.login.loginUser;

    // Make a POST request to the login endpoint
    return this.http.post<LoginResponse>(loginEndpoint, loginData).pipe(
      catchError((error: HttpErrorResponse) => {
        return this.errorHandler.handleError(error)
      })
    )
  }
}
