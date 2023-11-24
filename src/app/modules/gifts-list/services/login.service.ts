import { Injectable, inject } from "@angular/core";
import { AppDb, Login } from "./app.db";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly db = inject(AppDb);

  get(password: string): Promise<Login | undefined> {
    return this.db.logins.filter(x => x.password === password).first();
  }

  create(password: string): Promise<number> {
    return this.db.logins.add(<Login>{ password });
  }
}
