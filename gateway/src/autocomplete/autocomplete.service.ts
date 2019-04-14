import { Injectable } from "@nestjs/common";
import { Client, Transport, ClientProxy } from "@nestjs/microservices";
import { Observable } from "rxjs";

@Injectable()
export class AutocompleteService {
	@Client({ transport: Transport.TCP, options: { port: 3009 } })
	private readonly client: ClientProxy;

	getProfiles(): Observable<any> {
		return this.client.send({ cmd: "getProfiles" }, "");
	}
}
