import {Component, OnDestroy, OnInit} from '@angular/core';
import {Person} from "../models/person.model";
import {PersonService} from "../services/person.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
})
export class PeopleComponent implements OnInit, OnDestroy {
  people: Person[] = [];
  page: number = 1;
  totalPages: number = 1; // Added to track total pages
  subscriptions: Subscription[] = [];

  constructor(private personService: PersonService) {}

  ngOnInit(): void {
    this.loadPeople(this.page);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  loadPeople(page: number): void {
    const sub = this.personService.getPeople(page).subscribe(
        (response) => {
          this.people = response.data;
          this.totalPages = response.total_pages || 1; // Store total pages from API
        },
        (error) => {
          console.error('Failed to load data.');
          this.people = [];
        }
    );
    this.subscriptions.push(sub);
  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.loadPeople(this.page);
    }
  }

  previousPage(): void {
    if (this.page > 1) {
      this.page--;
      this.loadPeople(this.page);
    }
  }
}
