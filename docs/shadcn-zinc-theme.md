# shadcn/ui Zinc Theme Reference

Extracted from `/tmp/shadcn-ui/apps/v4/public/r/themes.css`

## Light Mode (`.theme-zinc`)

| Variable | HSL Value | Description |
|----------|-----------|-------------|
| `--background` | `0 0% 100%` | Pure white |
| `--foreground` | `240 10% 3.9%` | Near black with slight blue |
| `--muted` | `240 4.8% 95.9%` | Light gray |
| `--muted-foreground` | `240 3.8% 46.1%` | Medium gray |
| `--popover` | `0 0% 100%` | White |
| `--popover-foreground` | `240 10% 3.9%` | Near black |
| `--card` | `0 0% 100%` | White |
| `--card-foreground` | `240 10% 3.9%` | Near black |
| `--border` | `240 5.9% 90%` | Light gray border |
| `--input` | `240 5.9% 90%` | Light gray input |
| `--primary` | `240 5.9% 10%` | Dark gray (near black) |
| `--primary-foreground` | `0 0% 98%` | Near white |
| `--secondary` | `240 4.8% 95.9%` | Light gray |
| `--secondary-foreground` | `240 5.9% 10%` | Dark gray |
| `--accent` | `240 4.8% 95.9%` | Light gray |
| `--accent-foreground` | `240 5.9% 10%` | Dark gray |
| `--destructive` | `0 84.2% 60.2%` | Red |
| `--destructive-foreground` | `0 0% 98%` | Near white |
| `--ring` | `240 5.9% 10%` | Dark gray |
| `--radius` | `0.5rem` | 8px |

## Dark Mode (`.dark .theme-zinc`)

| Variable | HSL Value | Description |
|----------|-----------|-------------|
| `--background` | `240 10% 3.9%` | Near black |
| `--foreground` | `0 0% 98%` | Near white |
| `--muted` | `240 3.7% 15.9%` | Dark gray |
| `--muted-foreground` | `240 5% 64.9%` | Medium gray |
| `--popover` | `240 10% 3.9%` | Near black |
| `--popover-foreground` | `0 0% 98%` | Near white |
| `--card` | `240 10% 3.9%` | Near black |
| `--card-foreground` | `0 0% 98%` | Near white |
| `--border` | `240 3.7% 15.9%` | Dark gray |
| `--input` | `240 3.7% 15.9%` | Dark gray |
| `--primary` | `0 0% 98%` | Near white |
| `--primary-foreground` | `240 5.9% 10%` | Dark gray |
| `--secondary` | `240 3.7% 15.9%` | Dark gray |
| `--secondary-foreground` | `0 0% 98%` | Near white |
| `--accent` | `240 3.7% 15.9%` | Dark gray |
| `--accent-foreground` | `0 0% 98%` | Near white |
| `--destructive` | `0 62.8% 30.6%` | Dark red |
| `--destructive-foreground` | `0 0% 98%` | Near white |
| `--ring` | `240 4.9% 83.9%` | Light gray |

## HSL to GPUI Hsla Conversion

```rust
// HSL format: H S% L%
// GPUI Hsla: hsla(h/360.0, s/100.0, l/100.0, 1.0)

// Example: 240 10% 3.9% -> hsla(240.0/360.0, 0.10, 0.039, 1.0)
pub fn hsl(h: f32, s: f32, l: f32) -> Hsla {
    hsla(h / 360.0, s / 100.0, l / 100.0, 1.0)
}
```

## Zinc Color Palette (Tailwind)

For reference, the Zinc scale from Tailwind:

| Scale | Light | Dark (inverted usage) |
|-------|-------|----------------------|
| 50 | `#fafafa` | - |
| 100 | `#f4f4f5` | - |
| 200 | `#e4e4e7` | - |
| 300 | `#d4d4d8` | - |
| 400 | `#a1a1aa` | - |
| 500 | `#71717a` | - |
| 600 | `#52525b` | - |
| 700 | `#3f3f46` | - |
| 800 | `#27272a` | - |
| 900 | `#18181b` | - |
| 950 | `#09090b` | - |
