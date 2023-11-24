import { Injectable, inject } from "@angular/core";
import { AppDb, Gift } from "./app.db";

@Injectable({
  providedIn: 'root'
})
export class GiftsService {
  private readonly db = inject(AppDb);

  get(gifteeId: number): Promise<Gift[]> {
    return this.db.gifts.filter(x => x.gifteeId === gifteeId).toArray();
  }

  create(gifteeId: number, name: string): Promise<number> {
    return this.db.gifts.add(<Gift>{ gifteeId, name, state: 'idea' });
  }

  update(gift: Gift): Promise<number> {
    return this.db.gifts.update(gift.id, { name: gift.name, state: gift.state });
  }

  delete(gift: Gift): Promise<void> {
    return this.db.gifts.delete(gift.id);
  }
}