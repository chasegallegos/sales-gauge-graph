import { Component, Listen, State, Prop } from '@stencil/core';

import { Storage } from '../../enums/storage.enum';
import { locForage } from '../../config/localForage.config';
@Component({
  tag: 'user-goals-container',
  styleUrl: 'user-goals-container.css'
})
export class UserGoalsContainer {
  @Prop() name: string;
  @State() goal: any;
  @State() progress: number = 0;
  @State() isEditing: boolean = false;

  @Listen('goalUpdated')
  goalUpdate(event: CustomEvent) {
    if (event.detail) {
      locForage.getItem(Storage.UserGoal).then(goal => {
        this.goal = goal;
      });
    }

    this.isEditing = false;
    this.container.classList.remove('flip');
    this.innerContainer.classList.remove('flip');
  }

  private container: HTMLElement;
  private innerContainer: HTMLElement;

  addClose() {
    this.progress++;
  }

  editGoal() {
    this.isEditing = true;
    this.container.classList.add('flip');
    this.innerContainer.classList.add('flip');
  }

  componentWillLoad() {
    locForage.getItem(Storage.UserGoal).then(goal => {
      this.goal = goal;
    });
  }

  componentDidLoad() {
    this.container = document.querySelector('.container');
    this.innerContainer = document.querySelector('.flip-card-inner');
  }

  render() {
    return (
      <div class="container">
        <div class="flip-card-inner">
          <div class="flip-card-front">
            <header class="header">
              <h2>{this.name}</h2>
              <button type="button" onClick={() => this.editGoal()}>
                Edit Goal
              </button>
            </header>

            <button type="button" onClick={() => this.addClose()}>
              Add Close
            </button>

            <div id="goals-gauge">
              <user-goals-gauge goal={this.goal} data={this.progress} />
            </div>

            <footer class="footer">
              <div>
                <span class="number">{this.progress}</span>
                <span> Closes</span>
              </div>
              <div>
                <span class="number"> {this.goal}</span>
                <span> Goal</span>
              </div>
            </footer>
          </div>

          <div class="flip-card-back">
            <slot name="form" />
          </div>
        </div>
      </div>
    );
  }
}
