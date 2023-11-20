import { ChangeDetectorRef, Pipe, PipeTransform, inject } from '@angular/core';
import { LocalizationService } from '../services/localization.service';
import { Subscription } from 'rxjs';

@Pipe({
  name: 'localize',
  standalone: true,
  pure: false
})
export class LocalizePipe implements PipeTransform {
  private readonly localizationService = inject(LocalizationService);
  private readonly ref = inject(ChangeDetectorRef);

  private lastKey?: string | null = null;
  private lastResult?: string | null = null;
  private sub?: Subscription | null = null;

  transform(key: string | undefined | null): string | undefined | null {
    if (key === this.lastKey)
      return this.lastResult;

    this.sub?.unsubscribe();
    this.sub = this.localizationService.getLocalizationObservable(key)
      .subscribe(result => {
        this.lastResult = result;
        this.lastKey = key;
        this.ref.markForCheck();
      });

    return this.lastResult;
  }
}
