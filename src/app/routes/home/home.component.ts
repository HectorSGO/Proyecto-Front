import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { error } from 'console';
import { map, Observable, Subscription, switchMap, startWith, debounce, debounceTime, tap, of } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { PokemonService } from 'src/app/service/pokemon.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})

export class HomeComponent implements OnInit, OnDestroy {
  cards: any = [];
  loading = false;
  cardsSubscripcion: Subscription = new Subscription();
  searchFormControl = this.fb.group({ cardOne: [''] });
  searchOneCard :any = [];
  paginaActual = 1;

  constructor(
    public authService: AuthService,
    public pokemonService: PokemonService,
    public fb: FormBuilder) { }

  ngOnInit() {
    this.cardsSubscripcion = this.pokemonService
      .getCards()
      .pipe(map(({ data: { data } }: any) => data))
      .subscribe((respuestaCarts) => (this.cards = respuestaCarts));
    tap(()  => this.loading = true)
    this.searchFormControl.valueChanges.pipe(
      debounceTime(500),
      tap((object) => {
        console.log(object);
      }),
      switchMap(data => Boolean(data.cardOne)? this.pokemonService.getCardsOne(data.cardOne) : of({data:{data:[]}}))
    )
    .pipe(map(({ data: { data } }: any) => data),tap(()  => this.loading = true))
    .subscribe( {
      next: (respuestaOne) =>{
        console.log(respuestaOne);
        this.searchOneCard = respuestaOne
        this.loading = false
      },
      error: (error) => {
        this.searchOneCard = []
        this.loading = false},
      complete: () => {}
      
    })
  }
  ngOnDestroy(): void {
    this.cardsSubscripcion.unsubscribe();
  }

  paginaAnterior() {
    this.cardsSubscripcion = this.pokemonService
      .getCards(--this.paginaActual)
      .pipe(map(({ data: { data } }: any) => data))
      .subscribe((respuestaCarts) => (this.cards = respuestaCarts));

  }
  paginaSiguiente() {
    this.cardsSubscripcion = this.pokemonService
      .getCards(++this.paginaActual)
      .pipe(map(({ data: { data } }: any) => data))
      .subscribe((respuestaCarts) => (this.cards = respuestaCarts));

  }
}
