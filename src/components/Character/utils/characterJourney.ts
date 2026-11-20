/**
 * Character scroll journey (desktop only)
 * ---------------------------------------
 * What I Do  -> he jumps off the chair (the desk scrolls away)
 * Experience -> he grabs the glowing timeline line and slides down with it
 * (leaves)   -> lets go and drops out of view
 * Contact    -> drops in and stands beside the Contact section
 *
 * Everything is driven by where the sections are on screen, so scrolling back
 * up plays it in reverse. Before the jump nothing here touches the character,
 * so the landing / scan / about parts behave exactly as before.
 *
 * To switch the whole feature off, set CHARACTER_JOURNEY to false.
 */
import * as THREE from "three";

export const CHARACTER_JOURNEY = true;

type Rot = [number, number, number]; // euler offset (radians) from rest pose
type Pose = Record<string, Rot>;

const FINGERS = ["index", "middle", "ring", "pinky"];
/** a = 0 open hand … 1 tight fist (thumb wraps too) */
const fist = (side: "L" | "R", a: number): Pose => {
  const p: Pose = {};
  FINGERS.forEach((f) => {
    p[`f_${f}01${side}`] = [1.45 * a, 0, 0];
    p[`f_${f}02${side}`] = [1.65 * a, 0, 0];
    p[`f_${f}03${side}`] = [1.2 * a, 0, 0];
  });
  p[`thumb02${side}`] = [0.6 * a, 0, 0];
  p[`thumb03${side}`] = [0.8 * a, 0, 0];
  return p;
};

/** Body bones this module takes over while the journey is running */
const BODY_BONES = [
  "spine", "spine001", "spine002", "spine003", "spine005", "spine006",
  "shoulderL", "shoulderR", "upper_armL", "upper_armR", "forearmL", "forearmR",
  "handL", "handR", "thighL", "thighR", "shinL", "shinR", "footL", "footR",
];

// Axes (found by testing): rest pose is a T-pose.
// upper_arm x: + raises / - lowers · thigh x: - forward · shin x: + bends knee · spine x: + leans forward
export const POSES: Record<string, Pose> = {
  // relaxed: arms down, palms turned in towards the legs, fingers softly curled
  stand: {
    upper_armL: [-1.55, 0, 0],
    upper_armR: [-1.55, 0, 0],
    forearmL: [0.12, -1.3, 0],
    forearmR: [0.12, 1.3, 0],
    ...fist("L", 0.15),
    ...fist("R", 0.15),
  },
  crouch: {
    spine001: [0.35, 0, 0],
    spine002: [0.15, 0, 0],
    upper_armL: [-1.1, 0, 0],
    upper_armR: [-1.1, 0, 0],
    forearmL: [0.5, 0, 0],
    forearmR: [0.5, 0, 0],
    thighL: [-1.15, 0, 0],
    thighR: [-1.15, 0, 0],
    shinL: [1.8, 0, 0],
    shinR: [1.8, 0, 0],
    footL: [-0.5, 0, 0],
    footR: [-0.5, 0, 0],
  },
  air: {
    spine001: [0.1, 0, 0],
    upper_armL: [1.6, 0, 0],
    upper_armR: [1.6, 0, 0],
    forearmL: [0.25, 0, 0],
    forearmR: [0.25, 0, 0],
    thighL: [-1.0, 0, 0],
    thighR: [-0.55, 0, 0],
    shinL: [1.5, 0, 0],
    shinR: [1.0, 0, 0],
    ...fist("L", 0.25),
    ...fist("R", 0.25),
  },
  hang: {
    spine001: [-0.04, 0, 0],
    spine005: [-0.25, 0, 0],
    upper_armL: [1.85, 0, 0],
    upper_armR: [1.85, 0, 0],
    forearmL: [0.05, 0, 0],
    forearmR: [0.05, 0, 0],
    thighL: [-0.4, 0, 0.04],
    thighR: [-0.12, 0, -0.04],
    shinL: [0.7, 0, 0],
    shinR: [0.3, 0, 0],
    ...fist("L", 1),
    ...fist("R", 1),
  },
  // abseiling down a cliff: leaning back, feet out on the "wall",
  // right hand high on the rope, left (brake) hand at the hip
  rappel: {
    spine001: [0.05, 0, 0],
    spine002: [0.04, 0, 0],
    spine005: [-0.1, 0, 0], // head up, looking ahead
    upper_armR: [1.5, 0, 0],
    forearmR: [0.15, 0, 0],
    upper_armL: [-1.15, 0, 0],
    forearmL: [1.25, 0, 0],
    thighL: [0.2, 0, 0.05], // this leg hangs a little back, knee folded
    thighR: [-1.5, 0, -0.05], // this one stays out against the "cliff"
    shinL: [0.95, 0, 0],
    shinR: [0.45, 0, 0],
    footL: [-0.1, 0, 0],
    footR: [-0.3, 0, 0],
    ...fist("L", 1),
    ...fist("R", 1),
  },
  // knees bent, about to push off the wall again
  rappelPush: {
    spine001: [0.12, 0, 0],
    spine002: [0.06, 0, 0],
    spine005: [-0.05, 0, 0],
    upper_armR: [1.45, 0, 0],
    forearmR: [0.3, 0, 0],
    upper_armL: [-1.1, 0, 0],
    forearmL: [1.35, 0, 0],
    thighL: [0.1, 0, 0.05],
    thighR: [-1.8, 0, -0.05],
    shinL: [1.15, 0, 0],
    shinR: [1.5, 0, 0],
    footL: [-0.5, 0, 0],
    footR: [-0.5, 0, 0],
    ...fist("L", 1),
    ...fist("R", 1),
  },
};

