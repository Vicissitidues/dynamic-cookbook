// model of detail page
/*RecipeDetails*/
interface RecipeDetails {
  blur: number;
  cover: string;
  ingredientId: number;
  ingredientName: string;
  quantity: number;
  unitId: number;
  unitName: string;
}

/*Data*/
interface Data {
  amount: number;
  cover: string;
  description: string;
  difficulty: number;
  id: number;
  ingredients: any;
  longTitle: string;
  recipeDetails: RecipeDetails[];
  status: number;
  timeTaken: string;
}

/*tsModel2*/
export interface mReceipeQuery {
  code: string;
  data: Data;
  message: string;
  requestId: string;
  success: boolean;
}

