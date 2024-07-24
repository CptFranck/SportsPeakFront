import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {FormIndicator} from "../../../../interface/utils/form-indicator";
import {ActionType} from "../../../../interface/enum/action-type";
import {ExerciseType} from "../../../../interface/dto/exercise-type";
import {NgForOf, NgIf} from "@angular/common";
import {ModalButtonComponent} from "../../../../components/modal/modal-button/modal-button.component";
import {UserLoggedService} from "../../../../services/user-logged/user-logged.service";
import {Dictionary} from "../../../../interface/utils/dictionary";

@Component({
  selector: 'app-exercise-type-array',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    ModalButtonComponent
  ],
  templateUrl: './exercise-type-array.component.html',
})
export class ExerciseTypeArrayComponent implements OnInit {
  isAdmin: boolean = false;
  showDetails: Dictionary<boolean> = {};

  @Input() exerciseTypes!: ExerciseType[];
  @Input() modalId!: string;

  @Output() actionExerciseType: EventEmitter<FormIndicator> = new EventEmitter<FormIndicator>();

  private userLoggedService: UserLoggedService = inject(UserLoggedService);

  ngOnInit(): void {
    this.exerciseTypes.map((exerciseType: ExerciseType) => this.showDetails[exerciseType.id] = false);
    this.userLoggedService.currentUser.subscribe(() => this.isAdmin = this.userLoggedService.isAdmin());
  }

  expendExerciseTypeDetails(id: number): void {
    let idKey: string = id.toString();
    this.showDetails[idKey] = !this.showDetails[idKey];
  }

  showExerciseTypeDetails(exerciseType: ExerciseType): void {
    this.actionExerciseType.emit({
      actionType: ActionType.read,
      object: exerciseType
    });
  }

  modifyExerciseType(exerciseType: ExerciseType) {
    this.actionExerciseType.emit({
      actionType: ActionType.update,
      object: exerciseType
    });
  }

  delExerciseType(exerciseType: ExerciseType) {
    this.actionExerciseType.emit({
      actionType: ActionType.delete,
      object: exerciseType
    });
  }
}
