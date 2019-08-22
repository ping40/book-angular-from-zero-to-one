import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'app-todo-header',
  templateUrl: './todo-header.component.html',
  styleUrls: ['./todo-header.component.css']
})
export class TodoHeaderComponent implements OnInit {
  @Input() placeholder: string = 'What needs to be done? default value';
  @Input() delay: number = 300;

  @Output() textChanges = new EventEmitter<string>();
  @Output() onEnterUp = new EventEmitter<boolean>();


  constructor(private elementRef: ElementRef) {
    const event$ = fromEvent(elementRef.nativeElement, 'keyup')
            .pipe(
              map((e:any) => e.target.value),
              debounceTime(this.delay)
            );

      event$.subscribe( (input: string)  => {
        console.log(`in ping089  ` + typeof input );
        this.textChanges.emit( input ) ;
   });
  }

  ngOnInit() {
  }

  enterUp() {
    this.onEnterUp.emit(true);
  }

}
