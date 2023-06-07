const express = require ("express");
const z = require("zod");
const router = express.Router();

const {
    findAllRecipes,
    findRecipesById,
    saveRecipes,
    updateRecipes,
    deleteRecipes,
} = require("../database/recipes");
const auth = require("../middleware/auth");

const RecipesSchema = z.object({
    name: z.string(),
    preparationTime: z.string().min(0).default(0),
    description: z.string().min()
});

router.get("/recipes",auth,async(req,res)=>{
    const moreThan = req.query.more_than ? Number(req.query.more_than) : 0;
    const recipes = await findAllRecipes(moreThan);
    res.json({
        recipes,
    });
});

router.get("/recipes/:id",auth,async(req,res)=>{
    const id = Number(req.params.id);
    recipes = await findRecipesById(id);
    res.json({
        recipes,
    });
});

router.post("/recipes",auth,async(req,res)=>{
    try {
        const newRecipes = RecipesSchema.parse(req.body);
        const recipesSave = await saveRecipes(newRecipes);
        res.json({
            recipes: recipesSave,
        })
    } catch (err) {
        if(err instanceof z.ZodError)
        return res.status(422).json({
            massege: err.errors,
        });
        res.status(500).json({
            message: "Server Error"
        })
        console.log(err)
    }
})
router.put("/recipes/:id",auth,async(req,res)=>{
    const id = Number(req.params.id);
    const recipes = RecipesSchema.parse(req.body);
    const upRecipes = await updateRecipes(id,recipes);
    res.json({
        recipes: upRecipes,
    });

});

router.delete("/recipes/:id",auth,async(req,res)=>{
    id = Number(req.params.id);
    await deleteRecipes(id);
    res.status(204).send();
})


module.exports =router;