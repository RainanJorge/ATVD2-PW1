import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class CrudPet {
    async createPetShop(cnpj: string, nome: string) {
        return await prisma.petshop.create({
            data: { cnpj, nome },
        });
    }

    async addPet(petshopCnpj: string, name: string, description: string, deadline_vaccination: Date, vaccinated: boolean) {
        return await prisma.pet.create({
            data: {
                name, 
                description,
                deadline_vaccination,
                vaccinated,
                petshopCnpj,
            },
        });
    }

    async getAllPets(petshopCnpj: string) {
        return await prisma.pet.findMany({
            where: { petshopCnpj },
        });
    }

    async updatePet(id: string, updateData: Partial<{ name: string; description: string; deadline: Date; isVaccinated: boolean; }>) {
        return await prisma.pet.update({
            where: { id },
            data: updateData,
        });
    }

    async isVaccinated(id: string){
        return await prisma.pet.update({
            where: { id },
            data: { vaccinated: true },
        });
    }

    async deletePet(id: string) {
        return await prisma.pet.delete({
            where: { id },
        });
    }
}