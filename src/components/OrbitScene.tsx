import type { ReactNode } from "react";
import styles from "./OrbitScene.module.css";

type Tone = "metal" | "accent" | "light" | "glass";

const TONE_CLASS: Record<Tone, string> = {
  metal: styles.metalTone,
  accent: styles.accentTone,
  light: styles.lightTone,
  glass: styles.glassTone,
};

const RIBBED_BG =
  "repeating-linear-gradient(180deg, rgba(255,255,255,0.4) 0px, rgba(255,255,255,0.4) 2px, rgba(70,80,90,0.25) 2px, rgba(70,80,90,0.25) 4px)";

const THREAD_BG =
  "repeating-linear-gradient(100deg, rgba(0,0,0,0.55) 0px, rgba(0,0,0,0.55) 1px, rgba(255,255,255,0.12) 1px, rgba(255,255,255,0.12) 2px)";

function Group({ transform, children }: { transform?: string; children: ReactNode }) {
  return (
    <div className={styles.group} style={{ transform }}>
      {children}
    </div>
  );
}

// All faces are centered on the group's local (0,0,0) origin, so parts can
// be placed edge-to-edge by summing half-widths instead of guessing offsets.
function Box3D({
  w,
  h,
  d,
  tone = "metal",
  ribbed,
}: {
  w: number;
  h: number;
  d: number;
  tone?: Tone;
  ribbed?: boolean;
}) {
  const toneClass = TONE_CLASS[tone];
  const texture = ribbed ? { backgroundImage: RIBBED_BG } : undefined;
  return (
    <div className={styles.group}>
      <div
        className={`${styles.face} ${styles.faceFront} ${toneClass}`}
        style={{ width: w, height: h, left: -w / 2, top: -h / 2, transform: `translateZ(${d / 2}px)`, ...texture }}
      />
      <div
        className={`${styles.face} ${styles.faceBack} ${toneClass}`}
        style={{
          width: w,
          height: h,
          left: -w / 2,
          top: -h / 2,
          transform: `rotateY(180deg) translateZ(${d / 2}px)`,
          ...texture,
        }}
      />
      <div
        className={`${styles.face} ${styles.faceSide} ${toneClass}`}
        style={{
          width: d,
          height: h,
          left: -d / 2,
          top: -h / 2,
          transform: `rotateY(90deg) translateZ(${w / 2}px)`,
          ...texture,
        }}
      />
      <div
        className={`${styles.face} ${styles.faceSide} ${toneClass}`}
        style={{
          width: d,
          height: h,
          left: -d / 2,
          top: -h / 2,
          transform: `rotateY(-90deg) translateZ(${w / 2}px)`,
          ...texture,
        }}
      />
      <div
        className={`${styles.face} ${styles.faceTop} ${toneClass}`}
        style={{
          width: w,
          height: d,
          left: -w / 2,
          top: -d / 2,
          transform: `rotateX(90deg) translateZ(${h / 2}px)`,
        }}
      />
      <div
        className={`${styles.face} ${styles.faceBottom} ${toneClass}`}
        style={{
          width: w,
          height: d,
          left: -w / 2,
          top: -d / 2,
          transform: `rotateX(-90deg) translateZ(${h / 2}px)`,
        }}
      />
    </div>
  );
}

function HexPrism({
  radius,
  height,
  tone = "metal",
  capped = true,
}: {
  radius: number;
  height: number;
  tone?: Tone;
  capped?: boolean;
}) {
  const segments = 6;
  const segWidth = 2 * radius * Math.tan(Math.PI / segments);
  const toneClass = TONE_CLASS[tone];
  return (
    <div className={styles.group}>
      {Array.from({ length: segments }).map((_, i) => (
        <div
          key={i}
          className={`${styles.face} ${styles.faceSide} ${toneClass}`}
          style={{
            width: segWidth,
            height,
            left: -segWidth / 2,
            top: -height / 2,
            transform: `rotateY(${i * (360 / segments)}deg) translateZ(${radius}px)`,
          }}
        />
      ))}
      {capped && (
        <div
          className={`${styles.face} ${styles.faceTop} ${toneClass}`}
          style={{
            width: radius * 1.7,
            height: radius * 1.7,
            left: -radius * 0.85,
            top: -radius * 0.85,
            transform: `rotateX(90deg) translateZ(${height / 2}px)`,
            clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
          }}
        />
      )}
    </div>
  );
}

