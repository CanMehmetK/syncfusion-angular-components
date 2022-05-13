import { Component, OnInit, Input } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';

@Component({
    selector: 'validation-summary',
    templateUrl: './validation-summary.component.html',
    // styleUrls: ['./validation-summary.component.css']
})
export class ValidationSummaryComponent implements OnInit {
    @Input() form: FormGroup;
    errors: string[] = [];

    constructor() { }

    ngOnInit(): void {

        this.form.statusChanges.subscribe((status) => {
            this.resetErrorMessages();
            this.generateErrorMessages(this.form);
        });
    }

    resetErrorMessages(): void {
        this.errors.length = 0;
    }

    generateErrorMessages(formGroup: FormGroup): void {
        Object.keys(formGroup.controls).forEach((controlName) => {
            const control = formGroup.controls[controlName];
            const errors = control.errors;
            if (errors === null || errors.count === 0) {
                return;
            }
            // Handle the 'required' case
            if (errors.required) {
                this.errors.push(`${controlName} is required`);
            }
            // Handle 'minlength' case
            if (errors.minlength) {
                this.errors.push(`${controlName} minimum length is ${errors.minlength.requiredLength}.`);
            }
        });
    }
}
