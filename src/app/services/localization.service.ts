import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

export type Language = 'cz' | 'en';

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {
  private languageSubject = new BehaviorSubject<Language>('en');
  language = this.languageSubject.asObservable();
  private dictionaries: { [localization: string]: { [key: string]: string } } = {};

  constructor(private readonly http: HttpClient) {
    this.changeLanguage(<Language>localStorage.getItem('localization') ?? 'en');
  }

  changeLanguage(language: Language) {
    if (!Object.keys(this.dictionaries).includes(language)) {
      this.http.get(`/assets/localizations/${language}.json`)
        .subscribe((x: any) => {
          this.dictionaries[language] = x;
          this.languageSubject.next(language);
          localStorage.setItem('localization', language);
        });
    }
    else {

      this.languageSubject.next(language);
      localStorage.setItem('localization', language);
    }
  }

  getLocalization(key: string | undefined | null): string | undefined | null {
    if (Object.keys(this.dictionaries).includes(this.languageSubject.value) && !!key)
      return this.dictionaries[this.languageSubject.value][key];
    return key;
  }

  getLocalizationObservable(key: string | undefined | null): Observable<string | undefined | null> {
    return this.languageSubject.pipe(map(x => {
      if (Object.keys(this.dictionaries).includes(x) && !!key)
        return this.dictionaries[x][key] ?? key;
      return key;
    }));
  }
}