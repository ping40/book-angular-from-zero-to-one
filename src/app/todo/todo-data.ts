import { InMemoryDbService}  from 'angular-in-memory-web-api';
import {Todo} from './todo.model';

export class InMemoryTodoDbService implements InMemoryDbService {
    createDb() {
        let  todos: Todo[] = [
            {id:'aa7e98f-675d-2345-2663-d6a30a2afa72',  desc: 'Getting up',  completed: false}
        ];

        return  {pingka: todos};
    }
}