import { Component, Element, State, Event, EventEmitter } from '@stencil/core';

import { Storage } from '../../enums/storage.enum';

@Component({
  tag: 'user-goals-form',
  styleUrl: 'user-goals-form.css'
})
export class UserGoalsForm {
  @State() value: number;

  @Event() goalUpdated: EventEmitter;

  @Element() form: HTMLElement = document.getElementById('goal-form');

  submitGoal(event) {
    event.preventDefault();
    localStorage.setItem(Storage.UserGoal, JSON.stringify(this.value));
    this.goalUpdated.emit(true);
    this.form.querySelector('input').value = '';
  }

  updateValue(event) {
    this.value = event.target.value;
  }

  render() {
    return (
      <form id="goal-form" onSubmit={e => this.submitGoal(e)}>
        <label>
          <input
            name="goal"
            type="number"
            required
            min="0"
            placeholder="Set your sales goal..."
            onInput={e => this.updateValue(e)}
          />
        </label>
        <input type="submit" value="Set Goal" />
      </form>
    );
  }
}
