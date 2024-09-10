import {Component, inject, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ProgExercise} from "../../../../interface/dto/prog-exercise";
import {ActionType} from "../../../../interface/enum/action-type";
import {ProgExerciseService} from "../../../../services/prog-exercise/prog-exercise.service";
import {FormIndicator} from "../../../../interface/utils/form-indicator";
import {LoadingComponent} from "../../../../components/loading/loading.component";
import {
  ProgExerciseModalComponent
} from "../../../explore/prog-exercises/prog-exercise-modal/prog-exercise-modal.component";
import {
  ProgExercisesArrayComponent
} from "../../../explore/prog-exercises/prog-exercise-array/prog-exercises-array.component";
import {SearchBarComponent} from "../../../../components/search-bar/search-bar.component";
import {Muscle} from "../../../../interface/dto/muscle";
import {MyProgExerciseModalComponent} from "../my-prog-exercise-modal/my-prog-exercise-modal.component";
import {HomeCardComponent} from "../../../../components/card/home-card/home-card.component";
import {NgForOf, NgIf} from "@angular/common";
import {
  ProgExerciseCardComponent
} from "../../../../components/card/prog-exercise/prog-exercise-card/prog-exercise-card.component";
import {ModalButtonComponent} from "../../../../components/modal/modal-button/modal-button.component";
import {RouterLink} from "@angular/router";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-my-prog-exercises',
  standalone: true,
  imports: [
    LoadingComponent,
    ProgExerciseModalComponent,
    ProgExercisesArrayComponent,
    SearchBarComponent,
    MyProgExerciseModalComponent,
    HomeCardComponent,
    NgForOf,
    ProgExerciseCardComponent,
    ModalButtonComponent,
    NgIf,
    RouterLink
  ],
  templateUrl: './my-prog-exercises.component.html',
})
export class MyProgExercisesComponent implements OnInit, OnDestroy {
  loading: boolean = true;
  progExercises: ProgExercise[] = [];
  displayedProgExercises: ProgExercise[] = [];
  progExercise: ProgExercise | undefined;
  action: ActionType = ActionType.create;
  modalTitle: string = "";
  progExerciseModalId: string = "progExerciseModal";
  searchInput: string = "";

  @ViewChild("modalTemplate") modalTemplate!: TemplateRef<any>;

  private unsubscribe$: Subject<void> = new Subject<void>();
  private progExerciseService: ProgExerciseService = inject(ProgExerciseService);

  ngOnInit(): void {
    this.progExerciseService.userProgExercises
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((progExercises: ProgExercise[]) => {
        this.progExercises = progExercises;
        this.updateDisplayedProgExercise();
      });
    this.progExerciseService.isLoading
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((isLoading: boolean) => this.loading = isLoading);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  setProgExercise(formIndicator: FormIndicator) {
    this.progExercise = formIndicator.object;
    this.action = formIndicator.actionType;
    this.modalTitle = formIndicator.object.name;
  }

  searchProgExercise(input: string) {
    this.searchInput = input;
    this.updateDisplayedProgExercise();
  }

  updateDisplayedProgExercise() {
    if (this.searchInput === "") {
      this.displayedProgExercises = this.progExercises;
      return;
    }

    let localInput: string = this.searchInput.toLowerCase();
    let includeMuscleExerciseName: boolean = false;

    this.displayedProgExercises = this.progExercises.filter((progExercise: ProgExercise) => {
      includeMuscleExerciseName = false;

      progExercise.exercise.muscles.forEach((muscle: Muscle) =>
        includeMuscleExerciseName = muscle.name.toLowerCase().includes(localInput))

      return progExercise.name.toLowerCase().includes(localInput) ||
        progExercise.note.toLowerCase().includes(localInput) ||
        progExercise.exercise.name.toLowerCase().includes(localInput) ||
        includeMuscleExerciseName;
    });
  }
}
