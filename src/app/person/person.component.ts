import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Person} from "../models/person.model";
import {PersonService} from "../services/person.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss'],
})
export class PersonComponent implements OnInit, OnDestroy {
  person!: Person;
  errorMessage: string = '';
  successMessage: string = '';
  isEditingEmail: boolean = false;
  emailForm!: FormGroup;
  subscriptions: Subscription[] = [];

  constructor(
      private personService: PersonService,
      private route: ActivatedRoute,
      private router: Router,
      private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadPerson(id);

    // Initialize the email form
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  loadPerson(id: number): void {
    const sub = this.personService.getPerson(id).subscribe(
        (response) => {
          this.person = response.data;
          this.emailForm.patchValue({
            email: this.person.email,
          });
        },
        (error) => {
          this.errorMessage = 'Failed to load person data.';
        }
    );
    this.subscriptions.push(sub);
  }

  editEmail(): void {
    this.isEditingEmail = true;
    this.emailForm.patchValue({
      email: this.person.email,
    });
    this.successMessage = '';
    this.errorMessage = '';
  }

  saveEmail(): void {
    if (this.emailForm.valid) {
      const newEmail = this.emailForm.get('email')?.value;
      const sub = this.personService.updatePerson(this.person.id, { email: newEmail }).subscribe(
          () => {
            this.person.email = newEmail;
            this.isEditingEmail = false;
            this.successMessage = 'Email updated successfully';
            this.errorMessage = '';
          },
          (error) => {
            this.errorMessage = 'Failed to save email.';
            this.successMessage = '';
          }
      );
      this.subscriptions.push(sub);
    } else {
      this.errorMessage = 'Please enter a valid email address.';
      this.successMessage = '';
    }
  }

  goBack(): void {
    this.router.navigate(['/people']);
  }
}
