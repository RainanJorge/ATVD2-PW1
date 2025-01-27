import uuid from 'uuid';

export class Pet {
    id: string;
    name: string;
    description: string;
    deadline: Date;
    isVaccinated: boolean;

    constructor(name: string, description: string, deadline: Date, isVaccinated: boolean) {
        this.id = uuid.v4();
        this.name = name;
        this.description = description;
        this.deadline = deadline;
        this.isVaccinated = false;
    }
}