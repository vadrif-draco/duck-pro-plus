import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log("HTTP request intercepted:", req.url);

  const authReq = req.clone({});

  return next(authReq);
};
