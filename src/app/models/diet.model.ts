export class Diet {
  id?: number; // Optional, as it might be auto-generated
  foodname: string;
  type: string; // "veg" or "non-veg"
  protein: number;
  fat: number;
  carbohydrates: number;
  fiber: number;
  sugar: number;
  salt: number;
  calories: number;
  cholesterol: number;
  calcium: number;
  iron: number;
  potassium: number;
  vitaminA: number;
  vitaminC: number;
  vitaminD: number;
  vitaminE: number;
  vitaminK: number;
  servingSize: number;
  servingsPerContainer: number;
  allergens: string; 
  servingUnit: string;
  notes: string;   
  recommendations: string;

  constructor(
      foodname: string,
      type: string,
      protein: number,
      fat: number,
      carbohydrates: number,
      fiber: number,
      sugar: number,
      salt: number,
      calories: number,
      cholesterol: number,
      calcium: number,
      iron: number,
      potassium: number,
      vitaminA: number,
      vitaminC: number,
      vitaminD: number,
      vitaminE: number,
      vitaminK: number,
      servingSize: number,
      servingsPerContainer: number,
      allergens: string, 
      servingUnit: string,
      notes: string,   
      recommendations: string,
      id?: number
  ) {
      this.id = id;
      this.foodname = foodname;
      this.type = type;
      this.protein = protein; 
      this.fat = fat;
      this.carbohydrates = carbohydrates;
      this.fiber = fiber;
      this.sugar = sugar;
      this.salt = salt;
      this.calories = calories;
      this.cholesterol = cholesterol;
      this.calcium = calcium;
      this.iron = iron;
      this.potassium = potassium;
      this.vitaminA = vitaminA;
      this.vitaminC = vitaminC;
      this.vitaminD = vitaminD;
      this.vitaminE = vitaminE;
      this.vitaminK = vitaminK;
      this.servingSize = servingSize;
      this.servingsPerContainer = servingsPerContainer;
      this.allergens = allergens;
      this.servingUnit = servingUnit;
      this.notes = notes;
      this.recommendations = recommendations;
  }
}
