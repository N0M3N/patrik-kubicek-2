import { Injectable, inject } from "@angular/core";
import { AppDb, Giftee } from "./app.db";

@Injectable({
  providedIn: 'root'
})
export class GifteesService {
  private readonly db = inject(AppDb);

  getByLogin(loginId: number): Promise<Giftee[]> {
    return this.db.giftees.filter(x => x.loginId === loginId).toArray();
  }

  async getById(id: number): Promise<Giftee> {
    const giftee = await this.db.giftees.get(id);
    if (!giftee)
      throw `Giftee not found: id: ${id}`;
    return giftee;
  }

  create(loginId: number, name: string): Promise<number> {
    return this.db.giftees.add(<Giftee>{ loginId, name });
  }

  update(giftee: Giftee): Promise<number> {
    return this.db.giftees.update(giftee.id, { name: giftee.name, isComplete: giftee.isComplete });1
  }

  delete(giftee: Giftee): Promise<void> {
    return this.db.giftees.delete(giftee.id);
  }
}