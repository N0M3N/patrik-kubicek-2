import { Injectable, inject } from "@angular/core";
import { AppDb, Giftee } from "./app.db";

@Injectable({
  providedIn: 'root'
})
export class GifteesService {
  private readonly db = inject(AppDb);

  get(loginId: number): Promise<Giftee[]> {
    return this.db.giftees.filter(x => x.loginId === loginId).toArray();
  }

  create(loginId: number, name: string): Promise<number> {
    return this.db.giftees.add(<Giftee>{ loginId, name });
  }

  update(giftee: Giftee) {
    return this.db.giftees.update(giftee.id, { name: giftee.name, isChecked: giftee.isChecked });
  }

  delete(giftee: Giftee) {
    return this.db.giftees.delete(giftee.id);
  }
}