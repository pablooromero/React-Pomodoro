import React, { useEffect, useContext } from "react";
import Button from "./components/Button";
import CountdownAnimation from "./components/CountdownAnimation";
import SetPomodoro from "./components/SetPomodoro";
import { SettingsContext } from "./context/SettingsContext";

const App = () => {
  const {
    pomodoro,
    executing,
    startAnimate,
    children,
    startTimer,
    pauseTimer,
    updateExecute,
    setCurrentTimer,
    SettingsBtn,
  } = useContext(SettingsContext);

  useEffect(() => {
    updateExecute(executing);
  }, [executing, startAnimate]);

  return (
    <div className="container">
      <h1>Pomodoro</h1>
      <small>Estudia de una mejor manera.</small>
      {pomodoro !== 0 ? (
        <>
          <ul className="labels">
            <li>
              <Button
                title="Trabajar"
                activeClass={
                  executing.active === "work" ? "active-label" : undefined
                }
                _callback={() => setCurrentTimer("work")}
              />
            </li>
            <li>
              <Button
                title="Corto"
                activeClass={
                  executing.active === "short" ? "active-label" : undefined
                }
                _callback={() => setCurrentTimer("short")}
              />
            </li>
            <li>
              <Button
                title="Largo"
                activeClass={
                  executing.active === "long" ? "active-label" : undefined
                }
                _callback={() => setCurrentTimer("long")}
              />
            </li>
          </ul>
          <Button title="Configuración" _callback={SettingsBtn} />
          <div className="timer-container">
            <div className="time-wrapper">
              <CountdownAnimation
                key={pomodoro}
                timer={pomodoro}
                animate={startAnimate}
              >
                {children}
              </CountdownAnimation>
            </div>
          </div>
          <div className="button-wrapper">
            <Button
              title="Comenzar"
              activeClass={!startAnimate ? "active" : undefined}
              _callback={startTimer}
            />
            <Button
              title="Pausa"
              activeClass={startAnimate ? "active" : undefined}
              _callback={pauseTimer}
            />
          </div>
        </>
      ) : (
        <SetPomodoro />
      )}
    </div>
  );
};

export default App;
