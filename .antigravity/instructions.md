# Global System Prompt & Engineering Standards for Antigravity IDE

This document establishes the strict architectural, visual, and code quality standards required for all web development tasks executed within this project. You MUST follow these guidelines to produce production-grade, aesthetically pristine, and modular web interfaces comparable to modern design-system builders (e.g., Lovable, Vercel V0).

---

## 1. Core Architecture & Tech Stack

Unless explicitly overriden, all frontend applications built in this repository must strictly adhere to the following stack:

* **Framework:** React 18+ (using Vite or Next.js App Router).
* **Language:** TypeScript (Strict mode enabled, no explicit or implicit `any`).
* **Styling:** Tailwind CSS (v3+ or v4). Zero custom CSS files except global CSS variables.
* **Component Library:** `shadcn/ui` primitives built on top of Radix UI primitives.
* **Icons:** `lucide-react` exclusively. Do not import or mix font-awesome, heroicons, or custom SVG wrappers unless instructed.
* **Utility Libraries:** `clsx`, `tailwind-merge`, and custom `cn()` helper function.
* **State Management:** Zustand for global reactive state, TanStack Query (React Query) for server state/data fetching, or React `useState`/`useReducer` for strict local UI state.

---

## 2. UI/UX Design System Rules (The "Lovable Quality" Standard)

To achieve a modern, high-converting, professional SaaS UI aesthetic, you must strictly follow these design constraints:

### 2.1 Theme & Palette Strategy
* **Design Aesthetic:** Modern Minimalist, Enterprise-Grade SaaS (inspired by Vercel, Linear, Stripe, Supabase).
* **Color Tokens:** Rely strictly on Tailwind CSS color tokens mapped through HSL variables in `globals.css`.
  * **Primary Action:** Slate/Zinc dark (`bg-slate-900 text-slate-50`) or high-contrast accent (`indigo-600`, `blue-600`).
  * **Backgrounds:** Clean layered surfaces (`bg-background`, `bg-card`, `bg-muted/50`). Avoid pure `#000000` or `#ffffff` everywhere—use subtle tints (`slate-50`, `zinc-900/50`).
  * **Borders:** Thin, subtle borders on cards, inputs, and modals (`border-border` or `border-slate-200/80 dark:border-slate-800`).
* **Dark Mode:** Native toggle support required on every page utilizing `next-themes` or Tailwind's `dark:` modifier class.

### 2.2 Typography & Spacing Hierarchy
* **Font Family:** Inter, Geist, or System Sans-Serif font stack.
* **Headings:**
  * Page Title: `text-3xl font-bold tracking-tight text-foreground sm:text-4xl`
  * Section Header: `text-xl font-semibold tracking-tight text-foreground`
  * Subsection / Card Title: `text-base font-medium text-foreground`
* **Subtitles & Muted Text:** Use `text-sm text-muted-foreground` for helper text, labels, and timestamps.
* **Spacing Scale:** Use standard Tailwind spacing scale (`gap-2`, `gap-4`, `gap-6`, `p-6`). Ensure adequate breathing room around containers.

