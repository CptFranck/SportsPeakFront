import {AfterViewInit, Component, inject, Input, OnInit} from '@angular/core';
import {MultiSelectComponent} from "../../../../../components/multi-select/multi-select.component";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf, NgTemplateOutlet} from "@angular/common";
import {InputControlComponent} from "../../../../../components/input-control/input-control.component";
import {Muscle} from "../../../../../interface/dto/muscle";
import {Observable, Subscription} from "rxjs";
import {MuscleService} from "../../../../../services/muscle/muscle.service";
import {Exercise} from "../../../../../interface/dto/exercise";
import {
  ExerciseSelectorComponent
} from "../../../../../components/selectors/exercise-selector/exercise-selector.component";
import {UserLoggedService} from "../../../../../services/user-logged/user-logged.service";

@Component({
  selector: 'app-muscle-entity-form',
  standalone: true,
  imports: [
    MultiSelectComponent,
    ExerciseSelectorComponent,
    ReactiveFormsModule,
    NgIf,
    NgTemplateOutlet,
    InputControlComponent
  ],
  templateUrl: './muscle-entity-form.component.html',
})
export class MuscleEntityFormComponent implements OnInit, AfterViewInit {

  muscle: Muscle | undefined;
  muscleForm: FormGroup | null = null;
  submitInvalidForm: boolean = false;
  eventsSubscription!: Subscription;

  isAdmin: boolean = false;
  @Input() btnCloseRef!: HTMLButtonElement;
  @Input() submitEvents!: Observable<void> | undefined;

  private muscleService: MuscleService = inject(MuscleService);
  private userLoggedService: UserLoggedService = inject(UserLoggedService);

  @Input() set muscleInput(value: Muscle | undefined) {
    this.muscle = value;
    this.initializeMuscleForm();
  }

  ngOnInit() {
    this.userLoggedService.currentUser.subscribe(() => this.isAdmin = this.userLoggedService.isAdmin());
    this.initializeMuscleForm();
  }

  ngAfterViewInit() {
    if (this.submitEvents)
      this.eventsSubscription = this.submitEvents.subscribe(() => this.onSubmit());
  }

  initializeMuscleForm() {
    const exerciseIdsValidator =
      this.isAdmin ? null : Validators.required;
    const muscleName: string = this.muscle ? this.muscle.name : "";
    const muscleDescription: string = this.muscle ? this.muscle.description : "";
    const muscleFunction: string = this.muscle ? this.muscle.function : "";
    const muscleExerciseIds: number[] = this.muscle?.exercises ?
      this.muscle.exercises?.map((ex: Exercise) => ex.id) : [];

    this.muscleForm = new FormGroup({
      name: new FormControl(muscleName,
        [Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50)]),
      description: new FormControl(
        muscleDescription,
        [Validators.required,
          Validators.minLength(3),
          Validators.maxLength(2000)]),
      function: new FormControl(
        muscleFunction,
        [Validators.required,
          Validators.minLength(3),
          Validators.maxLength(2000)]),
      exerciseIds: new FormControl(
        muscleExerciseIds, exerciseIdsValidator
      ),
    });

    if (this.muscle)
      this.muscleForm.addControl("id", new FormControl(this.muscle.id));
  }

  onSubmit() {
    if (!this.muscleForm) return;
    if (this.muscleForm.valid) {
      this.submitInvalidForm = false;
      if (!this.muscleForm.value.id) {
        this.muscleService.addMuscle(this.muscleForm);
      } else {
        this.muscleService.modifyMuscle(this.muscleForm);
      }
      this.btnCloseRef.click();
    } else {
      this.submitInvalidForm = true;
    }
  }
}
