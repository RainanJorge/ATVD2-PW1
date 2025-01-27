import express from 'express';
import { CrudPet } from '../entities/Pet/CrudPet';
import { checkExistUserAccount } from '../middleware/checkExistsUserAccount';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();
const petshopCrud = new CrudPet();

const validatedCNPJ = (cnpj: string): boolean => {
  const regex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
  return regex.test(cnpj);
};

// POST /petshops
router.post('/petshops', (req, res) => {
  console.log("entru aq");
  
  const { name, cnpj } = req.body;

  if (!name || !cnpj) {
    return res.status(400).json({ error: 'Os campos name e cnpj são obrigatórios.' });
  }

  if (!validatedCNPJ(cnpj)) {
    return res.status(400).json({ error: 'O CNPJ fornecido não está no formato correto (XX.XXX.XXX/0001-XX).' });
  }

  const existingPetshop = petshopCrud['petshops'].find((petshop) => petshop.cnpj === cnpj);
  if (existingPetshop) {
    return res.status(400).json({ error: 'Já existe um petshop com este CNPJ.' });
  }

  const newPetshop = petshopCrud.createPetShop(cnpj, name);
  console.log(newPetshop);

  return res.status(201).json(newPetshop);
});

// GET /pets
router.get('/pets', checkExistUserAccount, (req, res) => {
  const { petshop } = req.body;
  
  const pets = petshopCrud.getAllPets(petshop.cnpj);
  
  return res.status(200).json(pets);
});

// POST /pets
router.post('/pets', checkExistUserAccount, (req, res) => {
  const { name, type, description, deadline } = req.body;
  const { petshop } = req.body;

  if (!name || !type || !description || !deadline) {
    return res.status(404).json({ error: 'Os campos: name, type, description e deadline são obrigatórios'});
  }

  const newPet = {
    id: uuidv4(),
    name,
    type, 
    description,
    vaccinated: false,
    deadline: new Date(deadline).toISOString(),
    created_at: new Date().toISOString(),
  };

  petshop.pets.push(newPet);

  return res.status(201).json(newPet);
});

// PUT /pets/:id
router.put('/pets:id', checkExistUserAccount, (req, res) => {
  const { name, type, description, deadline } = req.body;
  const { id } = req.params;
  const { petshop } = req.body;

  if (!name || !type || !description || !deadline) {
    return res.status(400).json({ error: 'Os campos name, type, description e deadline são obrigatórios.' });
  }

  const pet = petshop.pets.find((p: any) => p.id === id);

  if (!pet) {
    return res.status(404).json({ error: 'Nenhum pet com esse ID encontrado.'})
  }

  pet.name = name;
  pet.type = type;
  pet.description = description;
  pet.deadline_vaccination = new Date(deadline).toISOString();

  return res.status(201).json(pet);
});

// PATCH /pets/:id/vaccinated
router.patch('/pets/:id/vaccinated', checkExistUserAccount, (req, res) => {
  const { id } = req.params;
  const { petshop } = req.body;

  const pet = petshop.pets.find((p: any) => p.id === id);

  if (!pet) {
    return res.status(404).json({ error: 'Nenhum pet encontrado.'});
  }

  pet.vaccinated = true;

  return res.status(201).json(pet);
});

// DELETE /pets/:id
router.delete('/pets/:id', checkExistUserAccount, (req, res) => {
  const { id } = req.params;
  const { petshop } = req.body;

  const pet = petshop.pets.find((p: any) => p.id === id);

  if (!pet) {
     return res.status(404).json({ error: 'Nenhum pet encontrado.'});
  }

  petshop.pets.splice(pet, 1);

  return res.status(201).json(petshop.pets);
});

export default router;