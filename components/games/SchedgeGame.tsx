"use client";

import styles from "./SchedgeGame.module.css";
import { useCallback, useEffect, useState } from "react";
import Modal from "@/components/ui/Modal";
import ReactConfetti from "react-confetti";

const SHIFTS = ["A", "B", "C", "D", "E"];
const ROWS = 7;
const COLS = 6;

// Video paths
const fourinarow = "/assets/tutorials/Schedge Rule 4 Row Final.mp4";
const reversealphabet = "/assets/tutorials/Schedge Rule DA Final.mp4";
const twoofonetype = "/assets/tutorials/Schedge Rule Max 2 Final.mp4";

interface GameState {
  currentlySelected: [number, number];
  grid: string[][];
}

interface Problem {
  valid: boolean;
  reason: string;
  locs: [number, number][];
}

const initialState = (initialGrid: string[][]): GameState => {
  const clonedGrid = initialGrid.map((row) => [...row]);

  return {
    currentlySelected: [-1, -1],
    grid: clonedGrid,
  };
};

const getDemandFulfilment = (grid: string[][]) => {
  const numEmployees = ROWS;
  const numDays = COLS;

  const employeeFulfilment = Array(numDays).fill(0);

  for (let j = 0; j < numDays; j++) {
    //For each day
    const shiftsPerDay: Record<string, number> = {
      A: 0,
      B: 0,
      C: 0,
      D: 0,
      E: 0,
    };

    for (let i = 0; i < numEmployees; i++) {
      const shift = grid[i][j];

      if (shift) {
        shiftsPerDay[shift]++;
      }
    }

    //Ensure every value in shiftsPerDay is = 1
    for (const shift in shiftsPerDay) {
      if (shiftsPerDay[shift] >= 1) {
        employeeFulfilment[j] += 1;
      }
    }
  }

  return employeeFulfilment;
};

const getEmployeeRulesBroken = (grid: string[][]): Problem[] => {
  const numEmployees = ROWS;
  const numDays = COLS;

  const problems: Problem[] = [];

  for (let i = 0; i < numEmployees; i++) {
    const rosterline = grid[i];

    //Ensure every value in shiftsPerEmployee is <= 2
    SHIFTS.forEach((shift) => {
      const allIndices = [];
      for (let i = 0; i < rosterline.length; i++) {
        if (rosterline[i] === shift) {
          allIndices.push(i);
        }
      }

      if (allIndices.length > 2) {
        problems.push({
          valid: false,
          reason: `Employee ${i + 1} has ${
            allIndices.length
          } ${shift} shifts, but should have at most 2.`,
          locs: allIndices.map((dayInd) => [i, dayInd]),
        });
      }
    });

    //Ensure no shifts are placed next to each other in reverse alphabetical order
    for (let j = 0; j < numDays - 1; j++) {
      const currentShift = grid[i][j];
      const nextShift = grid[i][j + 1];

      if (
        currentShift &&
        nextShift &&
        currentShift.charCodeAt(0) > nextShift.charCodeAt(0)
      ) {
        problems.push({
          valid: false,
          reason: `Employee ${
            i + 1
          } has shifts ${currentShift} and ${nextShift} placed next to each other in reverse alphabetical order.`,
          locs: [
            [i, j],
            [i, j + 1],
          ],
        });
      }
    }

    //Ensure there can only be four shifts at most in a row then there has to be a day off
    for (let j = 0; j < numDays - 3; j++) {
      const shifts = grid[i].slice(j, j + 5);
      const numShifts = shifts.filter((shift) => shift).length;

      if (numShifts > 4) {
        problems.push({
          valid: false,
          reason: `Employee ${
            i + 1
          } has ${numShifts} shifts in a row. There can only be four shifts at most in a row then there has to be a day off.`,
          locs: Array.from({ length: 5 }, (_, index) => [i, j + index]),
        });
      }
    }
  }

  // If all rules are satisfied, return true
  return problems;
};

