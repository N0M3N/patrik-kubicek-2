import { Injectable } from "@angular/core";
import Dexie, { Table } from "dexie";
import { NON_INDEXED_FIELDS, applyEncryptionMiddleware, clearAllTables } from "dexie-encrypted";
import { CryptoSettings } from "dexie-encrypted/dist/types";

export type Login = {
  id: number;
  password: string;
}

export type Giftee = {
  id: number;
  name: string;
  loginId: number;
  isChecked: boolean;
}

export type Gift = {
  id: number;
  name: string;
  gifteeId: number;
}

@Injectable({
  providedIn: 'root'
})
export class AppDb extends Dexie {
  private readonly encryptionKey: Uint8Array = new Uint8Array([0, 3, 4, 2, 8, 3, 5, 6, 0, 3, 4, 2, 8, 3, 5, 6, 0, 3, 4, 2, 8, 3, 5, 6, 0, 3, 4, 2, 8, 3, 5, 6]);
  logins!: Table<Login, number>;
  giftees!: Table<Giftee, number>;
  gifts!: Table<Gift, number>;

  constructor() {
    super('GiftsListDb');
    applyEncryptionMiddleware(
      this,
      this.encryptionKey, 
      {
        logins: NON_INDEXED_FIELDS,
        giftees: NON_INDEXED_FIELDS,
        gifts: NON_INDEXED_FIELDS
      } as any,
      async () => {
        await clearAllTables(this);
      });

    this.version(2).stores({
      logins: "++id",
      giftees: "++id",
      gifts: "++id"
    });
  }
}