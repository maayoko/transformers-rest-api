import { Catch, RpcExceptionFilter, BadRequestException } from "@nestjs/common";
import { Observable, throwError } from "rxjs";

@Catch(BadRequestException)
export class ExceptionFilter implements RpcExceptionFilter {
	catch(exception: BadRequestException): Observable<any> {
		return throwError(exception.getResponse());
	}
}
