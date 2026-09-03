"use client";

/**
 * "Save Time" mockup: the RosterLab roster grid generating a schedule.
 *
 * Same scene as the hero, rendered flat (no laptop, no photo) and with its
 * own set of roster rows.
 */

import { Stage } from "./stage";
import { W, H, TL, AppUI, StaffProvider } from "./scene";
import { useTime } from "./stage";

const GENERATE_STAFF = [
  {n:'Isaac Lambert',    s:'RN, AM, …',   f:'0.90', to:10, row:['N','N','N','N','','','PM','PM','PM','PM','PM','','','']},
  {n:'Sunny Hayes',      s:'HCA, AM, …',  f:'0.60', to:13, row:['','','','','N','N','N','N','','','','','N','N']},
  {n:'Daniel Mitchell',  s:'RN, AM, …',   f:'0.80', to:11, row:['AM','AM','AM','AM','PM','','','AM','AM','AM','AM','AM','','']},
  {n:'Jason Grant',      s:'RN, AM, …',   f:'0.70', to:11, row:['','','','','AM','AL','AM','','','N','N','N','','']},
  {n:'Chris Brooks',     s:'RN, AM, …',   f:'0.80', to:13, row:['PM','PM','PM','','','PM','N','N','N','','','PM','PM','PM']},
  {n:'Gary Fletcher',    s:'HCA, AM,…',   f:'0.80', to:10, row:['AM','N','N','N','','','','PM','PM','PM','PM','','','']},
  {n:'Clemen Coleman',   s:'HCA, AM,…',   f:'0.60', to:13, row:['','','PM','PM','PM','','','','','','','AM','AM','AM']},
  {n:'Jolin Lawson',     s:'HCA, AM,…',   f:'0.80', to:13, row:['PM','PM','','','','AM','AM','AM','AM','','','','PM','PM']},
  {n:'Telma Marsh',      s:'HCA, NIG…',   f:'0.80', to:11, row:['','AM','AM','AM','AM','','','','N','N','N','N','','']},
  {n:'Beca Ashford',     s:'HCA, AM,…',   f:'0.60', to:11, row:['N','N','','','','PM','PM','','','AM','AM','PM','','']},
  {n:'Zac Barrett',      s:'RN, PM, …',   f:'0.90', to:12, row:['AM','','','PM','PM','PM','','','AM','AM','','','N','N']},
  {n:'Tyler Carter',     s:'HCA, AM,…',   f:'0.70', to:12, row:['','PM','PM','','AM','AM','','N','N','','','AM','AM','']},
];

function BrowserOnlyScene() {
  const time = useTime();
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        background: "transparent",
      }}
    >
      <AppUI time={time} />
    </div>
  );
}

export default function GenerateScreenMockup() {
  return (
    <StaffProvider staff={GENERATE_STAFF}>
      <Stage width={W} height={H} duration={TL.end} background="transparent">
        <BrowserOnlyScene />
      </Stage>
    </StaffProvider>
  );
}
