import { Component, Prop, Watch } from '@stencil/core';

import c3 from 'c3';

@Component({
  tag: 'user-goals-gauge',
  styleUrl: 'user-goals-gauge.css'
})
export class UserGoalsGauge {
  @Prop({ mutable: true }) data: number;
  @Prop({ mutable: true }) goal: number;

  @Watch('goal')
  updateGoal(newValue: number) {
    this.goal = newValue;
    this.createGauge(this.goal, 0);
    this.updateGauge(this.data);
  }

  @Watch('data')
  updateData(newValue: number) {
    this.data = newValue;
    this.updateGauge(this.data);
  }

  gauge: c3.ChartAPI;

  private createGauge(goal: number = 10, data: number = 0) {
    this.gauge = c3.generate({
      bindto: '#goals-gauge',
      data: {
        type: 'gauge',
        columns: [[`Closes`, data]]
      },
      gauge: {
        min: 0,
        max: goal,
        width: 25
      },
      color: {
        pattern: ['rgb(242, 123, 153)']
      },
      size: {
        height: 240
      }
    });
  }

  private updateGauge(progress: number) {
    setTimeout(() => {
      this.gauge.unload({
        ids: ['Closes']
      });
      this.gauge.load({
        columns: [['Closes', progress]]
      });
    }, 100);
  }

  componentDidLoad() {
    this.createGauge(this.goal);
  }

  render() {
    this.updateGauge(this.data);
    return;
  }
}
