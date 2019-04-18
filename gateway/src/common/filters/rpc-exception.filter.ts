import {
	Catch,
	ArgumentsHost,
	ExceptionFilter,
	HttpStatus,
} from "@nestjs/common";

interface AllError {
	statusCode: number;
	error: string;
	message: any;
}

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
	catch(exception: AllError, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();

		const status = exception.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
		(response as any).status(status).json(exception);
	}
}
