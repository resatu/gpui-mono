import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { 
  Terminal, 
  Copy, 
  Check, 
  Layout,
  Type,
  MousePointer2,
  Box,
  Component,
  Menu,
  Moon,
  Sun,
  Search,
  ChevronRight,
  FolderTree,
  FileCode,
  FileJson,
  FileText
} from "lucide-react";

// --- RUST CRATE IMPLEMENTATION ---

const FILES: Record<string, string> = {
  "Cargo.toml": `[package]
name = "gpui-mono"
version = "0.1.0"
edition = "2021"
description = "Graphyn Design System for GPUI"
license = "MIT"

[dependencies]
gpui = { git = "https://github.com/zed-industries/zed", branch = "main" }
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"

[features]
default = []
embedded-fonts = []`,

  "themes/zinc-light.json": `{
  "name": "Zinc Light",
  "appearance": "light",
  "colors": {
    "background": "#ffffff",
    "foreground": "#09090b",
    "card": "#ffffff",
    "card_foreground": "#09090b",
    "popover": "#ffffff",
    "popover_foreground": "#09090b",
    "primary": "#18181b",
    "primary_foreground": "#fafafa",
    "secondary": "#f4f4f5",
    "secondary_foreground": "#18181b",
    "muted": "#f4f4f5",
    "muted_foreground": "#71717a",
    "accent": "#f4f4f5",
    "accent_foreground": "#18181b",
    "destructive": "#ef4444",
    "destructive_foreground": "#fafafa",
    "border": "#e4e4e7",
    "input": "#e4e4e7",
    "ring": "#18181b"
  },
  "radius": 6.0
}`,

  "themes/zinc-dark.json": `{
  "name": "Zinc Dark",
  "appearance": "dark",
  "colors": {
    "background": "#09090b",
    "foreground": "#fafafa",
    "card": "#09090b",
    "card_foreground": "#fafafa",
    "popover": "#09090b",
    "popover_foreground": "#fafafa",
    "primary": "#fafafa",
    "primary_foreground": "#18181b",
    "secondary": "#27272a",
    "secondary_foreground": "#fafafa",
    "muted": "#27272a",
    "muted_foreground": "#a1a1aa",
    "accent": "#27272a",
    "accent_foreground": "#fafafa",
    "destructive": "#7f1d1d",
    "destructive_foreground": "#fafafa",
    "border": "#27272a",
    "input": "#27272a",
    "ring": "#d4d4d8"
  },
  "radius": 6.0
}`,

  "src/lib.rs": `pub mod theme;
pub mod components;

pub use theme::{Theme, ThemeColors, ThemeRadius, ThemeMode};
pub use components::*;

use gpui::AppContext;

pub fn init(cx: &mut AppContext) {
    theme::init(cx);
}`,

  "src/theme/mod.rs": `mod colors;
mod radius;

pub use colors::ThemeColors;
pub use radius::ThemeRadius;

use gpui::{AppContext, Global};
use serde::Deserialize;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum ThemeMode {
    Light,
    Dark,
    System,
}

#[derive(Debug, Clone)]
pub struct Theme {
    pub name: String,
    pub appearance: String,
    pub colors: ThemeColors,
    pub radius: ThemeRadius,
}

#[derive(Debug, Deserialize)]
struct RawTheme {
    name: String,
    appearance: String,
    colors: serde_json::Value,
    radius: f32,
}

impl Global for Theme {}

impl Theme {
    pub fn zinc_light() -> Self {
        Self::from_json(include_str!("../../themes/zinc-light.json"))
    }

    pub fn zinc_dark() -> Self {
        Self::from_json(include_str!("../../themes/zinc-dark.json"))
    }

    pub fn from_json(json: &str) -> Self {
        let raw: RawTheme = serde_json::from_str(json).expect("Invalid theme JSON");
        let colors: ThemeColors = serde_json::from_value(raw.colors).expect("Invalid colors");
        
        Self {
            name: raw.name,
            appearance: raw.appearance,
            colors,
            radius: ThemeRadius::from_base(raw.radius),
        }
    }

    pub fn is_dark(&self) -> bool {
        self.appearance == "dark"
    }
}

pub fn init(cx: &mut AppContext) {
    cx.set_global(Theme::zinc_dark());
}

pub fn set_theme(theme: Theme, cx: &mut AppContext) {
    cx.set_global(theme);
}

pub fn set_mode(mode: ThemeMode, cx: &mut AppContext) {
    let theme = match mode {
        ThemeMode::Light => Theme::zinc_light(),
        ThemeMode::Dark => Theme::zinc_dark(),
        ThemeMode::System => {
            // TODO: detect system preference
            Theme::zinc_dark()
        }
    };
    cx.set_global(theme);
}

pub fn current(cx: &AppContext) -> &Theme {
    cx.global::<Theme>()
}`,

  "src/theme/colors.rs": `use gpui::Hsla;
use serde::Deserialize;

#[derive(Debug, Clone, Deserialize)]
pub struct ThemeColors {
    pub background: Hsla,
    pub foreground: Hsla,
    pub card: Hsla,
    pub card_foreground: Hsla,
    pub popover: Hsla,
    pub popover_foreground: Hsla,
    pub primary: Hsla,
    pub primary_foreground: Hsla,
    pub secondary: Hsla,
    pub secondary_foreground: Hsla,
    pub muted: Hsla,
    pub muted_foreground: Hsla,
    pub accent: Hsla,
    pub accent_foreground: Hsla,
    pub destructive: Hsla,
    pub destructive_foreground: Hsla,
    pub border: Hsla,
    pub input: Hsla,
    pub ring: Hsla,
}

#[derive(Debug, Clone, Deserialize)]
struct RawColors {
    background: String,
    foreground: String,
    card: String,
    card_foreground: String,
    popover: String,
    popover_foreground: String,
    primary: String,
    primary_foreground: String,
    secondary: String,
    secondary_foreground: String,
    muted: String,
    muted_foreground: String,
    accent: String,
    accent_foreground: String,
    destructive: String,
    destructive_foreground: String,
    border: String,
    input: String,
    ring: String,
}

fn hex_to_hsla(hex: &str) -> Hsla {
    let hex = hex.trim_start_matches('#');
    let r = u8::from_str_radix(&hex[0..2], 16).unwrap_or(0) as f32 / 255.0;
    let g = u8::from_str_radix(&hex[2..4], 16).unwrap_or(0) as f32 / 255.0;
    let b = u8::from_str_radix(&hex[4..6], 16).unwrap_or(0) as f32 / 255.0;

    let max = r.max(g).max(b);
    let min = r.min(g).min(b);
    let l = (max + min) / 2.0;

    if max == min {
        return Hsla { h: 0.0, s: 0.0, l, a: 1.0 };
    }

    let d = max - min;
    let s = if l > 0.5 { d / (2.0 - max - min) } else { d / (max + min) };

    let h = if max == r {
        ((g - b) / d + if g < b { 6.0 } else { 0.0 }) / 6.0
    } else if max == g {
        ((b - r) / d + 2.0) / 6.0
    } else {
        ((r - g) / d + 4.0) / 6.0
    };

    Hsla { h, s, l, a: 1.0 }
}

impl From<RawColors> for ThemeColors {
    fn from(raw: RawColors) -> Self {
        Self {
            background: hex_to_hsla(&raw.background),
            foreground: hex_to_hsla(&raw.foreground),
            card: hex_to_hsla(&raw.card),
            card_foreground: hex_to_hsla(&raw.card_foreground),
            popover: hex_to_hsla(&raw.popover),
            popover_foreground: hex_to_hsla(&raw.popover_foreground),
            primary: hex_to_hsla(&raw.primary),
            primary_foreground: hex_to_hsla(&raw.primary_foreground),
            secondary: hex_to_hsla(&raw.secondary),
            secondary_foreground: hex_to_hsla(&raw.secondary_foreground),
            muted: hex_to_hsla(&raw.muted),
            muted_foreground: hex_to_hsla(&raw.muted_foreground),
            accent: hex_to_hsla(&raw.accent),
            accent_foreground: hex_to_hsla(&raw.accent_foreground),
            destructive: hex_to_hsla(&raw.destructive),
            destructive_foreground: hex_to_hsla(&raw.destructive_foreground),
            border: hex_to_hsla(&raw.border),
            input: hex_to_hsla(&raw.input),
            ring: hex_to_hsla(&raw.ring),
        }
    }
}`,

  "src/theme/radius.rs": `use serde::Deserialize;

#[derive(Debug, Clone, Copy, Deserialize)]
pub struct ThemeRadius {
    pub none: f32,
    pub sm: f32,
    pub md: f32,
    pub lg: f32,
    pub xl: f32,
    pub full: f32,
}

impl Default for ThemeRadius {
    fn default() -> Self {
        Self {
            none: 0.0,
            sm: 2.0,
            md: 6.0,
            lg: 8.0,
            xl: 12.0,
            full: 9999.0,
        }
    }
}

impl ThemeRadius {
    pub fn from_base(base: f32) -> Self {
        Self {
            none: 0.0,
            sm: base - 4.0,
            md: base,
            lg: base + 2.0,
            xl: base + 6.0,
            full: 9999.0,
        }
    }
}`,

  "src/components/mod.rs": `mod button;
mod input;
mod card;
mod badge;
mod label;

pub use button::{Button, ButtonVariant, ButtonSize};
pub use input::Input;
pub use card::{Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter};
pub use badge::{Badge, BadgeVariant};
pub use label::Label;`,

  "src/components/button.rs": `use gpui::*;
use crate::theme::{self, Theme};

#[derive(Debug, Clone, Copy, Default, PartialEq, Eq)]
pub enum ButtonVariant {
    #[default]
    Default,
    Destructive,
    Outline,
    Secondary,
    Ghost,
    Link,
}

#[derive(Debug, Clone, Copy, Default, PartialEq, Eq)]
pub enum ButtonSize {
    Sm,
    #[default]
    Default,
    Lg,
    Icon,
}

pub struct Button {
    id: ElementId,
    label: Option<SharedString>,
    variant: ButtonVariant,
    size: ButtonSize,
    disabled: bool,
    on_click: Option<Box<dyn Fn(&ClickEvent, &mut WindowContext) + 'static>>,
}

impl Button {
    pub fn new(id: impl Into<ElementId>) -> Self {
        Self {
            id: id.into(),
            label: None,
            variant: ButtonVariant::Default,
            size: ButtonSize::Default,
            disabled: false,
            on_click: None,
        }
    }

    pub fn label(mut self, label: impl Into<SharedString>) -> Self {
        self.label = Some(label.into());
        self
    }

    pub fn variant(mut self, variant: ButtonVariant) -> Self {
        self.variant = variant;
        self
    }

    pub fn size(mut self, size: ButtonSize) -> Self {
        self.size = size;
        self
    }

    pub fn disabled(mut self, disabled: bool) -> Self {
        self.disabled = disabled;
        self
    }

    pub fn on_click(mut self, handler: impl Fn(&ClickEvent, &mut WindowContext) + 'static) -> Self {
        self.on_click = Some(Box::new(handler));
        self
    }

    // Convenience variant methods
    pub fn primary(self) -> Self { self.variant(ButtonVariant::Default) }
    pub fn destructive(self) -> Self { self.variant(ButtonVariant::Destructive) }
    pub fn outline(self) -> Self { self.variant(ButtonVariant::Outline) }
    pub fn secondary(self) -> Self { self.variant(ButtonVariant::Secondary) }
    pub fn ghost(self) -> Self { self.variant(ButtonVariant::Ghost) }
    pub fn link(self) -> Self { self.variant(ButtonVariant::Link) }

    // Convenience size methods
    pub fn sm(self) -> Self { self.size(ButtonSize::Sm) }
    pub fn lg(self) -> Self { self.size(ButtonSize::Lg) }
    pub fn icon(self) -> Self { self.size(ButtonSize::Icon) }

    fn colors(&self, theme: &Theme) -> (Hsla, Hsla, Option<Hsla>) {
        let c = &theme.colors;
        match self.variant {
            ButtonVariant::Default => (c.primary, c.primary_foreground, None),
            ButtonVariant::Destructive => (c.destructive, c.destructive_foreground, None),
            ButtonVariant::Outline => (Hsla::transparent_black(), c.foreground, Some(c.border)),
            ButtonVariant::Secondary => (c.secondary, c.secondary_foreground, None),
            ButtonVariant::Ghost => (Hsla::transparent_black(), c.foreground, None),
            ButtonVariant::Link => (Hsla::transparent_black(), c.primary, None),
        }
    }

    fn hover_bg(&self, theme: &Theme) -> Hsla {
        let c = &theme.colors;
        match self.variant {
            ButtonVariant::Default => c.primary.opacity(0.9),
            ButtonVariant::Destructive => c.destructive.opacity(0.9),
            ButtonVariant::Outline | ButtonVariant::Ghost => c.accent,
            ButtonVariant::Secondary => c.secondary.opacity(0.8),
            ButtonVariant::Link => Hsla::transparent_black(),
        }
    }
}

impl RenderOnce for Button {
    fn render(self, cx: &mut WindowContext) -> impl IntoElement {
        let theme = theme::current(cx);
        let (bg, fg, border) = self.colors(theme);
        let hover_bg = self.hover_bg(theme);
        let radius = theme.radius.md;

        let base = div()
            .id(self.id)
            .flex()
            .items_center()
            .justify_center()
            .font_weight(FontWeight::MEDIUM)
            .rounded(px(radius))
            .bg(bg)
            .text_color(fg)
            .cursor_pointer();

        let sized = match self.size {
            ButtonSize::Sm => base.h(px(32.0)).px(px(12.0)).text_xs(),
            ButtonSize::Default => base.h(px(36.0)).px(px(16.0)).text_sm(),
            ButtonSize::Lg => base.h(px(40.0)).px(px(32.0)).text_base(),
            ButtonSize::Icon => base.h(px(36.0)).w(px(36.0)),
        };

        let bordered = if let Some(border_color) = border {
            sized.border_1().border_color(border_color)
        } else {
            sized
        };

        let interactive = bordered
            .when(self.disabled, |el| el.opacity(0.5).cursor_not_allowed())
            .when(!self.disabled, |el| {
                el.hover(|el| el.bg(hover_bg))
            });

        let clickable = if let Some(handler) = self.on_click {
            interactive.on_click(move |ev, cx| {
                if !self.disabled {
                    handler(ev, cx);
                }
            })
        } else {
            interactive
        };

        if let Some(label) = self.label {
            clickable.child(label)
        } else {
            clickable
        }
    }
}`,

  "src/components/input.rs": `use gpui::*;
use crate::theme::{self, Theme};

pub struct Input {
    id: ElementId,
    placeholder: Option<SharedString>,
    value: SharedString,
    disabled: bool,
    on_change: Option<Box<dyn Fn(&str, &mut WindowContext) + 'static>>,
}

impl Input {
    pub fn new(id: impl Into<ElementId>) -> Self {
        Self {
            id: id.into(),
            placeholder: None,
            value: SharedString::default(),
            disabled: false,
            on_change: None,
        }
    }

    pub fn placeholder(mut self, placeholder: impl Into<SharedString>) -> Self {
        self.placeholder = Some(placeholder.into());
        self
    }

    pub fn value(mut self, value: impl Into<SharedString>) -> Self {
        self.value = value.into();
        self
    }

    pub fn disabled(mut self, disabled: bool) -> Self {
        self.disabled = disabled;
        self
    }
}

impl RenderOnce for Input {
    fn render(self, cx: &mut WindowContext) -> impl IntoElement {
        let theme = theme::current(cx);
        let c = &theme.colors;

        div()
            .id(self.id)
            .h(px(36.0))
            .w_full()
            .px(px(12.0))
            .py(px(8.0))
            .rounded(px(theme.radius.md))
            .border_1()
            .border_color(c.input)
            .bg(c.background)
            .text_color(c.foreground)
            .text_sm()
            .when(self.disabled, |el| el.opacity(0.5).cursor_not_allowed())
            .focus(|el| el.border_color(c.ring).outline_none())
            .child(self.value)
    }
}`,

  "src/components/card.rs": `use gpui::*;
use crate::theme::{self, Theme};

pub struct Card {
    children: Vec<AnyElement>,
}

impl Card {
    pub fn new() -> Self {
        Self { children: vec![] }
    }

    pub fn child(mut self, child: impl IntoElement) -> Self {
        self.children.push(child.into_any_element());
        self
    }
}

impl RenderOnce for Card {
    fn render(self, cx: &mut WindowContext) -> impl IntoElement {
        let theme = theme::current(cx);
        let c = &theme.colors;

        div()
            .flex()
            .flex_col()
            .rounded(px(theme.radius.lg))
            .border_1()
            .border_color(c.border)
            .bg(c.card)
            .text_color(c.card_foreground)
            .shadow_sm()
            .children(self.children)
    }
}

pub struct CardHeader {
    children: Vec<AnyElement>,
}

impl CardHeader {
    pub fn new() -> Self {
        Self { children: vec![] }
    }

    pub fn child(mut self, child: impl IntoElement) -> Self {
        self.children.push(child.into_any_element());
        self
    }
}

impl RenderOnce for CardHeader {
    fn render(self, _cx: &mut WindowContext) -> impl IntoElement {
        div()
            .flex()
            .flex_col()
            .gap(px(6.0))
            .p(px(24.0))
            .children(self.children)
    }
}

pub struct CardTitle {
    text: SharedString,
}

impl CardTitle {
    pub fn new(text: impl Into<SharedString>) -> Self {
        Self { text: text.into() }
    }
}

impl RenderOnce for CardTitle {
    fn render(self, _cx: &mut WindowContext) -> impl IntoElement {
        div()
            .text_lg()
            .font_weight(FontWeight::SEMIBOLD)
            .child(self.text)
    }
}

pub struct CardDescription {
    text: SharedString,
}

impl CardDescription {
    pub fn new(text: impl Into<SharedString>) -> Self {
        Self { text: text.into() }
    }
}

impl RenderOnce for CardDescription {
    fn render(self, cx: &mut WindowContext) -> impl IntoElement {
        let theme = theme::current(cx);
        
        div()
            .text_sm()
            .text_color(theme.colors.muted_foreground)
            .child(self.text)
    }
}

pub struct CardContent {
    children: Vec<AnyElement>,
}

impl CardContent {
    pub fn new() -> Self {
        Self { children: vec![] }
    }

    pub fn child(mut self, child: impl IntoElement) -> Self {
        self.children.push(child.into_any_element());
        self
    }
}

impl RenderOnce for CardContent {
    fn render(self, _cx: &mut WindowContext) -> impl IntoElement {
        div()
            .p(px(24.0))
            .pt(px(0.0))
            .children(self.children)
    }
}

pub struct CardFooter {
    children: Vec<AnyElement>,
}

impl CardFooter {
    pub fn new() -> Self {
        Self { children: vec![] }
    }

    pub fn child(mut self, child: impl IntoElement) -> Self {
        self.children.push(child.into_any_element());
        self
    }
}

impl RenderOnce for CardFooter {
    fn render(self, _cx: &mut WindowContext) -> impl IntoElement {
        div()
            .flex()
            .items_center()
            .p(px(24.0))
            .pt(px(0.0))
            .children(self.children)
    }
}`,

  "src/components/badge.rs": `use gpui::*;
use crate::theme::{self, Theme};

#[derive(Debug, Clone, Copy, Default, PartialEq, Eq)]
pub enum BadgeVariant {
    #[default]
    Default,
    Secondary,
    Destructive,
    Outline,
}

pub struct Badge {
    label: SharedString,
    variant: BadgeVariant,
}

impl Badge {
    pub fn new(label: impl Into<SharedString>) -> Self {
        Self {
            label: label.into(),
            variant: BadgeVariant::Default,
        }
    }

    pub fn variant(mut self, variant: BadgeVariant) -> Self {
        self.variant = variant;
        self
    }

    pub fn secondary(self) -> Self { self.variant(BadgeVariant::Secondary) }
    pub fn destructive(self) -> Self { self.variant(BadgeVariant::Destructive) }
    pub fn outline(self) -> Self { self.variant(BadgeVariant::Outline) }

    fn colors(&self, theme: &Theme) -> (Hsla, Hsla, Option<Hsla>) {
        let c = &theme.colors;
        match self.variant {
            BadgeVariant::Default => (c.primary, c.primary_foreground, None),
            BadgeVariant::Secondary => (c.secondary, c.secondary_foreground, None),
            BadgeVariant::Destructive => (c.destructive, c.destructive_foreground, None),
            BadgeVariant::Outline => (Hsla::transparent_black(), c.foreground, Some(c.border)),
        }
    }
}

impl RenderOnce for Badge {
    fn render(self, cx: &mut WindowContext) -> impl IntoElement {
        let theme = theme::current(cx);
        let (bg, fg, border) = self.colors(theme);

        let base = div()
            .flex()
            .items_center()
            .rounded(px(theme.radius.full))
            .px(px(10.0))
            .py(px(2.0))
            .text_xs()
            .font_weight(FontWeight::SEMIBOLD)
            .bg(bg)
            .text_color(fg);

        let bordered = if let Some(border_color) = border {
            base.border_1().border_color(border_color)
        } else {
            base
        };

        bordered.child(self.label)
    }
}`,

  "src/components/label.rs": `use gpui::*;
use crate::theme;

pub struct Label {
    text: SharedString,
}

impl Label {
    pub fn new(text: impl Into<SharedString>) -> Self {
        Self { text: text.into() }
    }
}

impl RenderOnce for Label {
    fn render(self, cx: &mut WindowContext) -> impl IntoElement {
        let theme = theme::current(cx);

        div()
            .text_sm()
            .font_weight(FontWeight::MEDIUM)
            .text_color(theme.colors.foreground)
            .child(self.text)
    }
}`
};

