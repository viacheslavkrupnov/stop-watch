import React from 'react';
import { useEffect, useState } from 'react';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import s from './App.module.css';

export default function App() {
  const [sec, setSec] = useState(0);
  const [status, setStatus] = useState('stop');

  useEffect(() => {
    const unsubscribe$ = new Subject();
    interval(1000)
      .pipe(takeUntil(unsubscribe$))
      .subscribe(() => {
        if (status === 'run') {
          setSec(val => val + 1000);
        }
      });
    return () => {
      unsubscribe$.next();
      unsubscribe$.complete();
    };
  }, [status]);

  const start = React.useCallback(() => {
    setStatus('run');
  }, []);

  const stop = React.useCallback(() => {
    setStatus('stop');
    setSec(0);
  }, []);

  const reset = React.useCallback(() => {
    setSec(0);
  }, []);

  const wait = React.useCallback(() => {
    setStatus('wait');
  }, []);

  return (
    <div className={s.container}>
      <h1>Stopwatch</h1>
      <span className={s.watch}>
        {new Date(sec).toISOString().slice(11, 19)}
      </span>
      <div className={s.wrap}>
        <button className={s.button} onClick={start}>
          Start
        </button>
        <button className={s.button} onClick={stop}>
          Stop
        </button>
        <button className={s.button} onClick={reset}>
          Reset
        </button>
        <button className={s.button} onClick={wait}>
          Wait
        </button>
      </div>
    </div>
  );
}
