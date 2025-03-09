import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NGXLogger } from 'ngx-logger';

@Component({
    selector: 'group-form',
    imports: [
        ReactiveFormsModule
    ],
    templateUrl: './group-form.component.html',
    styleUrl: './group-form.component.css'
})
export class GroupFormComponent {
    private formBuilder = inject(FormBuilder);
    profileForm = this.formBuilder.group({
        firstName: ['', [Validators.required, Validators.maxLength(25)]],
        lastName: [''],
        email: ['', Validators.email],
        address: this.formBuilder.group({
            street: [''],
            city: [''],
            state: [''],
            zip: [''],
        }),
    });

    constructor(private logger: NGXLogger) {}

    printForm() {
        this.logger.log(this.profileForm.value);
    }
}
