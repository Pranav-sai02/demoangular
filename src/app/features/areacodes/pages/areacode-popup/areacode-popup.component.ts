import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-areacode-popup',
  standalone: false,
  templateUrl: './areacode-popup.component.html',
  styleUrl: './areacode-popup.component.css',
})
export class AreacodePopupComponent {
  areaForm: FormGroup;

  @Output() close = new EventEmitter<void>();
  @Output() formSubmit = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {
    this.areaForm = this.fb.group({
      areaCode: ['', Validators.required],
      description: [''],
      type: ['Landline'],
      isActive: [false],
    });
  }

  onSubmit() {
    if (this.areaForm.invalid) {
      this.areaForm.markAllAsTouched(); // Highlight validation errors
      return;
    }
    const formData = this.areaForm.value;
    console.log('Form submitted:', formData);

    this.formSubmit.emit(formData);

    this.close.emit();
  }

  onCancel() {
    this.close.emit();
  }

  onClose() {
    this.close.emit();
  }
}
