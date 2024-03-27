import { Inject, Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly isLoggedIn = new BehaviorSubject<boolean>(false)
  public isLoggedIn$ = this.isLoggedIn.asObservable()

  private readonly userId = new BehaviorSubject<string>('')
  public userId$ = this.userId.asObservable()

  private readonly SS_USER_KEY = 'user'

  constructor (@Inject(Router) private readonly router: Router) {
    const storedUser = sessionStorage.getItem(this.SS_USER_KEY)
    if (storedUser != null) {
      this.userId.next(storedUser)
      this.isLoggedIn.next(true)
    }
  }

  public login (userId: string): void {
    this.userId.next(userId)
    this.isLoggedIn.next(true)
    sessionStorage.setItem(this.SS_USER_KEY, userId)
  }

  public logout (): void {
    this.isLoggedIn.next(false)
    sessionStorage.removeItem(this.SS_USER_KEY)
    void this.router.navigate([''])
  }
}
