import { Component, OnInit } from '@angular/core';
import { Subject, from, Observable, of, zip } from 'rxjs';
import { delay, share, take } from "rxjs/operators";

@Component({
  selector: 'app-pg1',
  templateUrl: './pg1.component.html',
  styleUrls: ['./pg1.component.scss']
})
export class Pg1Component implements OnInit {

  total1 = new Subject<any>();
  total2 = new Subject<any>();
  total3 = new Subject<any>();
  fakeObservable: Observable<any>;

  condition = false;

  constructor() { }

  ngOnInit() {
    this.fakeObservable = of('dummy').pipe(delay(1000));
    //this.total.subscribe();
    this.total3;

    this.total1.next('total1');

    this.fakeObservable
      .subscribe(x => this.total2.next(x));

    setTimeout(() => { this.total1.next('timeout'); this.total2.next('timeout')},3000);

    const sourceOne = this.fakeObservable;
    const sourceTwo = of('World!');
    const sourceThree = of('Goodbye').pipe(share(), delay(3000));
    const sourceFour = of('World!');

    const example = zip(
      this.fakeObservable,
      sourceTwo
    ).pipe(take(1));

    const example2 = zip(
      sourceOne,
      sourceThree,
      this.total2
    ).pipe(take(1));

    const example3 = zip(
      this.total1,
      sourceTwo,
      this.total2
    ).pipe(take(1));

    example3.subscribe(val => console.log(val));

    const observable = from(this.total2);

    observable.subscribe(x => console.log(x));

  }

  activateClass() {
    this.condition = !this.condition;
    console.log('card');
  }

}
