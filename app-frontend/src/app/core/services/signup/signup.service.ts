import { Inject, Injectable } from '@angular/core'
import { HttpClient, type HttpErrorResponse } from '@angular/common/http'
import { type Observable, catchError } from 'rxjs'
import { apiConstant } from '../../constant/APIConstant'
import { type SignupData } from '../../interfaces/signup/signup-data'
import { ErrorHandler } from '../../../shared/error-handler/error-handler'

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  constructor (@Inject(HttpClient) private readonly http: HttpClient, @Inject(ErrorHandler) private readonly errorHandler: ErrorHandler) {}

  // Method to register a new user
  public signUp (signupData: SignupData): Observable<unknown> {
    // Signup endpoint URL
    const signupEndpoint = apiConstant.signup.signupUser

    // Make a POST request to the signup endpoint
    return this.http.post(signupEndpoint, signupData).pipe(
      catchError((error: HttpErrorResponse) => {
        return this.errorHandler.handleError(error)
      })
    )
  }

  // Check if a username already exists
  public isUsernameExists (username: string): Observable<boolean> {
    const url = apiConstant.signup.checkUserName(username)
    return this.http.get<boolean>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        return this.errorHandler.handleError(error)
      })
    )
  }

  // Check if an email already exists
  public isEmailExists (email: string): Observable<boolean> {
    const url = apiConstant.signup.checkUserEmail(email)
    return this.http.get<boolean>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        return this.errorHandler.handleError(error)
      })
    )
  }
}
