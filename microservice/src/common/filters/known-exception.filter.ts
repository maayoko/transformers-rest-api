import {
	Catch,
	RpcExceptionFilter,
	BadRequestException,
	NotFoundException,
	UnauthorizedException
} from "@nestjs/common";
import { Observable, throwError } from "rxjs";
import { ValidationError } from "class-validator";

@Catch(BadRequestException, NotFoundException, UnauthorizedException)
export class KnownExceptionFilter implements RpcExceptionFilter {
	catch(
		exception:
			| BadRequestException
			| NotFoundException
			| UnauthorizedException
	): Observable<any> {
		if (exception instanceof BadRequestException) {
			const { message } = exception;
			const isValidationError =
				Array.isArray(message) && message[0] instanceof ValidationError;

			if (isValidationError) {
				return throwError({
					...(exception.getResponse() as object),
					message: message.map(({ property, constraints }) => {
						return { [property]: Object.values(constraints) };
					})
				});
			}
		}

		return throwError(exception.getResponse());
	}
}
