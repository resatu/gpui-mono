# shadcn/ui Component Specifications

Extracted from `/tmp/shadcn-ui/apps/v4/registry/` source files.

## Button

**Source:** `registry/bases/base/ui/button.tsx` + `registry/styles/style-vega.css`

### Base Styles
```
.cn-button {
  rounded-md border border-transparent bg-clip-padding text-sm font-medium
  focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]
  disabled:pointer-events-none disabled:opacity-50
  [&_svg:not([class*='size-'])]:size-4
}
```

### Variants

| Variant | Styles |
|---------|--------|
| `default` | `bg-primary text-primary-foreground hover:bg-primary/80` |
| `outline` | `border-border bg-background hover:bg-muted hover:text-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 shadow-xs` |
| `secondary` | `bg-secondary text-secondary-foreground hover:bg-secondary/80` |
| `ghost` | `hover:bg-muted hover:text-foreground dark:hover:bg-muted/50` |
| `destructive` | `bg-destructive/10 hover:bg-destructive/20 text-destructive dark:bg-destructive/20` |
| `link` | `text-primary underline-offset-4 hover:underline` |

### Sizes

| Size | Styles |
|------|--------|
| `xs` | `h-6 gap-1 rounded-[min(var(--radius-md),8px)] px-2 text-xs [&_svg]:size-3` |
| `sm` | `h-8 gap-1 rounded-[min(var(--radius-md),10px)] px-2.5` |
| `default` | `h-9 gap-1.5 px-2.5` |
| `lg` | `h-10 gap-1.5 px-2.5` |
| `icon` | `size-9` |
| `icon-xs` | `size-6 rounded-[min(var(--radius-md),8px)] [&_svg]:size-3` |
| `icon-sm` | `size-8 rounded-[min(var(--radius-md),10px)]` |
| `icon-lg` | `size-10` |

---

## Badge

**Source:** `registry/bases/base/ui/badge.tsx` + `registry/styles/style-vega.css`

### Base Styles
```
.cn-badge {
  h-5 gap-1 rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium
  transition-all [&>svg]:size-3
}
```

### Variants

| Variant | Styles |
|---------|--------|
| `default` | `bg-primary text-primary-foreground` |
| `secondary` | `bg-secondary text-secondary-foreground` |
| `outline` | `border-border text-foreground` |
| `destructive` | `bg-destructive/10 text-destructive dark:bg-destructive/20` |
| `ghost` | `hover:bg-muted hover:text-muted-foreground` |
| `link` | `text-primary underline-offset-4 hover:underline` |

---

## Card

**Source:** `registry/bases/base/ui/card.tsx` + `registry/styles/style-vega.css`

### Base Styles
```
.cn-card {
  ring-foreground/10 bg-card text-card-foreground gap-6 overflow-hidden
  rounded-xl py-6 text-sm shadow-xs ring-1
  data-[size=sm]:gap-4 data-[size=sm]:py-4
}
```

### Sub-components

| Component | Styles |
|-----------|--------|
| `CardHeader` | `gap-1 rounded-t-xl px-6 group-data-[size=sm]/card:px-4` |
| `CardTitle` | `text-base leading-normal font-medium group-data-[size=sm]/card:text-sm` |
| `CardDescription` | `text-muted-foreground text-sm` |
| `CardContent` | `px-6 group-data-[size=sm]/card:px-4` |
| `CardFooter` | `rounded-b-xl px-6 group-data-[size=sm]/card:px-4 flex items-center` |
| `CardAction` | `col-start-2 row-span-2 row-start-1 self-start justify-self-end` |

---

## Input

**Source:** `registry/bases/base/ui/input.tsx` + `registry/styles/style-vega.css`

### Base Styles
```
.cn-input {
  dark:bg-input/30 border-input focus-visible:border-ring
  focus-visible:ring-ring/50 focus-visible:ring-[3px]
  aria-invalid:ring-destructive/20 aria-invalid:border-destructive
  h-9 rounded-md border bg-transparent px-2.5 py-1 text-base shadow-xs
  transition-[color,box-shadow] md:text-sm
  disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50
  placeholder:text-muted-foreground
}
```

---

## Separator

**Source:** `registry/bases/base/ui/separator.tsx` + `registry/styles/style-vega.css`

### Base Styles
```
.cn-separator {
  bg-border shrink-0
}
.cn-separator-horizontal {
  h-px w-full
}
.cn-separator-vertical {
  h-full w-px
}
```

---

## Skeleton

**Source:** `registry/bases/base/ui/skeleton.tsx` + `registry/styles/style-vega.css`

### Base Styles
```
.cn-skeleton {
  bg-muted rounded-md animate-pulse
}
```

---

## Avatar

**Source:** `registry/bases/base/ui/avatar.tsx` + `registry/styles/style-vega.css`

### Base Styles
```
.cn-avatar {
  size-8 rounded-full after:rounded-full
  data-[size=lg]:size-10 data-[size=sm]:size-6
}
.cn-avatar-fallback {
  bg-muted text-muted-foreground rounded-full
}
.cn-avatar-image {
  rounded-full aspect-square size-full object-cover
}
.cn-avatar-badge {
  bg-primary text-primary-foreground ring-background
}
```

### Sizes

| Size | Dimension |
|------|-----------|
| `sm` | `size-6` (24px) |
| `default` | `size-8` (32px) |
| `lg` | `size-10` (40px) |

---

## Label

**Source:** `registry/bases/base/ui/label.tsx` + `registry/styles/style-vega.css`

### Base Styles
```
.cn-label {
  gap-2 text-sm leading-none font-medium
  group-data-[disabled=true]:opacity-50
  peer-disabled:opacity-50
  flex items-center select-none
}
```
