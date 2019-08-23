import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent{
  @Input() isChecked: boolean = false;
  @Input() todoDesc: string = '';
  
  // 之所以名称后面增加666，是为了说明 是根 父组件的 html 里面的名称是一一对应的
  @Output() onToggleTriggered666 = new EventEmitter<boolean>();
  @Output() onRemoveTriggered = new EventEmitter<boolean>();

  toggle() {
    console.log("call toggle in todo-item.component.ts ");
    this.onToggleTriggered666.emit(true);
  }
  remove() {
    console.log("call remove in todo-item.component.ts ");
    this.onRemoveTriggered.emit(true);
  }
}
