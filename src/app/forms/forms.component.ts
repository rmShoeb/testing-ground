import { Component } from '@angular/core';
import { GroupFormComponent } from "./group-form/group-form.component";
import { ArrayFormComponent } from "./array-form/array-form.component";

@Component({
    selector: 'app-forms',
    imports: [
        ArrayFormComponent,
        GroupFormComponent,
    ],
    templateUrl: './forms.component.html',
    styleUrl: './forms.component.css'
})
export class FormsComponent {

}