export default function SchedgeGame({
  initialGrid,
}: {
  initialGrid: string[][];
  heading?: string;
}) {
  const [state, setState] = useState<GameState>(initialState(initialGrid));
  const [showCongratulatoryModal, setShowCongratulatoryModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);
  const [hasShownModal, setHasShownModal] = useState(false);

  const handleShiftChange = useCallback(
    (row: number, col: number, shiftName: string) => {
      if (initialGrid[row][col] !== "") return;

      const shift = shiftName.toUpperCase();
      if (SHIFTS.includes(shift) || shift === "") {
        const { grid } = state;
        const newGrid = [...grid];
        newGrid[row][col] = shift;

        setState({
          ...state,
          grid: newGrid,
        });
      }
    },
    [initialGrid, state],
  );

  const funct = useCallback(
    (e: KeyboardEvent) => {
      if (
        state.currentlySelected[0] > -1 &&
        state.currentlySelected[1] > -1 &&
        /^[a-zA-Z]$/.test(e.key)
      ) {
        handleShiftChange(
          state.currentlySelected[0],
          state.currentlySelected[1],
          e.key,
        );
      }
    },
    [state.currentlySelected, handleShiftChange],
  );

  useEffect(() => {
    document.addEventListener("keydown", funct);

    return () => {
      document.removeEventListener("keydown", funct);
    };
  }, [funct]);

  const demandFulfilment = getDemandFulfilment(state.grid);
  const problemLocations = getEmployeeRulesBroken(state.grid).flatMap(
    (problem) => problem.locs,
  );

  useEffect(() => {
    if (
      demandFulfilment.every((value) => value === SHIFTS.length) &&
      problemLocations.length === 0 &&
      !hasShownModal
    ) {
      setShowCongratulatoryModal(true);
      setHasShownModal(true);
    }
  }, [demandFulfilment, problemLocations, hasShownModal, setHasShownModal]);
  const demandFulfilmentDescription: string[] = [];
  demandFulfilment.forEach((fulfilment) => {
    demandFulfilmentDescription.push(fulfilment + "/" + SHIFTS.length);
  });

  const clearAll = () => {
    setState(initialState(initialGrid));
  };

  function handleKeyDown(e: React.KeyboardEvent, i: number, j: number) {
    if (e.key === "ArrowUp" && i > 0) {
      e.preventDefault();
      document.getElementById(`input-${i - 1}-${j}`)?.focus({
        preventScroll: true,
      });
      setState({ ...state, currentlySelected: [i - 1, j] });
    } else if (e.key === "ArrowDown" && i < state.grid.length - 1) {
      e.preventDefault();
      document.getElementById(`input-${i + 1}-${j}`)?.focus({
        preventScroll: true,
      });
      setState({ ...state, currentlySelected: [i + 1, j] });
    } else if (e.key === "ArrowLeft" && j > 0) {
      e.preventDefault();
      document.getElementById(`input-${i}-${j - 1}`)?.focus({
        preventScroll: true,
      });
      setState({ ...state, currentlySelected: [i, j - 1] });
    } else if (e.key === "ArrowRight" && j < state.grid[0].length - 1) {
      e.preventDefault();
      document.getElementById(`input-${i}-${j + 1}`)?.focus({
        preventScroll: true,
      });
      setState({ ...state, currentlySelected: [i, j + 1] });
    } else if (e.key === "Backspace" || e.key === "Delete") {
      handleShiftChange(i, j, "");
    }
  }

  return (
    <div className={styles.container}>
      {showCongratulatoryModal && (
        <Modal
          style={{
            padding: "30px",
            borderRadius: "10px",
          }}
        >
          <>
            <ReactConfetti
              width={window.innerWidth}
              height={window.innerHeight}
              recycle={false}
            />
            <h2 className={styles.bigMessage}>Congratulations!</h2>
            <p className={styles.message}>You have won the game!</p>
            <button
              type="button"
              className={styles.closeButton}
              onClick={() => setShowCongratulatoryModal(false)}
            >
              Close
            </button>
          </>
        </Modal>
      )}
      {showAIModal && (
        <Modal>
          <>
            <div className={styles["modalHeader"]}>
              <button
                type="button"
                onClick={() => setShowAIModal(false)}
                className={styles.closeButton}
                aria-label="close modal"
              ></button>
            </div>
            <div className={styles["modalText"]}>
              <h2>How to solve automatically using the RosterLab solver:</h2>
              <h3>
                To try it out, go to{" "}
                <a
                  href="https://rosterlab.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  rosterlab.com
                </a>
              </h3>
              <p>
                <ol>
                  <li>Create 7 employees</li>
                  <li>Create 5 shifts, labelled A-E</li>
                  <li>
                    Create the following rules: max days in a row, forbid
                    relevant shift changes, max shifts per week for each shift
                    is 2
                  </li>
                  <li>
                    Create the following staffing numbers: 1 for every day for
                    each shift type
                  </li>
                  <li>
                    Add the following fixed shifts: one for each initial shift
                    assignment
                  </li>
                  <li>Solve!</li>
                </ol>
              </p>
            </div>
          </>
        </Modal>
      )}
      {showInfoModal && (
        <Modal>
          <>
            <div className={styles["modalHeader"]}>
              <button
                type="button"
                onClick={() => setShowInfoModal(false)}
                className={styles.closeButton}
                aria-label="close modal"
              ></button>
              <h2 className={styles.howToPlayMessage}>How to play</h2>
            </div>
            <div className={styles["modalText"]}>
              <p>
                <br />
                Each day (column) needs one of each shift type (A, B, C, D, E).{" "}
                <br />
                <br />
                Each employee (row) must:
              </p>
              <br />
              <ol>
                <li>
                  Only work each shift type at most 2 times
                  <br />
                  <video className={styles.video} playsInline muted autoPlay>
                    <source src={twoofonetype} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </li>
                <br />

                <li>
                  Not work shifts next to each other in reverse alphabetical
                  order
                  <br />
                  <video className={styles.video} playsInline muted autoPlay>
                    <source src={reversealphabet} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <br />
                  Note that{" "}
                  <b>
                    D -{">"} "_" -{">"} A
                  </b>{" "}
                  is fine
                </li>
                <br />

                <li>
                  Work at most four days in a row
                  <br />
                  <video className={styles.video} playsInline autoPlay muted>
                    <source src={fourinarow} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </li>
              </ol>
            </div>
          </>
        </Modal>
      )}
      <div className={styles.innerContainer}>
        <table className={styles["puzzleTable"]}>
          <tbody>
            <tr>
              <td aria-label="cells"></td>
              {Array.from({ length: COLS }, (_, i) => (
                <td className={styles.dayCell} key={i + 1}>
                  D{i + 1}
                </td>
              ))}
            </tr>
            {state.grid.map((row, i) => (
              <tr key={i}>
                <td>E{i + 1}</td>
                {row.map((shift, j) => {
                  return (
                    <td
                      key={j}
                      style={{
                        border:
                          state.currentlySelected[0] === i &&
                          state.currentlySelected[1] === j
                            ? "2px solid #878a8c"
                            : "2px solid #d3d6da",
                        backgroundColor:
                          initialGrid[i][j] !== ""
                            ? "lightgreen"
                            : problemLocations.find(
                                  (loc) => loc[0] === i && loc[1] === j,
                                )
                              ? "rgb(252, 190, 216)"
                              : "",
                      }}
                    >
                      <input
                        id={`input-${i}-${j}`}
                        type="text"
                        className={styles["cellInput"]}
                        value={shift}
                        onChange={(e) =>
                          handleShiftChange(i, j, e.target.value)
                        }
                        readOnly
                        maxLength={1}
                        onFocus={(e) => {
                          e.preventDefault();
                          e.target.focus({ preventScroll: true });
                        }}
                        style={{
                          backgroundColor:
                            initialGrid[i][j] !== ""
                              ? "lightgreen"
                              : problemLocations.find(
                                    (loc) => loc[0] === i && loc[1] === j,
                                  )
                                ? "rgb(252, 190, 216)"
                                : "",
                        }}
                        onKeyDown={(e) => handleKeyDown(e, i, j)}
                        onClick={() => {
                          setState({ ...state, currentlySelected: [i, j] });
                        }}
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
            <tr>
              <td aria-label="cells"></td>
              {demandFulfilmentDescription.map((desc, j) => (
                <td
                  key={j}
                  className={styles["demandFulfilment"]}
                  style={{
                    textAlign: "center",
                    color:
                      demandFulfilment[j] === SHIFTS.length ? "green" : "red",
                  }}
                >
                  {desc}
                </td>
              ))}
            </tr>
          </tbody>
        </table>

        <div className={styles.shifts}>
          {["_", ...SHIFTS].map((shift, idx) => (
            <button
              type="button"
              key={idx}
              className={styles["clickableShift"]}
              onClick={() => {
                if (
                  state.currentlySelected[0] > -1 &&
                  state.currentlySelected[1] > -1
                ) {
                  handleShiftChange(
                    state.currentlySelected[0],
                    state.currentlySelected[1],
                    shift.replace("_", ""),
                  );

                  document
                    .getElementById(
                      `input-${state.currentlySelected[0]}-${state.currentlySelected[1]}`,
                    )
                    ?.focus({ preventScroll: true });
                }
              }}
            >
              {shift}
            </button>
          ))}
        </div>

        <div className={styles.buttons}>
          <button
            type="button"
            onClick={() => setShowInfoModal(true)}
            className={styles.optionButton}
          >
            How to play
          </button>
          <button
            type="button"
            onClick={() => setShowAIModal(true)}
            className={styles.optionButton}
          >
            Auto solve
          </button>
          <button
            type="button"
            onClick={clearAll}
            className={styles.optionButton}
          >
            Clear all
          </button>
        </div>
      </div>
    </div>
  );
}
