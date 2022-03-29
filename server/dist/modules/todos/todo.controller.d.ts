interface Todo {
    id: number;
    text: string;
    active: boolean;
    done: boolean;
}
export declare class TodosController {
    constructor();
    index(): Promise<Todo[]>;
    show(id: string): Promise<Todo>;
    create({ text }: {
        text: string;
    }): Promise<Todo>;
    update(id: string, data: Todo): Promise<Todo>;
    destroy(id: string): Promise<number>;
}
export {};
