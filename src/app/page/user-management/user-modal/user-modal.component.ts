import {Component, Input, TemplateRef, ViewChild} from '@angular/core';
import {ActionType} from "../../../enum/action-type";
import {User} from "../../../interface/dto/user";
import {ModalButtonComponent} from "../../../components/modal/modal-button/modal-button.component";
import {ModalComponent} from "../../../components/modal/modal/modal.component";
import {
  MuscleDetailsDisplayComponent
} from "../../muscle/muscle-modal-components/muscle-details-display/muscle-details-display.component";
import {
  MuscleEntityFormComponent
} from "../../muscle/muscle-modal-components/muscle-entity-form/muscle-entity-form.component";
import {NgIf} from "@angular/common";
import {
  muscleDeleteFormComponent
} from "../../muscle/muscle-modal-components/muscle-delete-form/muscle-delete-form.component";
import {UserDeleteFormComponent} from "../user-modal-components/user-delete-form/user-delete-form.component";
import {
  UserDetailsDisplayComponent
} from "../user-modal-components/user-details-display/user-details-display.component";
import {UserRolesFormComponent} from "../user-modal-components/user-entity-form/user-roles-form.component";

@Component({
  selector: 'app-user-modal',
  standalone: true,
  imports: [
    ModalButtonComponent,
    ModalComponent,
    MuscleDetailsDisplayComponent,
    MuscleEntityFormComponent,
    NgIf,
    muscleDeleteFormComponent,
    UserDeleteFormComponent,
    UserDetailsDisplayComponent,
    UserRolesFormComponent
  ],
  templateUrl: './user-modal.component.html',
})
export class UserModalComponent {
  @Input() modalTitle!: string;
  @Input() userModalId!: string;
  @Input() user: User | undefined;
  @Input() action!: ActionType;

  @ViewChild("modalTemplate") modalTemplate!: TemplateRef<any>;

  protected readonly ActionType = ActionType;
}