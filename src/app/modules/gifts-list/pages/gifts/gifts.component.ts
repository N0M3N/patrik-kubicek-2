import { Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { faCheck, faChevronLeft, faClockRotateLeft, faLightbulb, faPencil, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { ActivatedRoute, Router } from '@angular/router';
import { GifteesService } from '../../services/giftees.service';
import { GiftsService } from '../../services/gifts.service';
import { DialogComponent } from '../../../../components/dialog/dialog.component';
import { InputComponent } from '../../../../components/input/input.component';
import { Gift, Giftee } from '../../services/app.db';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-gifts',
  standalone: true,
  imports: [CommonModule, FaIconComponent, DialogComponent, InputComponent],
  templateUrl: './gifts.component.html',
  styleUrl: './gifts.component.scss'
})
export class GiftsComponent {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly gifteesService = inject(GifteesService);
  private readonly giftsService = inject(GiftsService);

  private routeSub?: Subscription;

  giftee = signal<Giftee | null>(null);
  gifts = signal<Gift[]>([]);
  ideas = computed(() => this.gifts().filter(x => x.state === 'idea'));
  ready = computed(() => this.gifts().filter(x => x.state === 'readyToGive'));
  history = computed(() => this.gifts().filter(x => x.state === 'history'));
  addDialogVisible = signal(false);
  editDialogVisible = signal(false);

  faChevronLeft = faChevronLeft;
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
