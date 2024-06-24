import {Component, Input, OnChanges} from '@angular/core';
import {User} from "../../../../interface/dto/user";
import {NgForOf, NgIf} from "@angular/common";
import {Privilege} from "../../../../interface/dto/privilege";
import {Role} from "../../../../interface/dto/role";

@Component({
  selector: 'app-user-details-display',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './user-details-display.component.html',
})
export class UserDetailsDisplayComponent implements OnChanges {
  user: User | undefined;
  rolePrivileges: { [id: string]: string } = {};
  @Input() action!: string;


  @Input() set userInput(value: User | undefined) {
    this.user = value;
  }

  ngOnChanges(): void {
    if (this.user) {
      this.user.roles.forEach((role: Role) => {
        let privileges: string[] = role.privileges.map((privilege: Privilege) => privilege.name);
        this.rolePrivileges[role.id] = privileges.join(", ");
      })
    }
  }
}
