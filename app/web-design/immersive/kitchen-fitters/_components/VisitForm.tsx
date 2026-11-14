"use client";

/**
 * The design-visit form (a demo: nothing is sent) and the note of what is
 * "on the board" from the scroll scene and the measure-up helper.
 */
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Arrow } from "./bits";
import { board, DOORS, HANDLES, WORKTOPS } from "./board";

/** Reads the board and writes it to the DOM, so the scroll never re-renders React. */
export function BoardNote() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const paint = () => {
      const el = ref.current;
      if (!el) return;
      const b = board.get();
      const rows = [
        ["doors", DOORS[b.doors]],
        ["worktop", WORKTOPS[b.worktop]],
        ["handles", HANDLES[b.handles]],
      ] as const;
      for (const [key, option] of rows) {
        const text = el.querySelector<HTMLElement>(`[data-b="${key}"]`);
        if (text) text.textContent = option.name;
        const chip = el.querySelector<HTMLElement>(`[data-c="${key}"]`);
        if (chip) chip.className = `mk-chip mk-mat--${option.id}`;
      }
      const room = el.querySelector<HTMLElement>('[data-b="room"]');
      if (room) room.textContent = b.room;
    };
    paint();
    return board.subscribe(paint);
  }, []);

  return (
    <div className="mk-note" ref={ref}>
      <p className="mk-note-head">
        <span className="mk-mono">On your board</span>
        <a href="#specify">Change it</a>
      </p>
      <ul className="mk-note-chips">
        <li>
          <i className="mk-chip mk-mat--sage" data-c="doors" />
          <span data-b="doors">{DOORS[0].name}</span>
        </li>
        <li>
          <i className="mk-chip mk-mat--quartz" data-c="worktop" />
          <span data-b="worktop">{WORKTOPS[0].name}</span>
        </li>
        <li>
          <i className="mk-chip mk-mat--cup" data-c="handles" />
          <span data-b="handles">{HANDLES[0].name}</span>
        </li>
      </ul>
      <p className="mk-note-room">
        <span className="mk-mono">Room</span>
        <span data-b="room">{board.get().room}</span>
      </p>
    </div>
  );
}

export function VisitForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  if (sent)
    return (
      <div className="mk-form mk-form--done" role="status">
        <p className="mk-mono mk-form-kicker">This is a demo</p>
        <p className="mk-form-done-title">
          That is where a real design visit <em>would be booked.</em>
        </p>
        <p>
          Marlowe Kitchens is a demo by Integrate Web Design, so nothing was sent and no details were kept.
        </p>
      </div>
    );

  return (
    <form className="mk-form" onSubmit={onSubmit}>
      <p className="mk-mono mk-form-kicker">Design visit · free · about 90 minutes</p>
      <label className="mk-field">
        <span>Your name</span>
        <input type="text" name="name" autoComplete="name" placeholder="Alex Morgan" required />
      </label>
      <div className="mk-field-row">
        <label className="mk-field">
          <span>Phone</span>
          <input type="tel" name="phone" autoComplete="tel" placeholder="07700 900123" required />
        </label>
        <label className="mk-field">
          <span>Best time to visit</span>
          <select name="when" defaultValue="weekday">
            <option value="weekday">Weekday daytime</option>
            <option value="evening">Weekday evening</option>
            <option value="saturday">Saturday morning</option>
          </select>
        </label>
      </div>
      <BoardNote />
      <button type="submit" className="mk-btn mk-btn--brass mk-btn--full mk-btn--lg">
        Request my design visit
        <Arrow />
      </button>
      <p className="mk-form-small">No deposit and no obligation. A designer rings you back to agree a time.</p>
    </form>
  );
}
