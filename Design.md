# UI Design System: Hyrox-Inspired Gym Display & Admin System

## 1. Visual Theme & Atmosphere

The user experience is built to replicate the raw, high-octane energy of a stadium-level fitness competition. Unlike clean corporate apps or subtle dark modes, this interface utilizes a rugged, unapologetic warehouse aesthetic. The background is a pitch-black void (`#020202`) to completely eliminate screen glare on cheap TV monitors and focus every ounce of athlete attention on the numbers that matter.

Typography is the absolute centerpiece. Massive, condensed, hyper-industrial display lettering dominates the viewport. The numbers don't just sit on the screen; they feel structural, ticking away with aggressive urgency. High-intensity neon accents break through the darkness—a piercing neon yellow-green (`#CCFF00`) for active, running clocks, and a warning combustion-orange (`#FF4500`) for rest periods and hard stops.

The entire visual system is optimized for high legibility from 30+ feet away across a loud, sweat-drenched, poorly lit functional fitness floor. Every card edge is sharp, every layout grid is solid, and every metric is uppercase.

**Key Characteristics:**

- Pitch Black (`#020202`) base canvas to maximize hardware screen contrast and eliminate glare.
- Heavy, industrial, condensed sans-serif typography (`Impact` / `Oswald`) designed for long-distance readability.
- High-visibility Neon Yellow (`#CCFF00`) as the primary active state indicator.
- Combustion Orange (`#FF4500`) for high-priority alerts, rest intervals, and countdown thresholds.
- Absolute sharp, zero-radius, or micro-fractured corners—no pill buttons or soft UI elements on the workout display.
- High-contrast tabular numeric styling to prevent layout jittering while timers tick.

---

## 2. Color Palette & Roles

### Primary & Status

- **Pitch Black** (`#020202`): Primary background void. Absorbs ambient light and amplifies screen longevity on low-end displays.
- **Pure White** (`#FFFFFF`): Primary typographic data, active time metrics, and high-priority headers.
- **Active Neon** (`#CCFF00`): The "GO" state. Running timers, current interval indicators, and active station highlights.
- **Alert Orange** (`#FF4500`): The "STOP/REST" state. Warning zones, final 10-second countdown buffers, and rest intervals.

### Secondary & Surface

- **Iron Gray** (`#121212`): Elevated surface card panels, layout containers, and distinct station block backgrounds.
- **Steel Trim** (`#262626`): Structural borders, grid divisions, and deactivated state elements.
- **Muted Dust** (`#8E8E93`): Unit labels (e.g., _METER_, _RPM_, _SEC_), secondary table rows, and minor metadata.

---

## 3. Typography Rules

### Font Family

- **Display / Timers**: `Impact`, `Oswald`, or `Archivo Black`. Must support hyper-heavy weights and compressed character widths. (Fallback: `Arial Black`, `sans-serif-condensed`).
- **Data / Admin UI**: `Inter` or `Roboto`. Utilized for clear numerical tables, forms, and backend coach dashboards.
- **Monospace Metrics**: `Courier New` or `JetBrains Mono` for micro-clocks to guarantee perfect fixed-width digit alignment.

### Hierarchy

| Role                   | Font      | Size        | Weight | Line Height | Letter Spacing | Case      | Notes                      |
| :--------------------- | :-------- | :---------- | :----- | :---------- | :------------- | :-------- | :------------------------- |
| **TV Giant Timer**     | Display   | 16rem–22rem | 900    | 0.80        | -0.05em        | Uppercase | tabular-nums enabled       |
| **Station Huge Title** | Display   | 5.5rem      | 800    | 0.90        | Normal         | Uppercase | Visible from entrance      |
| **Leaderboard Name**   | Data      | 2.5rem      | 700    | 1.10        | +0.02em        | Uppercase | High-contrast data row     |
| **Admin Button Text**  | Data      | 1.5rem      | 800    | 1.00        | +0.05em        | Uppercase | Big touch target label     |
| **Metadata Label**     | Monospace | 1.1rem      | 500    | 1.20        | +0.10em        | Uppercase | For labels like "INTERVAL" |

### Principles

- **Tabular Numerics Only**: Any component rendering ticking clocks _must_ employ `font-variant-numeric: tabular-nums`. This prevents digits from jumping and shifting the screen layout horizontally as numbers change.
- **Extreme Density**: Text elements within headers should use ultra-tight line heights (`0.80` to `1.00`) to stack information aggressively without wasting screen space.
- **Uppercase Mandate**: All workout labels, athlete names, and operational instructions are forced to uppercase to maintain structural consistency.

---

## 4. Component Stylings

### Action Blocks (Admin Controller)

