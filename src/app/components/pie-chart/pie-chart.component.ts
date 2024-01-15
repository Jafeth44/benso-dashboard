import { Component, Input, OnInit } from '@angular/core';

import { ChartData, Color } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [NgChartsModule],
  templateUrl: './pie-chart.component.html',
  styles: ``,
})
export class PieChartComponent implements OnInit {
  @Input({ required: true })
  public title!: string;

  @Input({ required: true })
  public doughnutChartLabels!: string[];

  @Input({ required: true })
  public colors!: Color[];

  @Input({ required: true })
  public data!: number[];

  public doughnutChartData!: ChartData<'doughnut'>;

  ngOnInit(): void {
    this.doughnutChartData = {
      labels: this.doughnutChartLabels,
      datasets: [
        {
          data: this.data,
          backgroundColor: this.colors,
        },
      ],
    };
  }
}
