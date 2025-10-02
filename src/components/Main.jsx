import { useState } from "react"
import ClaudeRecipe from "./ClaudeRecipe"
import IngredientsList from "./IngredientsList"
import { getRecipeFromMistral } from "./ai"

export default function Main(){

    const [ingredients, setIngredients] = useState([])

    const [recipe, setRecipe] = useState("")

    function addIngredients(formData){
        const newIngredient = formData.get("ingredient")
        setIngredients(prev => [
            ...prev,
            newIngredient
        ])
    }

    async function getRecipe(){
        const recipeMarkdown = await getRecipeFromMistral(ingredients)
        setRecipe(recipeMarkdown)
    }

    return (
        <>
        <main>
            <form action={addIngredients} className="add-ingredient-form"> 
                <input 
                    type="text"  
                    placeholder="e.g. oregano" 
                    aria-label="Add Ingredients"
                    name="ingredient"
                />
                <button>Add Ingredient</button>
            
            </form>
            {ingredients.length > 0 ? 
                <IngredientsList  ingredients={ingredients}  
                getRecipe={getRecipe} /> : null
            }
            {recipe && <ClaudeRecipe recipe={recipe}/>}
        </main>
        </>
    )
}