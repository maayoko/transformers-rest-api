import {
	Catch,
	RpcExceptionFilter,
	BadRequestException,
	NotFoundException
} from "@nestjs/common";
import { Observable, throwError } from "rxjs";

@Catch(BadRequestException, NotFoundException)
export class ExceptionFilter implements RpcExceptionFilter {
	catch(exception: BadRequestException | NotFoundException): Observable<any> {
		return throwError(exception.getResponse());
	}
}
