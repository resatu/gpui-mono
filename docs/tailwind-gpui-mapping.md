# Tailwind CSS to GPUI Mapping

## Sizing

| Tailwind | Value | GPUI |
|----------|-------|------|
| `h-5` | 20px | `.h(px(20.))` |
| `h-6` | 24px | `.h(px(24.))` |
| `h-8` | 32px | `.h(px(32.))` |
| `h-9` | 36px | `.h(px(36.))` |
| `h-10` | 40px | `.h(px(40.))` |
| `w-full` | 100% | `.w_full()` |
| `size-6` | 24x24 | `.size(px(24.))` |
| `size-8` | 32x32 | `.size(px(32.))` |
| `size-9` | 36x36 | `.size(px(36.))` |
| `size-10` | 40x40 | `.size(px(40.))` |
| `h-px` | 1px | `.h(px(1.))` |
| `w-px` | 1px | `.w(px(1.))` |

## Spacing (Padding/Margin)

| Tailwind | Value | GPUI |
|----------|-------|------|
| `px-2` | 8px horizontal | `.px(px(8.))` |
| `px-2.5` | 10px horizontal | `.px(px(10.))` |
| `py-0.5` | 2px vertical | `.py(px(2.))` |
| `py-1` | 4px vertical | `.py(px(4.))` |
| `p-6` | 24px all | `.p(px(24.))` |
| `gap-1` | 4px | `.gap(px(4.))` |
| `gap-1.5` | 6px | `.gap(px(6.))` |
| `gap-2` | 8px | `.gap(px(8.))` |
| `gap-6` | 24px | `.gap(px(24.))` |

## Border Radius

| Tailwind | Value | GPUI |
|----------|-------|------|
| `rounded-md` | 6px | `.rounded(px(6.))` |
| `rounded-lg` | 8px | `.rounded(px(8.))` |
| `rounded-xl` | 12px | `.rounded(px(12.))` |
| `rounded-4xl` | 32px | `.rounded(px(32.))` |
| `rounded-full` | 9999px | `.rounded_full()` |

## Flexbox

| Tailwind | GPUI |
|----------|------|
| `flex` | `div().flex()` |
| `inline-flex` | `div().flex()` (no inline in GPUI) |
| `flex-col` | `.flex_col()` |
| `items-center` | `.items_center()` |
| `justify-center` | `.justify_center()` |
| `gap-*` | `.gap(px(*))` |
| `shrink-0` | `.flex_shrink_0()` |

## Typography

| Tailwind | Value | GPUI |
|----------|-------|------|
| `text-xs` | 12px | `.text_size(px(12.))` |
| `text-sm` | 14px | `.text_size(px(14.))` |
| `text-base` | 16px | `.text_size(px(16.))` |
| `font-medium` | 500 | `.font_weight(FontWeight::MEDIUM)` |
| `font-semibold` | 600 | `.font_weight(FontWeight::SEMIBOLD)` |
| `leading-none` | 1.0 | `.line_height(relative(1.0))` |

## Colors

| Tailwind Variable | GPUI Access |
|-------------------|-------------|
| `bg-primary` | `.bg(cx.theme().primary)` |
| `text-primary-foreground` | `.text_color(cx.theme().primary_foreground)` |
| `bg-muted` | `.bg(cx.theme().muted)` |
| `text-muted-foreground` | `.text_color(cx.theme().muted_foreground)` |
| `border-border` | `.border_color(cx.theme().border)` |
| `bg-destructive/10` | `.bg(cx.theme().destructive.opacity(0.1))` |

## Borders

| Tailwind | GPUI |
|----------|------|
| `border` | `.border_1()` |
| `border-transparent` | `.border_color(transparent_black())` |
| `border-border` | `.border_color(cx.theme().border)` |

## Opacity/Visibility

| Tailwind | GPUI |
|----------|------|
| `opacity-50` | `.opacity(0.5)` |
| `disabled:opacity-50` | Use conditional rendering |

## Shadows

| Tailwind | GPUI |
|----------|------|
| `shadow-xs` | `.shadow(smallShadow(cx))` |
| `shadow-sm` | `.shadow(mediumShadow(cx))` |
| `ring-1` | Use border with offset |

## Interactive States

| Tailwind | GPUI |
|----------|------|
| `hover:bg-*` | `.hover(\|s, _\| s.bg(...))` |
| `focus-visible:ring-*` | `.focus_ring(...)` (via gpui-component patterns) |
| `disabled:*` | Check `.when(disabled, \|s\| ...)` |

## GPUI-specific Patterns

### Element Creation
```rust
// Basic div
div().flex().items_center().justify_center()

// With children
div().child(Button::new("click"))

// With ID for interactivity
div().id("my-button").on_click(|_, cx| { ... })
```

### Theme Access
```rust
impl RenderOnce for MyComponent {
    fn render(self, cx: &mut WindowContext) -> impl IntoElement {
        let theme = cx.theme();
        div()
            .bg(theme.primary)
            .text_color(theme.primary_foreground)
    }
}
```

### Conditional Styling
```rust
div()
    .when(self.disabled, |s| s.opacity(0.5).cursor_not_allowed())
    .when(self.variant == Variant::Outline, |s| {
        s.border_1().border_color(cx.theme().border)
    })
```

### Size Helpers
```rust
// From gpui-component patterns
pub fn px(value: f32) -> Pixels {
    Pixels(value)
}

pub fn rems(value: f32) -> Rems {
    Rems(value)
}
```