### 2.3 Visual Elements & Polish
* **Rounded Corners:** Use uniform radius classes (`rounded-lg` for cards, `rounded-md` for buttons/inputs, `rounded-full` for badges/avatars).
* **Shadows:** Soft, subtle elevation (`shadow-sm` or `shadow-md`). Never use heavy, unblended shadows (`shadow-2xl` without opacity control).
* **Interactive Feedback:** Every clickable element must have explicit interactive states:
  * Hover: `hover:bg-accent hover:text-accent-foreground`
  * Focus: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`
  * Active/Pressed: `active:scale-[0.98]` transition.
  * Transitions: `transition-all duration-200 ease-in-out`.

---

## 3. Mandatory Component Rules & Structure

### 3.1 Directory Organization
Keep the codebase cleanly structured. Never place custom features directly inside `components/ui`.

```text
src/
├── assets/             # Static graphics, SVG logos
├── components/
│   ├── ui/             # Primitive, atomic shadcn components (Button, Dialog, Card)
│   ├── layout/         # Shell structures (Navbar, Sidebar, Footer, PageHeader)
│   ├── features/       # Feature-specific composite modules (e.g., AuthForm, UserTable)
│   └── shared/         # Reusable composite elements (DataTable, EmptyState, PageSpinner)
├── hooks/              # Custom React hooks (useAuth, useDebounce)
├── lib/                # Utility functions, API clients, helpers (`utils.ts`)
├── services/           # Data fetchers, API contracts
├── types/              # TypeScript types, interfaces, and Zod schemas
└── pages/ or app/      # Page route entries
```

### 3.2 Component Granularity Rules
1. **Max File Size:** No component file may exceed **150 lines of code**. If a file exceeds this limit, extract sub-views or logic into smaller child components.
2. **Single Responsibility:** A component should either render UI or orchestrate business logic—never both in a massive single block.
3. **Class Merging:** Always use the `cn()` utility function for custom dynamic classes:
   ```tsx
   import { cn } from "@/lib/utils";

   interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
     variant?: "default" | "outline";
   }

   export const CustomButton = ({ className, variant = "default", ...props }: ButtonProps) => {
     return (
       <button
         className={cn(
           "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
           variant === "default" && "bg-primary text-primary-foreground hover:bg-primary/90",
           variant === "outline" && "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
           className
         )}
         {...props}
       />
     );
   };
   ```

---

## 4. Required UI States & Resilience

No feature generation is complete until ALL of the following UI states are explicitly handled:

1. **Default State:** The populated, fully loaded UI view.
2. **Loading State:** Must use `Skeleton` screens from `shadcn/ui` that mirror the exact layout structure, NOT a plain generic spinner centered on the screen.
3. **Empty State:** When no data exists, display a visually polished empty view containing:
   * An illustrative icon from `lucide-react`.
   * A clear title (e.g., "No invoices found").
   * A helpful subtext explaining how to create or fetch data.
   * A Call-To-Action (CTA) button to trigger the main action.
4. **Error State:** A user-friendly error card or toast notification with a "Retry" trigger.
5. **Responsive Breakdown:** Mobile layout (`< 768px`) must collapse navigation, stack cards vertically, and adapt padding.

---

## 5. Execution Protocol for the AI Agent

When tasked with generating a new page, feature, or component in Antigravity IDE, follow this exact workflow:

### Step 1: Component Tree & Data Contract Planning
Before writing any TSX code:
* Define the data types/interfaces needed.
* Draft the list of components to create or reuse.
* Confirm layout placement (headers, sidebars, main content).

### Step 2: Utilize Shadcn / Radix Primitives
* Check `src/components/ui/` first.
* If a component primitive (e.g., `Dialog`, `Popover`, `Select`) is missing, ask or execute the CLI command to add it via `npx shadcn@latest add <component>`.

### Step 3: Incremental Build & Assembly
* Build subcomponents in `src/components/features/` or `src/components/shared/`.
* Assemble the parent page view.
* Ensure type safety with strict zero-`any` compliance.

### Step 4: Visual & Quality Verification (Browser Agent)
* Run local dev server (`npm run dev`).
* Take a browser screenshot or inspect rendered markup.
* Check alignment, spacing consistency, hover triggers, mobile viewport layout (`375px`), and contrast ratio.
* Self-correct any visual flaws prior to finalizing response.

---

## 6. Prompt Examples for Optimal Output

Use these formats when giving requests to Antigravity to ensure top-tier Lovable-style UI outputs:

* **Creating a New Dashboard Section:**
  > *"Build the 'Analytics Overview' page using our global instructions. Include metric summary cards with trend indicators (+/- %), a line chart placeholder, and a recent activity data table. Include Loading skeletons and an Empty state for new accounts."*

* **Building a Data Form:**
  > *"Create a user profile edit form using React Hook Form + Zod schema validation. Use shadcn Input, Select, and Switch components with clear label hierarchy, inline field validation messages, and disabled submit button state during pending async operations."*