import { Injectable } from "@angular/core";
import { type HttpErrorResponse } from "@angular/common/http";
import { type Observable, throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ErrorHandler {
  // Handle HTTP errors
  handleError(error: HttpErrorResponse): Observable<never> {
    console.error("An error occurred:", error);
    return throwError(
      () => new Error("Something went wrong, please try again later.")
    );
  }
}
