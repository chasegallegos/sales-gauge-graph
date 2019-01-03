import { Component, Element, State, Event, EventEmitter } from '@stencil/core';

import { Storage } from '../../enums/storage.enum';
import { locForage } from '../../config/localForage.config';

@Component({
  tag: 'user-goals-form',
  styleUrl: 'user-goals-form.css'
})
export class UserGoalsForm {
  @State() value: number;

  @Event() goalUpdated: EventEmitter;
  @Element() form: HTMLElement = document.getElementById('goal-form');

  private formEl: HTMLElement;

  exit() {
    this.goalUpdated.emit(false);
  }

  submitGoal(event) {
    event.preventDefault();

    locForage.setItem(Storage.UserGoal, this.value).then(() => {
      console.log('SUCCESS');
      this.goalUpdated.emit(true);
      this.form.querySelector('input').value = '';
    });
  }

  updateValue(event) {
    this.value = event.target.value;
  }

  componentDidLoad() {
    this.formEl = document.querySelector('.form');
    this.formEl.classList.remove('flip');
  }

  render() {
    return (
      <div class="edit-page">
        <header>
          <h2>Edit Your Goal</h2>
        </header>
        <form id="goal-form" class="form" onSubmit={e => this.submitGoal(e)}>
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

          <div class="footer">
            <button type="button" onClick={() => this.exit()}>
              Exit
            </button>

            <input type="submit" value="Set Goal" />
          </div>
        </form>
      </div>
    );
  }
}
