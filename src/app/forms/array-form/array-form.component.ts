import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NGXLogger } from 'ngx-logger';

@Component({
    selector: 'array-form',
    imports: [
        ReactiveFormsModule
    ],
    templateUrl: './array-form.component.html',
    styleUrl: './array-form.component.css'
})
export class ArrayFormComponent {
    private formBuilder = inject(FormBuilder);
    form = this.formBuilder.group({
        lessons: this.formBuilder.array([])
    });

    constructor(private logger: NGXLogger) { }

    printForm() {
        this.logger.log(this.lessons.value);
    }

    get lessons() {
        return this.form.controls["lessons"] as FormArray;
    }

    getNameGroup(index: number): FormGroup {
        return this.lessons.at(index) as FormGroup;
    }

    addLesson() {
        const lessonForm = this.formBuilder.group({
            title: ['', Validators.required],
            level: ['beginner', Validators.required]
        });

        this.lessons.push(lessonForm);
    }

    deleteLesson(lessonIndex: number) {
        this.lessons.removeAt(lessonIndex);
    }
}
