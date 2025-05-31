import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-service-providers-popup',
  standalone: false,
  templateUrl: './service-providers-popup.component.html',
  styleUrls: ['./service-providers-popup.component.css'],
})
export class ServiceProvidersPopupComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Output() formSubmit = new EventEmitter<any>();

  providerForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.providerForm = this.fb.group({
      name: ['', Validators.required],
      vatNumber: [''],
      companyRegNo: [''],
      branch: [''],
      officeAddress: [''],
      storageAddress: [''],
      townCity: [''],
      province: [''],

      contactNumbers: this.fb.array([this.createContactRow()]),
      faxNumbers: this.fb.array([this.createFaxRow()]),
      emailAddresses: this.fb.array([this.createEmailRow()]),

      serviceType: [''],
      designationNo: [''],

      ratePerKm: [''],
      dateAuthorised: [''],
      authorisedBy: [''],

      canEditAddress: [false],
      isActive: [false],
      dateOpened: [''],
      openedBy: [''],

      isVerified: [false],
      dateVerified: [''],
      verifiedBy: [''],

      isAccredited: [false],
      dateAccredited: [''],
      accreditedBy: [''],
    });
  }

  get contactNumbers(): FormArray {
    return this.providerForm.get('contactNumbers') as FormArray;
  }

  get faxNumbers(): FormArray {
    return this.providerForm.get('faxNumbers') as FormArray;
  }

  private createContactRow(): FormGroup {
    return this.fb.group({
      number: [''],
      name: [''],
      comment: [''],
    });
  }

  private createFaxRow(): FormGroup {
    return this.fb.group({
      fax: [''],
      name: [''],
      comment: [''],
    });
  }

  addContactRow(): void {
    if (this.contactNumbers.length < 5) {
      this.contactNumbers.push(this.createContactRow());
    }
  }

  addFaxRow(): void {
    if (this.faxNumbers.length < 3) {
      this.faxNumbers.push(this.createFaxRow());
    }
  }

  removeContactRow(index: number): void {
    if (this.contactNumbers.length > 1) {
      this.contactNumbers.removeAt(index);
    }
  }

  removeFaxRow(index: number): void {
    if (this.faxNumbers.length > 1) {
      this.faxNumbers.removeAt(index);
    }
  }

  

  get emailAddresses(): FormArray {
    return this.providerForm.get('emailAddresses') as FormArray;
  }

  private createEmailRow(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      type: [''], // e.g. 'Accounts', 'Manager'
    });
  }

  addEmailRow(): void {
    if (this.emailAddresses.length < 2) {
      this.emailAddresses.push(this.createEmailRow());
    }
  }

  removeEmailRow(index: number): void {
    if (this.emailAddresses.length > 1) {
      this.emailAddresses.removeAt(index);
    }
  }

  onClose(): void {
    this.close.emit();
  }

  onCancel(): void {
    this.close.emit();
  }

  onSubmit(): void {
    if (this.providerForm.valid) {
      this.formSubmit.emit(this.providerForm.value);
    } else {
      // Optionally add validation feedback here
      this.providerForm.markAllAsTouched();
    }
  }
}