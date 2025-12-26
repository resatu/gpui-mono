//! gpui-mono: Graphyn Design System for GPUI
//!
//! This crate extends gpui-component with the Graphyn Mono theme featuring:
//! - **Lavender primary** (#dddafb) and accent (#c4bff1) colors
//! - **Host Grotesk** sans-serif font
//! - **Geist Mono** monospace font
//! - **Zero radius** (sharp edges)
//! - **No shadows** (flat design)
//!
//! # Usage
//!
//! ```rust,ignore
//! use gpui_mono::{init_graphyn_theme, GraphynMode};
//!
//! fn main() {
//!     App::new().run(|cx| {
//!         cx.open_window(WindowOptions::default(), |window, cx| {
//!             gpui_mono::init_graphyn_theme(window, cx, GraphynMode::Dark);
//!             // ... your root view
//!         });
//!     });
//! }
//! ```

// Re-export gpui-component for convenience
pub use gpui_component::*;

use gpui::{px, App, SharedString, Window};
pub use gpui_component::theme::{Theme, ThemeMode};

/// Graphyn theme mode selector.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Default)]
pub enum GraphynMode {
    Light,
    #[default]
    Dark,
}

impl From<GraphynMode> for ThemeMode {
    fn from(mode: GraphynMode) -> Self {
        match mode {
            GraphynMode::Light => ThemeMode::Light,
            GraphynMode::Dark => ThemeMode::Dark,
        }
    }
}

/// Graphyn theme JSON (includes both light and dark).
pub const GRAPHYN_THEME_JSON: &str = include_str!("../themes/graphyn.json");

/// Legacy Zinc theme JSON for backwards compatibility.
pub const ZINC_THEME_JSON: &str = include_str!("../themes/zinc.json");

/// Get the Graphyn theme configuration as JSON.
pub fn graphyn_theme_json() -> &'static str {
    GRAPHYN_THEME_JSON
}

/// Graphyn Design System configuration.
pub struct GraphynConfig {
    /// Sans-serif font family (default: "Host Grotesk")
    pub font_sans: SharedString,
    /// Monospace font family (default: "Geist Mono")
    pub font_mono: SharedString,
    /// Base font size in pixels (default: 16.0)
    pub font_size: f32,
    /// Border radius in pixels (default: 0.0 for sharp edges)
    pub radius: f32,
    /// Enable shadows (default: false for flat design)
    pub shadow: bool,
}

impl Default for GraphynConfig {
    fn default() -> Self {
        Self {
            font_sans: "Host Grotesk".into(),
            font_mono: "Geist Mono".into(),
            font_size: 16.0,
            radius: 0.0,
            shadow: false,
        }
    }
}

/// Initialize the Graphyn theme with default configuration.
///
/// This sets up gpui-component's theme system with:
/// - Lavender primary/accent colors
/// - Host Grotesk font
/// - Zero radius (sharp edges)
/// - No shadows (flat design)
pub fn init_graphyn_theme(window: &mut Window, cx: &mut App, mode: GraphynMode) {
    init_graphyn_theme_with_config(window, cx, mode, GraphynConfig::default());
}

/// Initialize the Graphyn theme with custom configuration.
pub fn init_graphyn_theme_with_config(
    window: &mut Window,
    cx: &mut App,
    mode: GraphynMode,
    config: GraphynConfig,
) {
    // Initialize gpui-component's theme system
    gpui_component::init(cx);

    // Set the theme mode first (this ensures global Theme exists)
    let theme_mode: ThemeMode = mode.into();
    Theme::change(theme_mode, Some(window), cx);

    // Apply Graphyn design tokens
    let theme = cx.global_mut::<Theme>();
    theme.font_family = config.font_sans;
    theme.mono_font_family = config.font_mono;
    theme.font_size = px(config.font_size);
    theme.radius = px(config.radius);
    theme.radius_lg = px(config.radius);
    theme.shadow = config.shadow;
}

/// Switch to Graphyn Light theme.
pub fn set_graphyn_light(window: &mut Window, cx: &mut App) {
    Theme::change(ThemeMode::Light, Some(window), cx);
}

/// Switch to Graphyn Dark theme.
pub fn set_graphyn_dark(window: &mut Window, cx: &mut App) {
    Theme::change(ThemeMode::Dark, Some(window), cx);
}

// Legacy aliases for backwards compatibility
pub use GraphynMode as ZincMode;

/// Legacy: Initialize the Zinc theme (now uses Graphyn).
#[deprecated(since = "0.2.0", note = "Use init_graphyn_theme instead")]
pub fn init_zinc_theme(window: &mut Window, cx: &mut App, mode: ZincMode) {
    init_graphyn_theme(window, cx, mode);
}

/// Legacy: Get Zinc theme JSON.
#[deprecated(since = "0.2.0", note = "Use graphyn_theme_json instead")]
pub fn zinc_theme_json() -> &'static str {
    ZINC_THEME_JSON
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_graphyn_mode_conversion() {
        assert_eq!(ThemeMode::from(GraphynMode::Light), ThemeMode::Light);
        assert_eq!(ThemeMode::from(GraphynMode::Dark), ThemeMode::Dark);
    }

    #[test]
    fn test_default_config() {
        let config = GraphynConfig::default();
        assert_eq!(config.font_sans.as_ref(), "Host Grotesk");
        assert_eq!(config.font_mono.as_ref(), "Geist Mono");
        assert_eq!(config.font_size, 16.0);
        assert_eq!(config.radius, 0.0);
        assert!(!config.shadow);
    }
}
