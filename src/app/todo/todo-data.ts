import { InMemoryDbService}  from 'angular-in-memory-web-api';
import {Todo} from '../domain/entities';

export class InMemoryTodoDbService implements InMemoryDbService {
    createDb() {
        let  todos: Todo[] = [
            {id:'aa7e98f-675d-2345-2663-d6a30a2afa72',  desc: 'Getting up userId = 1',  completed: false, userId: 1},
            {id:'aa7e98f-675d-2345-2663-d6a30a2afa71',  desc: 'Getting up userId = 2',  completed: false, userId: 2}
        ];

        return  {pingka: todos};
    }
}