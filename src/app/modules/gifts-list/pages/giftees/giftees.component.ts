import { Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Giftee } from '../../services/app.db';
import { GifteesService } from '../../services/giftees.service';
import { faCheck, faChevronRight, faLightbulb, faLock, faPencil, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { DialogComponent } from '../../../../components/dialog/dialog.component';
import { InputComponent } from '../../../../components/input/input.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-giftees',
  standalone: true,
  imports: [CommonModule, FaIconComponent, DialogComponent, InputComponent],
  templateUrl: './giftees.component.html',
  styleUrl: './giftees.component.scss'
})
export class GifteesComponent {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly gifteesService = inject(GifteesService);

  private routeSub?: Subscription;

  id = signal<number | null>(null);
  giftees = signal<Giftee[]>([]);
  incompleteGiftees = computed(() => this.giftees().filter(x => !x.isComplete));
  completeGiftees = computed(() => this.giftees().filter(x => x.isComplete));
  addDialogVisible = signal(false);
  editDialogVisible = signal(false);

  faLock = faLock;
  faPlus = faPlus;
  faTrash = faTrash;
  faPencil = faPencil;
  faLightbulb = faLightbulb;
  faCheck = faCheck;
  faChevronRight = faChevronRight;

  addName = '';
  editGiftee?: Giftee;
  editName = '';

  constructor() {
    effect(async () => {
      const id = this.id();
      if (id) {
        await this.update();
      } else {
        this.giftees.set([]);
      }
    }, { allowSignalWrites: true })
  }

  ngOnInit() {
    this.routeSub = this.activatedRoute.paramMap.subscribe(_ => {
      const id = window.history.state.id;
      if (id)
        this.id.set(id);
    })
  }

  ngOnDestroy() {
    this.routeSub?.unsubscribe();
  }

  onLogOut() {
    sessionStorage.removeItem('gifts-login-id');
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }

  async onAdd() {
    this.addDialogVisible.set(false);
    await this.gifteesService.create(this.id()!, this.addName);
    await this.update();
  }

  async onDelete(giftee: Giftee) {
    await this.gifteesService.delete(giftee);
    await this.update();
  }

  onEdit(giftee: Giftee) {
    this.editGiftee = giftee;
    this.editName = giftee.name;
    this.editDialogVisible.set(true);
  }

  async onEditComplete() {
    this.editDialogVisible.set(false);
    this.gifteesService.update(<Giftee>{ ...this.editGiftee, name: this.editName });
    this.update();
  }

  async onCheck(giftee: Giftee, isComplete: boolean) {
    this.gifteesService.update(<Giftee>{ ...giftee, isComplete })
    this.update();
  }

  openGifts(giftee: Giftee) {
    this.router.navigate(['../gifts'], { state: { gifteeId: giftee.id }, relativeTo: this.activatedRoute });
  }

  private async update() {
    this.giftees.set(await this.gifteesService.getByLogin(this.id()!));
  }
}
