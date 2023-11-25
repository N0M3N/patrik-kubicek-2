import { Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { faCheck, faChevronLeft, faClockRotateLeft, faLightbulb, faPencil, faPlus, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { ActivatedRoute, Router } from '@angular/router';
import { GifteesService } from '../../services/giftees.service';
import { GiftsService } from '../../services/gifts.service';
import { DialogComponent } from '../../../../components/dialog/dialog.component';
import { InputComponent } from '../../../../components/input/input.component';
import { Gift, Giftee } from '../../services/app.db';
import { Subscription } from 'rxjs';
import { ExpanderComponent } from '../../../../components/expander/expander.component';
import { LocalizePipe } from "../../../../pipes/localize.pipe";

@Component({
    selector: 'app-gifts',
    standalone: true,
    templateUrl: './gifts.component.html',
    styleUrl: './gifts.component.scss',
    imports: [CommonModule, FaIconComponent, DialogComponent, InputComponent, ExpanderComponent, LocalizePipe]
})
export class GiftsComponent {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly gifteesService = inject(GifteesService);
  private readonly giftsService = inject(GiftsService);

  private routeSub?: Subscription;

  giftee = signal<Giftee | null>(null);
  gifts = signal<Gift[]>([]);
  filteredGifts = computed(() => this.gifts().filter(x => x.name.includes(this.searchPattern())))
  ideas = computed(() => this.filteredGifts().filter(x => x.state === 'idea'));
  ready = computed(() => this.filteredGifts().filter(x => x.state === 'readyToGive'));
  history = computed(() => this.filteredGifts().filter(x => x.state === 'history'));
  addDialogVisible = signal(false);
  editDialogVisible = signal(false);
  searchPattern = signal('');

  faChevronLeft = faChevronLeft;
  faSearch = faSearch;
  faPlus = faPlus;
  faTrash = faTrash;
  faPencil = faPencil;
  faLightbulb = faLightbulb;
  faCheck = faCheck;
  faClockRotateLeft = faClockRotateLeft;

  addName = '';
  editGift?: Gift;
  editName = '';

  constructor() {
    effect(async () => {
      const id = this.giftee();
      if (id) {
        await this.update();
      } else {
        this.gifts.set([]);
      }
    }, { allowSignalWrites: true })
  }

  ngOnInit() {
    this.routeSub = this.activatedRoute.paramMap.subscribe(async _ => {
      const id = window.history.state.gifteeId;
      if (id)
        this.giftee.set(await this.gifteesService.getById(id))
    })
  }

  ngOnDestroy() {
    this.routeSub?.unsubscribe();
  }

  onBack() {
    this.router.navigate(['..'], { relativeTo: this.activatedRoute });
  }

  async onAdd() {
    this.addDialogVisible.set(false);
    await this.giftsService.create(this.giftee()!.id, this.addName);
    await this.update();
    this.addName = '';
  }


  async onDelete(gift: Gift) {
    await this.giftsService.delete(gift);
    await this.update();
  }

  onEdit(gift: Gift) {
    this.editGift = gift;
    this.editName = gift.name;
    this.editDialogVisible.set(true);
  }

  async onEditComplete() {
    this.editDialogVisible.set(false);
    this.giftsService.update(<Gift>{ ...this.editGift, name: this.editName });
    this.update();
  }

  async onCheck(gift: Gift, state: 'idea' | 'readyToGive' | 'history') {
    this.giftsService.update(<Gift>{ ...gift, state })
    this.update();
  }

  private async update() {
    this.gifts.set(await this.giftsService.get(this.giftee()!.id));
  }
}