// --- UI COMPONENTS ---

const CodeBlock = ({ code, language = "rust" }: { code: string, language?: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative rounded-lg border border-border bg-muted/40 overflow-hidden font-mono text-sm my-4">
      <div className="flex justify-between items-center px-4 py-2 border-b border-border bg-muted/50">
        <span className="text-xs text-muted-foreground">{language}</span>
        <button onClick={handleCopy} className="text-muted-foreground hover:text-foreground transition-colors">
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>
      <div className="p-4 overflow-x-auto text-sm leading-relaxed text-foreground/90">
        <pre>{code}</pre>
      </div>
    </div>
  );
};

const ComponentPreview = ({ title, children, code, path }: { title: string, children: React.ReactNode, code: string, path: string }) => {
  const [view, setView] = useState<'preview' | 'code'>('preview');

  return (
    <div className="space-y-4 mb-12">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold tracking-tight scroll-m-20" id={title.toLowerCase()}>{title}</h3>
        <div className="flex items-center space-x-2 bg-muted/50 rounded-lg p-1 border border-border">
          <button 
            onClick={() => setView('preview')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${view === 'preview' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Preview
          </button>
          <button 
             onClick={() => setView('code')}
             className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${view === 'code' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Code
          </button>
        </div>
      </div>

      <div className="border border-border rounded-xl overflow-hidden bg-background">
        {view === 'preview' ? (
          <div className="p-10 min-h-[350px] flex items-center justify-center bg-[var(--background)] relative">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="relative z-10">
              {children}
            </div>
          </div>
        ) : (
          <div>
            <div className="px-4 py-2 border-b border-border bg-muted/20 text-xs font-mono text-muted-foreground">
              {path}
            </div>
            <div className="p-4 bg-muted/10 overflow-auto max-h-[350px]">
              <pre className="text-sm font-mono">{code}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- PAGES ---

const SourcePage = () => {
  const [selectedFile, setSelectedFile] = useState("src/lib.rs");
  
  const fileList = Object.keys(FILES).sort();

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6">
         <h1 className="text-3xl font-bold tracking-tight mb-2">Source Code</h1>
         <p className="text-muted-foreground">Explore the complete Rust crate structure.</p>
      </div>

      <div className="flex-1 flex border border-border rounded-xl overflow-hidden bg-background">
         {/* File Tree */}
         <div className="w-64 border-r border-border bg-muted/10 flex flex-col">
            <div className="p-4 border-b border-border bg-muted/20 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
               Explorer
            </div>
            <div className="flex-1 overflow-auto py-2">
               {fileList.map(file => {
                 const isJson = file.endsWith('.json');
                 const isToml = file.endsWith('.toml');
                 return (
                   <button
                     key={file}
                     onClick={() => setSelectedFile(file)}
                     className={`w-full flex items-center gap-2 px-4 py-2 text-sm text-left transition-colors border-l-2 ${selectedFile === file ? 'bg-background border-primary text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}
                   >
                     {isJson ? <FileJson className="w-4 h-4" /> : isToml ? <FileText className="w-4 h-4" /> : <FileCode className="w-4 h-4" />}
                     <span className="truncate">{file}</span>
                   </button>
                 );
               })}
            </div>
         </div>

         {/* Code Viewer */}
         <div className="flex-1 flex flex-col min-w-0">
             <div className="h-10 border-b border-border bg-muted/30 flex items-center justify-between px-4">
                <span className="text-sm font-mono text-muted-foreground">{selectedFile}</span>
                <button 
                  onClick={() => navigator.clipboard.writeText(FILES[selectedFile])}
                  className="p-1.5 hover:bg-background rounded-md text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
             </div>
             <div className="flex-1 overflow-auto p-4 bg-muted/5">
                <pre className="text-sm font-mono leading-relaxed">{FILES[selectedFile]}</pre>
             </div>
         </div>
      </div>
    </div>
  );
};

const InstallationPage = () => (
  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div>
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">Installation</h1>
      <p className="text-xl text-muted-foreground leading-relaxed max-w-[750px]">
        Add the crate to your GPUI project. It includes the theme system, primitives, and utilities formatted for the Zinc (Mono) aesthetic.
      </p>
    </div>
    
    <div className="space-y-4">
      <h3 className="font-semibold text-foreground">Add dependency</h3>
      <CodeBlock code={`cargo add gpui-mono`} language="bash" />
    </div>

    <div className="space-y-4">
      <h3 className="font-semibold text-foreground">Configure Theme</h3>
      <p className="text-sm text-muted-foreground">Initialize the theme in your app's main entry point.</p>
      <CodeBlock code={`use gpui_mono::Theme;

fn main() {
    App::new().run(|cx: &mut AppContext| {
        cx.set_global(Theme::zinc_dark());
        // ...
    });
}`} />
    </div>
  </div>
);

const ComponentsPage = () => (
  <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div>
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">Components</h1>
      <p className="text-xl text-muted-foreground leading-relaxed">
        Building blocks for your application. Copy-paste compatible with GPUI.
      </p>
    </div>

    {/* BUTTONS */}
    <ComponentPreview title="Button" code={FILES["src/components/button.rs"]} path="src/components/button.rs">
      <div className="flex flex-wrap items-center justify-center gap-4">
        <button className="h-10 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
          Primary
        </button>
        <button className="h-10 px-4 py-2 bg-secondary text-secondary-foreground rounded-md text-sm font-medium hover:bg-secondary/80 transition-colors">
          Secondary
        </button>
        <button className="h-10 px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md text-sm font-medium transition-colors">
          Outline
        </button>
        <button className="h-10 px-4 py-2 bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-md text-sm font-medium transition-colors">
          Destructive
        </button>
        <button className="h-10 px-4 py-2 hover:bg-accent hover:text-accent-foreground rounded-md text-sm font-medium transition-colors">
          Ghost
        </button>
        <button className="h-10 px-4 py-2 text-primary underline-offset-4 hover:underline rounded-md text-sm font-medium transition-colors">
          Link
        </button>
      </div>
    </ComponentPreview>

    {/* BADGE */}
    <ComponentPreview title="Badge" code={FILES["src/components/badge.rs"]} path="src/components/badge.rs">
      <div className="flex flex-wrap gap-4">
         <span className="inline-flex items-center rounded-full border border-transparent bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground hover:bg-primary/80 transition-colors">
            Default
          </span>
          <span className="inline-flex items-center rounded-full border border-transparent bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground hover:bg-secondary/80 transition-colors">
            Secondary
          </span>
          <span className="inline-flex items-center rounded-full border border-transparent bg-destructive px-2.5 py-0.5 text-xs font-semibold text-destructive-foreground hover:bg-destructive/80 transition-colors">
            Destructive
          </span>
          <span className="inline-flex items-center rounded-full border border-input bg-background text-foreground px-2.5 py-0.5 text-xs font-semibold transition-colors">
            Outline
          </span>
      </div>
    </ComponentPreview>

    {/* INPUT */}
    <ComponentPreview title="Input" code={FILES["src/components/input.rs"]} path="src/components/input.rs">
       <div className="w-full max-w-sm space-y-4">
          <div className="flex flex-col gap-1.5">
             <label className="text-sm font-medium leading-none">Email</label>
             <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" placeholder="Email" />
          </div>
          <div className="flex flex-col gap-1.5">
             <div className="flex items-center justify-between">
                <label className="text-sm font-medium leading-none">Password</label>
             </div>
             <input type="password" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
          </div>
       </div>
    </ComponentPreview>

    {/* CARD */}
    <ComponentPreview title="Card" code={FILES["src/components/card.rs"]} path="src/components/card.rs">
       <div className="w-[350px] rounded-lg border border-border bg-card text-card-foreground shadow-sm">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="text-2xl font-semibold leading-none tracking-tight">Create project</h3>
            <p className="text-sm text-muted-foreground">Deploy your new project in one-click.</p>
          </div>
          <div className="p-6 pt-0 grid gap-4">
             <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Name</label>
                <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder="Name of your project" />
             </div>
             <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Framework</label>
                <div className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm text-muted-foreground">
                   Select
                </div>
             </div>
          </div>
          <div className="flex items-center p-6 pt-0 justify-between">
            <button className="h-10 px-4 py-2 hover:bg-accent hover:text-accent-foreground rounded-md text-sm font-medium transition-colors border border-input">Cancel</button>
            <button className="h-10 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">Deploy</button>
          </div>
        </div>
    </ComponentPreview>
  </div>
);

const ThemingPage = () => (
  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div>
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">Theming</h1>
      <p className="text-xl text-muted-foreground leading-relaxed">
        The theme system is built on GPUI's HSLA colors and mapped to Shadcn's semantic tokens.
      </p>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
       {[
        { name: "background", color: "var(--background)" },
        { name: "foreground", color: "var(--foreground)" },
        { name: "primary", color: "var(--primary)" },
        { name: "primary-foreground", color: "var(--primary-foreground)" },
        { name: "secondary", color: "var(--secondary)" },
        { name: "secondary-foreground", color: "var(--secondary-foreground)" },
        { name: "muted", color: "var(--muted)" },
        { name: "muted-foreground", color: "var(--muted-foreground)" },
        { name: "accent", color: "var(--accent)" },
        { name: "accent-foreground", color: "var(--accent-foreground)" },
        { name: "destructive", color: "var(--destructive)" },
        { name: "destructive-foreground", color: "var(--destructive-foreground)" },
        { name: "card", color: "var(--card)" },
        { name: "card-foreground", color: "var(--card-foreground)" },
        { name: "popover", color: "var(--popover)" },
        { name: "popover-foreground", color: "var(--popover-foreground)" },
        { name: "border", color: "var(--border)" },
        { name: "input", color: "var(--input)" },
        { name: "ring", color: "var(--ring)" }
       ].map(token => (
         <div key={token.name} className="space-y-1.5">
            <div className="h-10 w-full rounded-md border border-border shadow-sm" style={{ backgroundColor: token.color }}></div>
            <div className="text-xs font-medium text-muted-foreground text-center">{token.name}</div>
         </div>
       ))}
    </div>

    <div className="space-y-4 pt-6">
      <h3 className="font-semibold text-foreground">Rust Implementation</h3>
      <CodeBlock code={FILES["src/theme/colors.rs"]} />
    </div>
  </div>
);

// --- APP SHELL ---

const SidebarLink = ({ active, onClick, icon: Icon, children }: any) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
      active 
        ? "bg-muted text-foreground" 
        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
    }`}
  >
    {Icon && <Icon className="w-4 h-4" />}
    {children}
  </button>
);

const App = () => {
  const [page, setPage] = useState<'install' | 'components' | 'theming' | 'source'>('components');

  return (
    <div className="flex h-screen bg-background text-foreground font-sans">
      
      {/* Sidebar */}
      <aside className="w-64 border-r border-border flex flex-col shrink-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="h-14 flex items-center px-6 border-b border-border">
          <div className="font-bold flex items-center gap-2">
            <div className="w-6 h-6 bg-primary text-primary-foreground rounded flex items-center justify-center">
               <Terminal className="w-3.5 h-3.5" />
            </div>
            <span>gpui-mono</span>
          </div>
        </div>

        <div className="flex-1 overflow-auto py-6 px-4 space-y-6">
          <div className="space-y-1">
             <h4 className="px-3 mb-2 text-xs font-semibold text-muted-foreground tracking-wider uppercase">Getting Started</h4>
             <SidebarLink active={page === 'install'} onClick={() => setPage('install')} icon={MousePointer2}>
               Installation
             </SidebarLink>
             <SidebarLink active={page === 'theming'} onClick={() => setPage('theming')} icon={Layout}>
               Theming
             </SidebarLink>
             <SidebarLink active={page === 'source'} onClick={() => setPage('source')} icon={FolderTree}>
               Source Browser
             </SidebarLink>
          </div>

          <div className="space-y-1">
             <h4 className="px-3 mb-2 text-xs font-semibold text-muted-foreground tracking-wider uppercase">Components</h4>
             <SidebarLink active={page === 'components'} onClick={() => setPage('components')} icon={Component}>
               All Components
             </SidebarLink>
             {/* Simulating sub-links */}
             <div className="pl-9 space-y-1">
                <button onClick={() => setPage('components')} className="block text-sm text-muted-foreground hover:text-foreground text-left w-full">Button</button>
                <button onClick={() => setPage('components')} className="block text-sm text-muted-foreground hover:text-foreground text-left w-full">Badge</button>
                <button onClick={() => setPage('components')} className="block text-sm text-muted-foreground hover:text-foreground text-left w-full">Card</button>
                <button onClick={() => setPage('components')} className="block text-sm text-muted-foreground hover:text-foreground text-left w-full">Input</button>
             </div>
          </div>
        </div>
        
        <div className="p-4 border-t border-border">
           <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              v0.1.0 (Beta)
           </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-background">
        <div className="h-14 border-b border-border flex items-center justify-between px-8 sticky top-0 bg-background/95 backdrop-blur z-50">
           <div className="flex items-center text-sm text-muted-foreground">
              Docs <ChevronRight className="w-4 h-4 mx-1" /> {page.charAt(0).toUpperCase() + page.slice(1)}
           </div>
           <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search documentation..." 
                  className="h-9 w-64 rounded-md border border-input bg-muted/50 pl-9 pr-4 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                />
              </div>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <div className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-muted">
                   <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.419-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                </div>
              </a>
           </div>
        </div>

        <div className="max-w-4xl mx-auto px-8 py-10 pb-20">
          {page === 'install' && <InstallationPage />}
          {page === 'components' && <ComponentsPage />}
          {page === 'theming' && <ThemingPage />}
          {page === 'source' && <SourcePage />}
        </div>
      </main>

    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<App />);
