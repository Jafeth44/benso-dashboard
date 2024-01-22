import { Component } from '@angular/core';
import { PieChartComponent } from '../../components/pie-chart/pie-chart.component';
import { Color } from 'chart.js';
import { AgendarMantenimientoComponent } from '../../components/agendar-mantenimieto/agendar-mantenimieto.component';

@Component({
  selector: 'app-stats-page',
  standalone: true,
  imports: [PieChartComponent, AgendarMantenimientoComponent],
  templateUrl: './stats-page.component.html',
  styleUrl: './stats-page.component.css',
})
export class StatsPageComponent {
  public chartData: number[] = [100, 70, 30];
  public chartColors: Color[] = ['#005e1f', '#6e000f', '#817400'];
  public chartTitle: string = 'Actividad de Equipos';
  public chartLabels: string[] = ['Activos', 'Inactivos', 'Mantenimiento'];
}
