import { Component, Listen, State, Prop } from '@stencil/core';

import { Storage } from '../../enums/storage.enum';
@Component({
  tag: 'user-goals-container',
  styleUrl: 'user-goals-container.css'
})
export class UserGoalsContainer {
  @Prop() title: string;

  @State() goal: number = JSON.parse(localStorage.getItem(Storage.UserGoal));
  @State() data: number = 0;
  @State() isEditing: boolean = false;

  @Listen('goalUpdated')
  goalUpdate(event: CustomEvent) {
    console.log('updated', event.detail);
    this.goal = JSON.parse(localStorage.getItem(Storage.UserGoal));
  }

  addClose() {
    this.data += 1;
  }

  render() {
    return (
      <div class="container">
        <h2>{this.title}</h2>

        <button type="button" onClick={() => this.addClose()}>
          Add Close
        </button>

        <div id="goals-gauge">
          <user-goals-gauge goal={this.goal} data={this.data} />
        </div>

        <div>
          <slot name="form" />
        </div>
      </div>
    );
  }
}
