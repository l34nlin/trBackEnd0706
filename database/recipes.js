const prisma = require("./prisma");

const findAllRecipes = () =>{
    return prisma.recipes.findMany();
}

const findRecipesById = (id) =>{
    return prisma.recipes.findFirst({
        where: {
            id: id,
        }
    });
}

const saveRecipes = (recipes) =>{
    return prisma.recipes.create({
        data: recipes,
    })
}

const updateRecipes = (id,recipes) =>{
    return prisma.recipes.update({
        where: {
            id,
        },
        data: recipes,
    })
}

const deleteRecipes = (id)=>{
    return prisma.receitas.delete({
        where: {
            id: id
        }
    })
}

module.exports = {
    findAllRecipes,
    findRecipesById,
    saveRecipes,
    updateRecipes,
    deleteRecipes,
}