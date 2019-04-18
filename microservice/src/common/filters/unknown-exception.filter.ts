import { Catch, RpcExceptionFilter } from "@nestjs/common";
import { Observable, throwError } from "rxjs";

@Catch()
export class UnknownExceptionFilter implements RpcExceptionFilter {
	catch(exception: any): Observable<any> {
		return throwError(exception.getResponse());
	}
}
