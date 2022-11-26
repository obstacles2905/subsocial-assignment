import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor
} from "@nestjs/common";
import { catchError } from "rxjs/operators";
import { of, Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        if (!context.getArgs()[0]) {
            return next.handle();
        }

        return next.handle().pipe(
            catchError((err) => {
                console.log(err);
                return of(throwError(err));
            }),
        );
    }
}