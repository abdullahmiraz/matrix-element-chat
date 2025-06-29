# Matrix Chat App

A modern, real-time chat application built with Next.js, Tailwind CSS, and shadcn/ui that connects to the Matrix protocol for secure, decentralized messaging.

## Features

- 🔐 **Secure Authentication** - Login and register with any Matrix homeserver
- 💬 **Direct Messaging** - Start private conversations with any Matrix user
- 🎨 **Modern UI** - Beautiful, responsive interface built with Tailwind CSS and shadcn/ui
- ⚡ **Real-time Messaging** - Instant message delivery and updates
- 🔄 **Cross-platform** - Works with any Matrix-compatible client
- 🏠 **Homeserver Support** - Connect to matrix.org or your own homeserver

## Prerequisites

- Node.js 18+
- npm or yarn
- A Matrix account (or create one during registration)

## Getting Started

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd matrix-chat
npm install
```

### 2. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Matrix homeserver URL (default: https://matrix.org)
NEXT_PUBLIC_MATRIX_HOMESERVER_URL=https://matrix.org

# Optional: Use a different homeserver
# NEXT_PUBLIC_MATRIX_HOMESERVER_URL=https://your-homeserver.com
```

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## How to Use

### Creating a Matrix Account

1. **Visit matrix.org** - Go to [https://app.element.io](https://app.element.io) or [https://matrix.org](https://matrix.org)
2. **Register** - Click "Create Account" and choose a username
3. **Choose a homeserver** - You can use matrix.org or select another homeserver
4. **Set password** - Choose a strong password (minimum 8 characters)
5. **Verify email** - Complete the email verification process

### Using the Chat App

1. **Login** - Enter your Matrix username (e.g., `@yourname:matrix.org`) and password
2. **Start a conversation** - Click the "+" button to start a new direct message
3. **Enter user ID** - Type the full Matrix ID of the person you want to chat with (e.g., `@alice:matrix.org`)
4. **Send messages** - Type your message and press Enter or click Send

### Matrix User IDs

Matrix user IDs follow this format: `@username:homeserver.com`

Examples:

- `@alice:matrix.org` - User "alice" on matrix.org
- `@bob:yourserver.com` - User "bob" on yourserver.com
- `@john:synapse.example.org` - User "john" on a custom Synapse server

## Architecture

### Components

- **`LoginForm`** - Handles Matrix authentication
- **`RegisterForm`** - New user registration
- **`RoomList`** - Displays direct message conversations
- **`ChatArea`** - Message display and input
- **`matrixClient`** - Matrix protocol integration

### Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Modern component library
- **matrix-js-sdk** - Official Matrix client library
- **Lucide React** - Beautiful icons
- **date-fns** - Date formatting

## Matrix Protocol

This app uses the Matrix protocol, which provides:

- **Decentralized** - No single point of control
- **End-to-end encryption** - Secure messaging
- **Interoperable** - Works with any Matrix client
- **Open standard** - Free and open source

### Popular Matrix Homeservers

- **matrix.org** - The largest public homeserver
- **Element Matrix Services** - Professional hosting
- **Synapse** - Self-hosted Matrix server
- **Dendrite** - Lightweight Matrix server

## Development

### Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/          # Reusable React components
│   ├── auth/           # Authentication components
│   ├── chat/           # Chat interface components
│   └── ui/             # shadcn/ui components
└── lib/                # Utility functions
    ├── matrixClient.ts # Matrix protocol integration
    └── utils.ts        # General utilities
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Troubleshooting

### Common Issues

1. **Login Failed**

   - Verify your Matrix username and password
   - Check if your homeserver is accessible
   - Ensure you're using the correct homeserver URL

2. **Can't Start Direct Message**

   - Verify the user ID format: `@username:homeserver.com`
   - Make sure the user exists on the specified homeserver
   - Check your internet connection

3. **Messages Not Sending**
   - Check your internet connection
   - Verify you're logged in
   - Try refreshing the page

### Getting Help

- **Matrix Documentation**: [https://matrix.org/docs/](https://matrix.org/docs/)
- **Element Web**: [https://app.element.io](https://app.element.io)
- **Matrix Community**: [https://matrix.org/community](https://matrix.org/community)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- [Matrix.org](https://matrix.org) - For the amazing protocol
- [Element](https://element.io) - For the reference implementation
- [shadcn/ui](https://ui.shadcn.com) - For the beautiful components
- [Tailwind CSS](https://tailwindcss.com) - For the styling framework
#   m a t r i x - e l e m e n t - c h a t  
 