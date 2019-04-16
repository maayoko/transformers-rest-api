import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
	BadRequestException,
} from "@nestjs/common";
import { Observable, throwError } from "rxjs";
import { tap, catchError } from "rxjs/operators";

@Injectable()
export class ValidationInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		return next
			.handle()
			.pipe(
				catchError(err =>
					throwError(
						new BadRequestException(
							err.message.map(msg => msg.constraints),
							err.error,
						),
					),
				),
			);
	}
}
