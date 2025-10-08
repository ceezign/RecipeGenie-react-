import { useEffect, useRef, useState } from "react"
import ClaudeRecipe from "./ClaudeRecipe"
import IngredientsList from "./IngredientsList"
import { getRecipeFromMistral } from "./ai"

export default function Main(){

    const [ingredients, setIngredients] = useState([])

    const [recipe, setRecipe] = useState("")

    const recipeSection = useRef(null)

    useEffect(() => {
        if (recipe !== "" && recipeSection.current !== null) {
            recipeSection.current.scrollIntoView({behavior: "smooth"})
        } 
    }, [recipe])

    async function getRecipe(){
        const recipeMarkdown = await getRecipeFromMistral(ingredients)
        setRecipe(recipeMarkdown)
    }

    function addIngredients(formData){
        const newIngredient = formData.get("ingredient")
        setIngredients(prev => [
            ...prev,
            newIngredient
        ])
    }



    return (
        <>
        <main>
            <form action={addIngredients} className="add-ingredient-form"> 
                <input 
                    type="text"  
                    placeholder="e.g. pepper" 
                    aria-label="Add Ingredients"
                    name="ingredient"
                />
                <button>Add Ingredient</button>
            
            </form>
            {ingredients.length > 0 ? 
                <IngredientsList  
                ref={recipeSection}
                ingredients={ingredients}  
                getRecipe={getRecipe} /> : null
            }
            {recipe && <ClaudeRecipe recipe={recipe}/>}
        </main>
        </>
    )
}