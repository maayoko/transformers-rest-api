import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
	BadRequestException,
} from "@nestjs/common";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class ValidationInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		return next.handle().pipe(
			catchError(err => {
				console.log(err);
				return throwError(
					new BadRequestException(
						err.message.map(({ property, constraints }) => ({
							[property]: Object.values(constraints),
						})),
						err.error,
					),
				);
			}),
		);
	}
}
