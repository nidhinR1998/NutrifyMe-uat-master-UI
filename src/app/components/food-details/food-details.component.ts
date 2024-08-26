import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Diet } from 'src/app/models/diet.model';
import { Food }  from 'src/app/models/food.model'
import { DietService } from 'src/app/services/diet.service';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-food-details',
  templateUrl: './food-details.component.html',
  styleUrls: ['./food-details.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class FoodDetailsComponent implements OnInit, AfterViewInit {
  @ViewChild('chartCanvas', { static: false }) chartCanvas!: ElementRef<HTMLCanvasElement>;

  foodItem: Food = {
    foodname: '',
    type: '',
  };

  nutrition: Diet | null = null;
  loading: boolean = false;
  errorMessage: string = '';

  constructor(private dietService: DietService) {}

  ngOnInit() {
    // Initial logic
  }

  ngAfterViewInit() {
    // Ensure the chart is created after the view has been initialized
    setTimeout(() => {
      if (this.nutrition) {
        this.createChart();
      }
    }, 0);
  }

  onAnalyzeFood() {
    this.loading = true;
    this.errorMessage = '';
    this.nutrition = null;

    this.dietService.matchDiet(this.foodItem).subscribe(
      (response: Diet) => {
        this.loading = false;
        this.nutrition = response;
        // Create the chart after setting the nutrition data
        setTimeout(() => {
          this.createChart();
        }, 0);
      },
      error => {
        this.loading = false;
        this.errorMessage = 'Failed to analyze food. Please try again.';
        console.error('Error analyzing food:', error);
      }
    );
  }

  createChart() {
    console.log('Creating chart with data:', this.nutrition);
    if (this.nutrition && this.chartCanvas) {
      const canvas = this.chartCanvas.nativeElement;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Custom plugin to add shadows to the chart
        const shadowPlugin = {
          id: 'shadowPlugin',
          beforeDraw: (chart: any) => {
            const ctx = chart.ctx;
            ctx.save();
            ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
            ctx.shadowBlur = 30;
            ctx.shadowOffsetX = 10;
            ctx.shadowOffsetY = 10;
          },
          afterDraw: (chart: any) => {
            const ctx = chart.ctx;
            ctx.restore();
          }
        };
  
        new Chart(ctx, {
          type: 'pie',
          data: {
            labels: [
              'Protein', 'Fat', 'Carbohydrates', 'Fiber', 'Sugar',
              'Salt', 'Calories', 'Cholesterol', 'Calcium',
              'Iron', 'Potassium', 'Vitamin A', 'Vitamin C',
              'Vitamin D', 'Vitamin E', 'Vitamin K'
            ],
            datasets: [{
              data: [
                this.nutrition.protein,
                this.nutrition.fat,
                this.nutrition.carbohydrates,
                this.nutrition.fiber,
                this.nutrition.sugar,
                this.nutrition.salt,
                this.nutrition.calories,
                this.nutrition.cholesterol,
                this.nutrition.calcium,
                this.nutrition.iron,
                this.nutrition.potassium,
                this.nutrition.vitaminA,
                this.nutrition.vitaminC,
                this.nutrition.vitaminD,
                this.nutrition.vitaminE,
                this.nutrition.vitaminK
              ],
              backgroundColor: [
                '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
                '#9966FF', '#FF9F40', '#FF5733', '#C70039',
                '#900C3F', '#581845', '#DAF7A6', '#FFC300',
                '#FF5733', '#C70039', '#900C3F', '#581845'
              ],
              borderColor: '#fff',
              borderWidth: 2,
              hoverOffset: 15,
              hoverBorderColor: '#000',
              hoverBackgroundColor: 'rgba(255, 255, 255, 0.8)',
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: true,
                position: 'top',
                labels: {
                  font: {
                    size: 14,
                    weight: 'bold',
                    family: 'Roboto, sans-serif'
                  },
                  boxWidth: 20,
                  padding: 15,
                  color: '#333'
                }
              },
              tooltip: {
                callbacks: {
                  label: function(context) {
                    const label = context.label || '';
                    const value = context.raw;
                    return `${label}: ${value}`;
                  },
                  title: function(context) {
                    return context[0].label;
                  }
                },
                bodyFont: {
                  size: 14
                }
              }
            },
            animation: {
              animateRotate: true,
              animateScale: true,
              duration: 2000,
              easing: 'easeOutElastic'
            },
            layout: {
              padding: {
                top: 10,
                bottom: 10,
                left: 20,
                right: 20
              }
            }
          },
          plugins: [shadowPlugin] 
        });
      } else {
        console.error('Failed to get 2D context from canvas element');
      }
    } else {
      console.error('Nutrition data or chartCanvas is undefined');
    }
  }
  
}
