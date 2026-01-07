# Perpify | Advanced Starknet DEX Frontend

**Perpify** is a high-performance, self-custodial decentralized exchange (DEX) frontend built for the Starknet ecosystem. It is designed to provide professional traders with a lightning-fast, secure, and visually immersive trading experience for perpetual swaps.

## 🚀 Key Features

- **Advanced Trading Interface**: Professional-grade UI for perpetuals trading with real-time data.
- **High Performance**: Optimized for speed using Next.js 16 and Starknet's validity rollups.
- **Starknet Integration**: Seamless wallet connection (Argent, Braavos) via generic Starknet React hooks.
- **Interactive Leaderboard**: Real-time tracking of top traders and competitions.
- **Comprehensive Dashboard**: User portfolio management and performance analytics.
- **Premium Design**: "Deep Void" dark mode aesthetic with glassmorphism effects and smooth Framer Motion animations.

## 🛠 Technology Stack

This project leverages the latest web and blockchain technologies:

### Core Framework

- **[Next.js 16](https://nextjs.org/)**: React framework with App Router for server-side rendering and static generation.
- **[React 19](https://react.dev/)**: The latest version of the generic library for building user interfaces.
- **[TypeScript](https://www.typescriptlang.org/)**: Static typing for enhanced developer productivity and code safety.

### Styling & UI

- **[Tailwind CSS v4](https://tailwindcss.com/)**: Utility-first CSS framework configured with the new CSS-first configuration approach.
- **[Framer Motion](https://www.framer.com/motion/)**: Production-ready animation library for React.
- **[Lucide React](https://lucide.dev/)**: Beautiful, consistent icon set.
- **[Sonner](https://sonner.emilkowal.ski/)**: An opinionated toast component for React.

### Blockchain & State

- **[Starknet React](https://github.com/apibara/starknet-react)**: React hooks for Starknet.
- **[Starknet.js](https://www.starknetjs.com/)**: JavaScript library for interacting with Starknet.
- **[StarknetKit](https://www.starknetkit.com/)**: Modal library for wallet connections.
- **[Zustand](https://github.com/pmndrs/zustand)**: Small, fast and scalable bearbones state-management solution.
- **[TanStack Query](https://tanstack.com/query/latest)**: Powerful asynchronous state management.

### Typography

- **Headings**: [Sanchez](https://fontsource.org/fonts/sanchez) (Serif) - Giving a premium, editorial feel.
- **Body**: [Geist](https://vercel.com/font) (Sans-serif) - Modern, legible, and crisp for UI text.

## 📂 Project Structure

```bash
├── app/                  # App Router directory
│   ├── components/       # Reusable UI components
│   │   ├── landing/      # Landing page specific components
│   │   └── ui/           # Generic UI elements (buttons, cards, etc.)
│   ├── dashboard/        # Dashboard page route
│   ├── leaderboard/      # Leaderboard page route
│   ├── trade/            # Trading interface route
│   ├── globals.css       # Global styles & Tailwind entry
│   └── layout.tsx        # Root layout with providers and fonts
├── lib/                  # Utility functions and shared logic
├── hooks/                # Custom React hooks
├── public/               # Static assets (images, icons)
└── store/                # Zustand state stores
```

## ⚡ Getting Started

### Prerequisites

- **Node.js**: Version 20 or higher is recommended (Project requires Node >= 18).
- **NPM/Yarn/PNPM**: Package manager of your choice.

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/starkware-project.git
    cd starkware-project
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

    > **Note**: If you encounter peer dependency issues with React 19/18, use the legacy peer deps flag:
    > `npm install --legacy-peer-deps`

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build

Build the application for production:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

## 🎨 Configuration & Customization

### Tailwind v4

This project uses the alpha/beta version of Tailwind CSS v4. Configuration is handled primarily through CSS variables in `app/globals.css` under the `@theme` directive, rather than a traditional `tailwind.config.ts`.

## 🤝 Contribution

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the project.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

---

Built with ❤️ for the Starknet Community.
