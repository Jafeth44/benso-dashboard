import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, signal } from '@angular/core';
import { Observable, combineLatest, map } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-autocomplete',
  standalone: true,
  imports: [CommonModule, MatAutocompleteModule, ReactiveFormsModule],
  templateUrl: './autocomplete.component.html',
  styles: ``
})
export class AutocompleteComponent implements OnInit {
  @Input({required: true})
  public placeholder!: string;
  
  @Input({required: true})
  public items$!: Observable<string[]>;

  public open = false;
  public input = signal('');
  public input$ = toObservable(this.input);
  
  public ngOnInit(): void {
    this.items$ = combineLatest([
      this.items$,
      this.input$
    ]).pipe(
      map(([items, input]) => items.filter(
        item => item.includes(input.toUpperCase())
      )),
    )
  }
  
  public filtroClientes(value: string) {
    this.input.set(value);
  }
}