// A flat-top hex outline with a circular hole cut out of the middle (evenodd
// fill), sized in the same px box as HexPrism's own cap (radius * 1.7 square).
function hexRingClipPath(size: number, holeRadius: number) {
  const hex = [
    [0.25, 0],
    [0.75, 0],
    [1, 0.5],
    [0.75, 1],
    [0.25, 1],
    [0, 0.5],
  ]
    .map(([x, y]) => `${x * size} ${y * size}`)
    .join(" L ");

  const circleSegments = 24;
  const cx = size / 2;
  const cy = size / 2;
  const circle = Array.from({ length: circleSegments })
    .map((_, i) => {
      const t = (i / circleSegments) * Math.PI * 2;
      return `${cx + holeRadius * Math.cos(t)} ${cy + holeRadius * Math.sin(t)}`;
    })
    .join(" L ");

  return `path(evenodd, "M ${hex} Z M ${circle} Z")`;
}

function HexNut({ radius, height, tone = "accent" }: { radius: number; height: number; tone?: Tone }) {
  const capSize = radius * 1.7;
  const boreRadius = radius * 0.6;
  const boreSegments = 16;
  const boreSegWidth = 2 * boreRadius * Math.tan(Math.PI / boreSegments);
  const toneClass = TONE_CLASS[tone];
  const clip = hexRingClipPath(capSize, boreRadius);

  return (
    <div className={styles.group}>
      <HexPrism radius={radius} height={height} tone={tone} capped={false} />

      {/* threaded bore running through the nut */}
      {Array.from({ length: boreSegments }).map((_, i) => (
        <div
          key={i}
          className={`${styles.face} ${styles.faceSide} ${styles.metalTone}`}
          style={{
            width: boreSegWidth,
            height,
            left: -boreSegWidth / 2,
            top: -height / 2,
            transform: `rotateY(${i * (360 / boreSegments)}deg) translateZ(${boreRadius}px)`,
            backgroundImage: THREAD_BG,
          }}
        />
      ))}

      {/* hex ring caps, top and bottom */}
      <div
        className={`${styles.face} ${styles.faceTop} ${toneClass}`}
        style={{
          width: capSize,
          height: capSize,
          left: -capSize / 2,
          top: -capSize / 2,
          transform: `rotateX(90deg) translateZ(${height / 2}px)`,
          clipPath: clip,
        }}
      />
      <div
        className={`${styles.face} ${styles.faceBottom} ${toneClass}`}
        style={{
          width: capSize,
          height: capSize,
          left: -capSize / 2,
          top: -capSize / 2,
          transform: `rotateX(-90deg) translateZ(${height / 2}px)`,
          clipPath: clip,
        }}
      />
    </div>
  );
}

