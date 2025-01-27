import { Petshop } from "../Petshop/Petshop";
import { Pet } from "./Pet";

export class CrudPet {
    private petshops: Petshop[] = [];
    private pets: Pet[] = [];
    private currentPetId: number = 1;

    createPetShop(cnpj: string, name: string): Petshop {
        const petshop = new Petshop(cnpj, name);
        this.petshops.push(petshop);
        return petshop;
    }

    addPet(petshopCNPJ: string, name: string, description: string, deadline: Date, isVaccinated: boolean): Pet | null {
        const petshop = this.petshops.find(ps => ps.cnpj == petshopCNPJ);
        if (petshop) {
            const pet = new Pet(this.currentPetId++, name, description, deadline, isVaccinated);
            this.pets.push(pet);
            return pet;
        }
        return null;
    }

    getAllPets(petshopCNPJ: string): Pet[] {
        return this.pets.filter(pet => petshopCNPJ ===petshopCNPJ);
    }

    updatePet(id: number, updateData: Partial<Pet>): Pet | null {
        const pet = this.pets.find(pet => pet.id === id);
        if (pet) {
            Object.assign(pet, updateData);
            return pet;
        }
        return null;
    }

    isVaccinated(id: number): Pet | null {
        const pet = this.pets.find(pet => pet.id === id);
        if (pet) {
            pet.isVaccinated = true;
            return pet;
        }
        return null;
    }

    deletePet(id: number): boolean {
        const index = this.pets.findIndex( pet => pet.id === id);
        if (index !== -1) {
            this.pets.splice(index, 1);
            return true;
        }
        return false;
    }
}