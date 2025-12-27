# gpui-mono

Graphyn Design System for GPUI - a theme layer on top of [gpui-component](https://github.com/longbridge/gpui-component) featuring lavender colors, sharp edges, and flat design.

## Features

- **Lavender primary** (`#dddafb`) and accent (`#c4bff1`) colors
- **Host Grotesk** sans-serif font
- **Geist Mono** monospace font
- **Zero radius** (sharp edges)
- **No shadows** (flat design)
- Light and dark mode support

## Installation

Add to your `Cargo.toml`:

```toml
[dependencies]
gpui-mono = { git = "https://github.com/graphyn/gpui-mono" }
```

## Usage

```rust
use gpui_mono::{init_graphyn_theme, GraphynMode};

fn main() {
    App::new().run(|cx| {
        cx.open_window(WindowOptions::default(), |window, cx| {
            // Initialize Graphyn theme (dark mode)
            gpui_mono::init_graphyn_theme(window, cx, GraphynMode::Dark);

            // Your root view here
            cx.new(|_cx| MyRootView {})
        });
    });
}
```

### Custom Configuration

```rust
use gpui_mono::{init_graphyn_theme_with_config, GraphynMode, GraphynConfig};

let config = GraphynConfig {
    font_sans: "Inter".into(),      // Override sans font
    font_mono: "JetBrains Mono".into(), // Override mono font
    font_size: 14.0,                // Base font size
    radius: 4.0,                    // Add some rounding
    shadow: true,                   // Enable shadows
};

gpui_mono::init_graphyn_theme_with_config(window, cx, GraphynMode::Dark, config);
```

### Switching Themes

```rust
use gpui_mono::{set_graphyn_light, set_graphyn_dark};

// Switch to light mode
set_graphyn_light(window, cx);

// Switch to dark mode
set_graphyn_dark(window, cx);
```

## Components

All components from gpui-component are re-exported:

```rust
use gpui_mono::{Button, Input, Card, Modal, Table, List, /* ... */};
```

See [gpui-component documentation](https://github.com/longbridge/gpui-component) for the full component list.

## Color Palette

### Light Mode
| Token | Value |
|-------|-------|
| background | `#ffffff` |
| foreground | `#0a0a0a` |
| primary | `#dddafb` |
| accent | `#c4bff1` |
| muted | `#f5f5f5` |
| border | `#e5e5e5` |

### Dark Mode
| Token | Value |
|-------|-------|
| background | `#0a0a0a` |
| foreground | `#fafafa` |
| primary | `#dddafb` |
| accent | `#c4bff1` |
| muted | `#181818` |
| border | `#2b2b2b` |

## License

MIT