function Drum({
  radius,
  height,
  tone = "metal",
  segments = 14,
}: {
  radius: number;
  height: number;
  tone?: Tone;
  segments?: number;
}) {
  const segWidth = 2 * radius * Math.tan(Math.PI / segments);
  const toneClass = TONE_CLASS[tone];
  return (
    <div className={styles.group}>
      {Array.from({ length: segments }).map((_, i) => (
        <div
          key={i}
          className={`${styles.face} ${styles.faceSide} ${toneClass}`}
          style={{
            width: segWidth,
            height,
            left: -segWidth / 2,
            top: -height / 2,
            transform: `rotateY(${i * (360 / segments)}deg) translateZ(${radius}px)`,
          }}
        />
      ))}
      <div
        className={`${styles.face} ${styles.faceTop} ${toneClass}`}
        style={{
          width: radius * 2,
          height: radius * 2,
          left: -radius,
          top: -radius,
          borderRadius: "50%",
          transform: `rotateX(90deg) translateZ(${height / 2}px)`,
        }}
      />
      <div
        className={`${styles.face} ${styles.faceBottom} ${toneClass}`}
        style={{
          width: radius * 2,
          height: radius * 2,
          left: -radius,
          top: -radius,
          borderRadius: "50%",
          transform: `rotateX(-90deg) translateZ(${height / 2}px)`,
        }}
      />
    </div>
  );
}

function Wheel({ transform, hubDuration = "5s" }: { transform: string; hubDuration?: string }) {
  return (
    <div className={styles.wheel} style={{ transform }}>
      <div className={styles.hub} style={{ animationDuration: hubDuration }} />
    </div>
  );
}

function TruckModel() {
  // Local axes: x = length (nose at -x), y = height (down is positive), z = width.
  // A chassis frame ties the cab and cargo box together so nothing floats apart.
  const frameTopY = 10;
  const cabH = 20;
  const cargoH = 26;
  const cabCenterX = -22;
  const cabW = 18;
  const cargoCenterX = cabCenterX + cabW / 2 + 21; // touches the cab's rear face
  const cargoW = 42;

  return (
    <div className={styles.group}>
      {/* chassis frame */}
      <Group transform={`translate3d(${(cabCenterX - cabW / 2 + (cargoCenterX + cargoW / 2)) / 2}px, ${frameTopY + 2}px, 0)`}>
        <Box3D w={cargoCenterX + cargoW / 2 - (cabCenterX - cabW / 2)} h={4} d={16} tone="metal" />
      </Group>

      {/* cab, sitting on the frame */}
      <Group transform={`translate3d(${cabCenterX}px, ${frameTopY - cabH / 2}px, 0)`}>
        <Box3D w={cabW} h={cabH} d={20} tone="light" />
      </Group>
      <Group transform={`translate3d(${cabCenterX - cabW / 2 + 1}px, ${frameTopY - cabH + 5}px, 0)`}>
        <Box3D w={2} h={10} d={16} tone="glass" />
      </Group>
      <Group transform={`translate3d(${cabCenterX - cabW / 2 - 1}px, ${frameTopY - 3}px, 0)`}>
        <Box3D w={2} h={5} d={18} tone="accent" />
      </Group>

      {/* cargo box, sitting on the frame, roofline taller than the cab */}
      <Group transform={`translate3d(${cargoCenterX}px, ${frameTopY - cargoH / 2}px, 0)`}>
        <Box3D w={cargoW} h={cargoH} d={22} tone="light" ribbed />
      </Group>
      <Group transform={`translate3d(${cargoCenterX}px, ${frameTopY - 4}px, 0)`}>
        <Box3D w={cargoW} h={3} d={22.5} tone="accent" />
      </Group>

      {/* wheels */}
      <Wheel transform={`translate3d(${cabCenterX + 4}px, ${frameTopY + 8}px, 9px)`} />
      <Wheel transform={`translate3d(${cargoCenterX + cargoW / 2 - 9}px, ${frameTopY + 8}px, 10px)`} />
      <Wheel transform={`translate3d(${cargoCenterX + cargoW / 2 - 9}px, ${frameTopY + 8}px, 3px)`} />
    </div>
  );
}

function NutModel() {
  return <HexNut radius={17} height={15} tone="accent" />;
}

