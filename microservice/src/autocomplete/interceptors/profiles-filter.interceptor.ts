import {
	NestInterceptor,
	ExecutionContext,
	CallHandler,
	Injectable
} from "@nestjs/common";
import { map } from "rxjs/operators";

@Injectable()
export class ProfilesFilterInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler) {
		const { currentValues } = context.switchToHttp().getRequest();
		return next
			.handle()
			.pipe(
				map(profiles =>
					profiles.filter(
						profile => !currentValues.includes(Number(profile.id))
					)
				)
			);
	}
}