- **The "FIRE" Button (Start)**: Solid `#CCFF00` background, pure black text. Minimum height `72px` for flawless thumb-targeting while a coach is moving.
- **The "KILL" Button (Reset)**: Solid `#FF4500` background or heavy `#FF4500` outline. Kept physically separated from the Start/Pause keys to avoid accidental catastrophic triggers.
- **Control States**: Active buttons glow using an intense CSS drop shadow: `box-shadow: 0 0 25px rgba(204, 255, 0, 0.4)`.

### Grid Panels & Display Blocks (Fire TV View)

- **The Block Container**: Background `#121212`, entirely sharp corners (`border-radius: 0px`), bordered by a 2px `#262626` outline.
- **Active Track Highlight**: When a station or interval is live, the entire block gains an aggressive left border: `border-l-8 solid #CCFF00`.
- **Alternating Lists**: Leaderboards or workout lists use clean `#121212` and `#0A0A0A` splits to help coaches scan lanes effortlessly.

### Inputs & Configurations (Admin Panel)

- **Time Inputs**: Large-format text entry blocks with dark `#121212` fills and precise `#262626` borders. On focus, they shift instantly to an explicit `#CCFF00` solid border wrapper.

---

## 5. Layout Principles

### Spacing System

- **Base Grid**: Strict `8px` geometric scale.
- **Outer Margins**: A hard **5% safety margin** padding is applied to the main layout screen container (`p-10` or `p-12`). This natively protects elements from severe Fire TV hardware overscan cropping.
- **Visual Pauses**: Whitespace is intentionally left completely empty as absolute black void space, framing the bright glowing text blocks cleanly.

### Structural Blueprints

+-------------------------------------------------------------------------+
| [ ZONE A: ACTIVE STAGE ] [ ZONE B: UP NEXT ] |
| WORKOUT 04: AMRAP EMOM SHIFT STATION 5: WALL BALLS|
| |
| |
| 18:42.5 |
| |
| |
| +------------------------------------+ +------------------------------+ |
| | CAPTAIN ATHLETE LANE | | INTERVAL TRACKER | |
| | 1. MILLER . . . . . . . . ST. 4 | | ROUND 4 / 8 | |
| | 2. GARRISON . . . . . . . ST. 2 | | WORK: 01:45 | REST: 00:30 | |
| +------------------------------------+ +------------------------------+ |
+-------------------------------------------------------------------------+

---

## 6. Depth & Elevation

Traditional smooth blur-shadows are entirely avoided. Elevation in this system is conveyed via stark outline borders and high-energy color highlights.

| Level       | Background | Border Treatment    | System Use Case                                           |
| :---------- | :--------- | :------------------ | :-------------------------------------------------------- |
| **Level 0** | `#020202`  | None                | Base global background void canvas.                       |
| **Level 1** | `#121212`  | `1px solid #262626` | Standard structural panels, static leaderboards.          |
| **Level 2** | `#121212`  | `2px solid #CCFF00` | Active live blocks, running timers, current intervals.    |
| **Level 3** | `#121212`  | `4px solid #FF4500` | Emergency stop, terminal countdown screens, rest buffers. |

---

## 7. Do's and Don'ts

### Do

- Ensure the background is absolute pitch black (`#020202`) to ensure maximum screen contrast in bright gyms.
- Enforce `font-variant-numeric: tabular-nums` across every single clock component.
- Keep every edge perfectly sharp (`rounded-none`).
- Reserve Neon Yellow (`#CCFF00`) strictly for active operational states.
- Force all typography to uppercase layout transforms across display tracks.
- Place critical numbers comfortably away from screen edges to account for Fire OS overscan limitations.

### Don't

- Use gradient blends or smooth background color shifts.
- Use soft, rounded pill buttons or curved container blocks.
- Introduce extraneous styling colors like soft blues, purples, or lifestyle pastel colors.
- Allow text sizes to drop below standard legibility ranges on the `/display` route.
- Allow the screen to shift or reflow dynamically when a clock tracking state resets.

---

## 8. Agent Prompt Guide

### Quick Color Reference

- **Void Canvas Base**: `#020202`
- **Active Running Value**: `#CCFF00`
- **Stop / Warning Break**: `#FF4500`
- **Card Panel Base**: `#121212`
- **Text Heavy Value**: `#FFFFFF`

### Example Component Prompts

- `"Create a real-time gym stopwatch viewport layout over a flat #020202 canvas featuring an unrounded, blocky timer displaying 00:00.00 using Impact text at 18rem in color #CCFF00 with tabular numbers enforced."`
- `"Design an admin tracking dashboard tile element built inside a strict sharp border-none block on a #121212 background, showing a left accent margin border of 8px in color #FF4500 and capitalized Inter labels."`
- `"Build a massive responsive workout schedule row with alternating block layers of #1212