function DrillModel() {
  // Local axes: x = length (chuck/bit at -x), y = height (handle hangs down),
  // z = depth. Parts are chained edge-to-edge from the bit back to the body,
  // then the grip and battery hang from the body's underside.
  const bodyR = 8;
  const bodyLen = 26;
  const bodyCenterX = 0;

  const collarR = 6.5;
  const collarLen = 4;
  const collarCenterX = bodyCenterX - bodyLen / 2 - collarLen / 2;

  const chuckR = 5;
  const chuckLen = 9;
  const chuckCenterX = collarCenterX - collarLen / 2 - chuckLen / 2;

  const bitLen = 14;
  const bitCenterX = chuckCenterX - chuckLen / 2 - bitLen / 2 + 2;

  const bodyBottomY = bodyR;
  const handleX = bodyCenterX + 5;
  const handleW = 9;
  const handleH = 20;
  const handleCenterY = bodyBottomY + handleH / 2;

  const batteryH = 10;
  const batteryCenterY = bodyBottomY + handleH + batteryH / 2;

  return (
    <div className={styles.group}>
      <Group transform={`translate3d(${bitCenterX}px, 0, 0) rotateZ(90deg)`}>
        <Drum radius={1.3} height={bitLen} tone="metal" segments={6} />
      </Group>
      <Group transform={`translate3d(${chuckCenterX}px, 0, 0) rotateZ(90deg)`}>
        <Drum radius={chuckR} height={chuckLen} tone="metal" />
      </Group>
      <Group transform={`translate3d(${collarCenterX}px, 0, 0) rotateZ(90deg)`}>
        <Drum radius={collarR} height={collarLen} tone="light" />
      </Group>
      <Group transform={`translate3d(${bodyCenterX}px, 0, 0) rotateZ(90deg)`}>
        <Drum radius={bodyR} height={bodyLen} tone="accent" />
      </Group>

      {/* vent detail on top of the body */}
      <Group transform={`translate3d(${bodyCenterX - 2}px, ${-bodyR - 1}px, 0)`}>
        <Box3D w={10} h={2} d={6} tone="light" />
      </Group>

      {/* pistol grip */}
      <Group transform={`translate3d(${handleX}px, ${handleCenterY}px, 0)`}>
        <Box3D w={handleW} h={handleH} d={9} tone="metal" />
      </Group>
      <Group transform={`translate3d(${handleX - handleW / 2 - 1}px, ${bodyBottomY + 4}px, 0)`}>
        <Box3D w={2} h={6} d={5} tone="accent" />
      </Group>

      {/* battery pack */}
      <Group transform={`translate3d(${handleX}px, ${batteryCenterY}px, 0)`}>
        <Box3D w={14} h={batteryH} d={12} tone="metal" />
      </Group>
    </div>
  );
}

const ITEMS: { key: string; angle: number; spin: string; render: () => ReactNode }[] = [
  { key: "drill", angle: 0, spin: "60s", render: () => <DrillModel /> },
  { key: "nut", angle: 120, spin: "48s", render: () => <NutModel /> },
  { key: "truck", angle: 240, spin: "70s", render: () => <TruckModel /> },
];

export default function OrbitScene() {
  return (
    <div className={styles.scene} aria-hidden="true">
      <svg className={styles.guide} viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        <circle className={styles.glow} cx="200" cy="200" r="150" fill="url(#orbitGlow)" />
        <defs>
          <radialGradient id="orbitGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2596be" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#2596be" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle
          cx="200"
          cy="200"
          r="150"
          fill="none"
          stroke="#2596be"
          strokeWidth="1.5"
          strokeOpacity="0.5"
          strokeDasharray="3 10"
        />
        <circle
          cx="200"
          cy="200"
          r="60"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1"
          strokeOpacity="0.25"
          strokeDasharray="1 7"
        />
      </svg>

      <div className={styles.spinner}>
        {ITEMS.map(({ key, angle, spin, render }) => (
          <div key={key} className={styles.itemPosition} style={{ ["--angle" as string]: `${angle}deg` }}>
            <div className={styles.itemCounter}>
              <div className={styles.itemSpin} style={{ animationDuration: spin }}>
                <div className={styles.itemScale}>{render()}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