/**
 * Folded arms at Contact. Each arm bone is aimed along a direction in the
 * character's own frame (x = his left, y = up, z = towards the viewer).
 */
type Vec = [number, number, number];
export const FOLD: { aim: Record<string, Vec>; fingersL: number; fingersR: number } = {
  aim: {
    upper_armL: [0.3, -0.8, 0.42],
    forearmL: [-0.92, 0.22, 0.35], // front forearm
    handL: [-0.5, 0.1, -0.85], // tucked behind the other arm
    upper_armR: [-0.3, -0.8, 0.38],
    forearmR: [0.88, 0.12, 0.28], // back forearm
    handR: [0.85, 0.3, -0.35], // fingers resting over the front arm
  },
  fingersL: 0.5,
  fingersR: 0.6,
};

// ── tuning ──
export const TUNE = {
  hangScale: 0.28, // size while on the timeline line (small)
  rappelYaw: 1.1, // turn so the lean-back is visible
  rappelLean: -0.05, // hangs straight down under the hand
  hopPx: 140, // scroll distance per hop down the "cliff"
  standScale: 0.5, // size beside Contact
};
const DESK_FLY = 40; // how far (world units) the desk scrolls away

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (t: number) => t * t * (3 - 2 * t);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export type Journey = {
  /** call every frame after mixer.update(); returns false when nothing needs rendering */
  update: (time: number) => boolean;
};

