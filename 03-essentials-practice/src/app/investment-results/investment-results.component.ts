import { Component, inject } from '@angular/core';
import { InvestmentService } from '../investment.service';

@Component({
  selector: 'app-investment-results',
  standalone: false,
  templateUrl: './investment-results.component.html',
  styleUrl: './investment-results.component.css',
})
export class InvestmentResultsComponent {
  private investmentService = inject(InvestmentService);

  // get results() {
  //   return this.investmentService.annualData;
  // }

  // results = computed(() => this.investmentService.annualData)();
  results = this.investmentService.annualData.asReadonly();
}