export function createJourney(
  scene: THREE.Object3D,
  camera: THREE.PerspectiveCamera,
  canvas: HTMLCanvasElement
): Journey | null {
  if (!CHARACTER_JOURNEY) return null;
  const rig = scene.getObjectByName("metarig002") || scene.getObjectByName("metarig.002");
  if (!rig) return null;

  // rest pose of every bone we may touch
  const bones = new Map<string, THREE.Bone>();
  const rest = new Map<string, THREE.Quaternion>();
  const restSpinePos = new THREE.Vector3();
  const wanted = new Set<string>(BODY_BONES);
  Object.values(POSES).forEach((p) => Object.keys(p).forEach((k) => wanted.add(k)));
  wanted.forEach((name) => {
    const b = rig.getObjectByName(name) as THREE.Bone | undefined;
    if (b) {
      bones.set(name, b);
      rest.set(name, b.quaternion.clone());
    }
  });
  const spine = bones.get("spine");
  if (spine) restSpinePos.copy(spine.position);

  // desk, monitor, keyboard, chair… = everything in the scene that isn't the body
  const desk = scene.children.filter((o) => o !== rig);
  const deskBaseY = desk.map((o) => o.position.y);

  const poseQ = (pose: string, name: string, out: THREE.Quaternion) => {
    const r = rest.get(name)!;
    const off = POSES[pose]?.[name];
    out.copy(r);
    if (off) out.multiply(tmpQ.setFromEuler(tmpE.set(off[0], off[1], off[2])));
    return out;
  };
  const tmpQ = new THREE.Quaternion();
  const tmpE = new THREE.Euler();
  const qa = new THREE.Quaternion();
  const qb = new THREE.Quaternion();

  /** blend body from the animation (weight 0) to poseA→poseB mix (weight 1) */
  const applyPose = (a: string, b: string, t: number, w: number) => {
    bones.forEach((bone, name) => {
      poseQ(a, name, qa);
      poseQ(b, name, qb);
      qa.slerp(qb, t);
      bone.quaternion.slerp(qa, w);
    });
    if (spine) spine.position.lerp(restSpinePos, w);
  };

  // The animation doesn't rewrite every bone each frame, so remember its pose
  // ("base") and put it back exactly whenever we stop overriding a bone.
  const base = new Map<string, THREE.Quaternion>();
  const written = new Map<string, THREE.Quaternion>();
  const baseSpinePos = new THREE.Vector3();
  const writtenSpinePos = new THREE.Vector3();
  bones.forEach((_, n) => {
    base.set(n, new THREE.Quaternion());
    written.set(n, new THREE.Quaternion());
  });
  const snapshotBase = () => {
    bones.forEach((b, n) => base.get(n)!.copy(b.quaternion));
    if (spine) baseSpinePos.copy(spine.position);
  };
  /** start of a frame: refresh the base from the animation, or restore it */
  const beginPose = () => {
    bones.forEach((b, n) => {
      if (b.quaternion.equals(written.get(n)!)) b.quaternion.copy(base.get(n)!);
      else base.get(n)!.copy(b.quaternion);
    });
    if (spine) {
      if (spine.position.equals(writtenSpinePos)) spine.position.copy(baseSpinePos);
      else baseSpinePos.copy(spine.position);
    }
  };
  const endPose = () => {
    bones.forEach((b, n) => written.get(n)!.copy(b.quaternion));
    if (spine) writtenSpinePos.copy(spine.position);
  };
  const restoreBase = () => {
    bones.forEach((b, n) => {
      if (b.quaternion.equals(written.get(n)!)) b.quaternion.copy(base.get(n)!);
    });
    if (spine && spine.position.equals(writtenSpinePos)) spine.position.copy(baseSpinePos);
  };

  // point a bone (its +Y axis) along a direction given in the rig's frame
  const aimQ = new THREE.Quaternion();
  const pQ = new THREE.Quaternion();
  const bQ = new THREE.Quaternion();
  const rigQ = new THREE.Quaternion();
  const axis = new THREE.Vector3();
  const want = new THREE.Vector3();
  const aimBone = (name: string, dir: Vec, w: number) => {
    const b = bones.get(name);
    if (!b || !b.parent || w <= 0) return;
    b.parent.updateWorldMatrix(true, false);
    b.parent.getWorldQuaternion(pQ);
    bQ.copy(pQ).multiply(b.quaternion); // bone world rotation
    axis.set(0, 1, 0).applyQuaternion(bQ);
    rig.getWorldQuaternion(rigQ);
    want.set(dir[0], dir[1], dir[2]).normalize().applyQuaternion(rigQ);
    aimQ.setFromUnitVectors(axis, want).multiply(bQ); // new world rotation
    aimQ.premultiply(pQ.invert()); // back to parent space
    b.quaternion.slerp(aimQ, w);
    b.updateMatrixWorld(true);
  };
  const foldArms = (w: number) => {
    if (w <= 0) return;
    rig.updateMatrixWorld(true);
    ["L", "R"].forEach((side) => {
      ["upper_arm", "forearm", "hand"].forEach((part) => {
        const n = part + side;
        aimBone(n, FOLD.aim[n], w);
      });
    });
    // fingers wrap around the other arm
    const grip = fist("L", FOLD.fingersL);
    Object.assign(grip, fist("R", FOLD.fingersR));
    Object.entries(grip).forEach(([n, r]) => {
      const b = bones.get(n);
      if (!b) return;
      qa.copy(rest.get(n)!).multiply(tmpQ.setFromEuler(tmpE.set(r[0], r[1], r[2])));
      b.quaternion.slerp(qa, w);
    });
  };

  const v1 = new THREE.Vector3();
  const v2 = new THREE.Vector3();
  const rectOf = canvas.getBoundingClientRect.bind(canvas);

  /** where (in the rig's parent space) the rig must sit so the anchor bones land on screen point (sx, sy) */
  const solveAnchor = (names: string[], sx: number, sy: number, out: THREE.Vector3) => {
    rig.position.set(0, 0, 0);
    rig.updateMatrixWorld(true);
    v1.set(0, 0, 0);
    names.forEach((n) => v1.add(bones.get(n)!.getWorldPosition(v2)));
    v1.divideScalar(names.length); // anchor (world)
    const cr = rectOf();
    const ndc = v2.copy(v1).project(camera);
    ndc.x = ((sx - cr.left) / cr.width) * 2 - 1;
    ndc.y = -((sy - cr.top) / cr.height) * 2 + 1;
    const target = ndc.unproject(camera); // same depth as the anchor
    const rigWorld = rig.getWorldPosition(new THREE.Vector3());
    rigWorld.add(target.sub(v1));
    out.copy(rig.parent!.worldToLocal(rigWorld));
    return out;
  };

  const faceQ = new THREE.Quaternion();
  const parentQ = new THREE.Quaternion();
  const ident = new THREE.Quaternion();
  /** rotate the rig so it faces the camera (undoing the scene's scroll rotation) */
  const setFacing = (w: number, sway: number, yaw = 0, lean = 0) => {
    rig.parent!.getWorldQuaternion(parentQ).invert();
    const dbgYaw = import.meta.env.DEV ? (window as any).__journeyYaw || 0 : 0;
    faceQ.setFromEuler(tmpE.set(-lean, yaw + dbgYaw, sway, "YXZ")).premultiply(parentQ);
    rig.quaternion.copy(ident).slerp(faceQ, w);
  };

  const q = (s: string) => document.querySelector(s) as HTMLElement | null;
  const hangPos = new THREE.Vector3();
  const standPos = new THREE.Vector3();
  const ropePos = new THREE.Vector3();
  let active = false;
  let hiddenFrames = 0;
  let onRope = 0;
  let hopNow = 0;
  const textRange = document.createRange();

  const reset = () => {
    if (!active) return;
    active = false;
    rig.visible = true;
    rig.position.set(0, 0, 0);
    rig.quaternion.identity();
    rig.scale.setScalar(1);
    desk.forEach((o, i) => (o.position.y = deskBaseY[i]));
    restoreBase(); // body back to exactly what the animation had
  };

  const update = (time: number) => {
    const what = q(".whatIDO");
    const info = q(".career-info");
    const dot = q(".career-dot");
    const contact = q(".contact-section");
    if (window.innerWidth <= 1024 || !what || !info || !dot || !contact) {
      reset();
      return true;
    }
    const vh = window.innerHeight;
    const vw = window.innerWidth;
    const wr = what.getBoundingClientRect();
    const ir = info.getBoundingClientRect();
    const dr = dot.getBoundingClientRect();
    const cr = contact.getBoundingClientRect();

    const jumpT = clamp01((vh * 0.85 - wr.bottom) / (vh * 0.6));
    const releaseT = clamp01((vh * 0.55 - ir.bottom) / (vh * 0.45));
    // Contact is the last section: measure from its bottom so the landing
    // finishes exactly when the page reaches the end
    const landT = clamp01((vh * 1.5 - cr.bottom) / (vh * 0.5));

    if (jumpT <= 0) {
      reset();
      return true;
    }
    if (!active) snapshotBase();
    else beginPose();
    active = true;

    // the desk scrolls away with the page
    const fly = smooth(clamp01(jumpT * 1.4)) * DESK_FLY;
    desk.forEach((o, i) => (o.position.y = deskBaseY[i] + fly));

    // between the line and Contact he is off screen: skip rendering
    if (releaseT >= 1 && landT <= 0) {
      rig.visible = false;
      restoreBase();
      endPose();
      hiddenFrames++;
      return hiddenFrames <= 2; // draw a couple of empty frames, then idle
    }
    hiddenFrames = 0;
    rig.visible = true;

    if (landT > 0) {
      // ── Contact: drop in from above and stand beside the CONTACT heading ──
      const t = smooth(landT);
      const fall = clamp01(landT / 0.7);
      // in the air while falling, knees soak up the landing, then stand
      if (landT < 0.7) applyPose("air", "air", 0, 1);
      else if (landT < 0.82) applyPose("air", "crouch", smooth((landT - 0.7) / 0.12) * 0.6, 1);
      else applyPose("crouch", "stand", 0.4 + 0.6 * smooth((landT - 0.82) / 0.18), 1);
      setFacing(1, 0);
      rig.scale.setScalar(TUNE.standScale);
      // once he's landed, he folds his arms
      foldArms(smooth(clamp01((landT - 0.86) / 0.14)));
      endPose();
      // right edge of the CONTACT word itself (the h3 box is full width)
      const heading = contact.querySelector("h3");
      let hr: DOMRect = cr;
      if (heading) {
        textRange.selectNodeContents(heading);
        hr = textRange.getBoundingClientRect();
      }
      const flex = contact.querySelector(".contact-flex");
      const fr = flex ? flex.getBoundingClientRect() : cr;
      const sx = Math.min(hr.right + vw * 0.07, vw * 0.8);
      const feetY = Math.min(fr.bottom, vh - 40);
      const sy = lerp(-vh * 0.1, feetY, fall * fall);
      solveAnchor(["footL", "footR"], sx, sy, standPos);
      rig.position.copy(standPos);
      rig.rotation.z += (1 - t) * 0.12;
      return true;
    }

    // ── jump off the chair, then hang on the timeline dot ──
    const f = smooth(jumpT);
    if (jumpT < 0.3) applyPose("crouch", "crouch", 0, jumpT / 0.3);
    else if (jumpT < 0.7) applyPose("crouch", "air", smooth((jumpT - 0.3) / 0.4), 1);
    else {
      // on the rope: hop down it like abseiling, driven by the scroll
      const hop = Math.abs(Math.sin((ir.top / TUNE.hopPx) * Math.PI)); // 0 = feet on wall
      applyPose("air", "rappel", smooth((jumpT - 0.7) / 0.3), 1);
      if (jumpT >= 1) applyPose("rappelPush", "rappel", hop, 1);
      onRope = smooth((jumpT - 0.7) / 0.3);
      hopNow = hop;
    }
    if (jumpT < 0.7) onRope = 0;

    if (releaseT > 0) applyPose("rappel", "air", smooth(releaseT), 1);
    endPose();

    const sway = Math.sin(time * 1.4) * 0.03 * f * (1 - releaseT);
    const k = onRope * (1 - releaseT);
    setFacing(f, sway, TUNE.rappelYaw * k, (TUNE.rappelLean + 0.06 * hopNow) * k);
    rig.scale.setScalar(lerp(1, TUNE.hangScale, f));

    // top hand holds the line just above the glowing dot (follows it exactly)
    const hx = dr.left + dr.width / 2;
    let hy = dr.top + dr.height / 2 - 14;
    hy += smooth(releaseT) * vh * 1.3; // let go → falls out of view
    solveAnchor(["handL", "handR"], hx, hy, hangPos);
    if (k > 0) hangPos.lerp(solveAnchor(["handR"], hx, hy, ropePos), k);

    // leap: from the chair (0,0,0) to the line, with an arc
    rig.position.copy(hangPos).multiplyScalar(f);
    rig.position.y += Math.sin(Math.PI * clamp01(jumpT * 1.15)) * 4 * (1 - releaseT);
    return true;
  };

  if (import.meta.env.DEV) (window as any).__journey = { POSES, TUNE, FOLD, rig, bones, camera };
  return { update };
}
