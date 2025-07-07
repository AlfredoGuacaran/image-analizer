# Image Annotation Analyzer

A React-based interactive image annotation tool that allows users to draw bounding boxes on images, assign categories, and submit annotations for further processing.

## 🚀 Features

- **Interactive Bounding Box Drawing**: Draw precise bounding boxes on images with mouse interactions
- **Category Selection**: Choose from a list of predefined categories for each annotation
- **Image Queue Management**: Process images sequentially with automatic progression
- **Real-time Validation**: Submit button is enabled only when both category and bounding box are selected
- **Discard Functionality**: Clear annotations and move to the next image
- **Responsive Design**: Modern UI built with Ant Design components
- **State Management**: Robust state management using Redux Toolkit
- **Type Safety**: Full TypeScript implementation for better development experience

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **UI Library**: Ant Design (antd)
- **State Management**: Redux Toolkit + React Redux
- **Data Fetching**: TanStack Query (React Query)
- **HTTP Client**: Axios
- **Code Quality**: ESLint, Prettier, Husky
- **Styling**: CSS-in-JS with styled-components pattern

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- Node.js (version 18 or higher)
- npm

## 🚀 Getting Started

### 1. Clone the repository
git clone https://github.com/AlfredoGuacaran/image-analizer
cd image-analyzer


### 2. Install dependencies
npm install

### 3. Run the development server
npm run dev


### 4. Open your browser

Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
image-analyzer/
├── app/                          # Next.js App Router
│   ├── image-analyzer/           # Main application page
│   │   ├── _components/          # Application components
│   │   │   ├── BoundigBoxDrawer/ # Bounding box drawing component
│   │   │   ├── CategorySelector/ # Category selection component
│   │   │   ├── ImageAnalyzer/    # Main analyzer component
│   │   │   └── ImagesQueue/      # Image queue display
│   │   └── page.tsx              # Page component
│   └── layout.tsx                # Root layout
├── lib/                          # Utility libraries
│   ├── http/                     # HTTP client configuration
│   ├── query/                    # React Query configuration
│   └── utils/                    # Utility functions
├── redux/                        # Redux state management
│   ├── features/                 # Redux slices
│   ├── selectors/                # Redux selectors
│   ├── store.ts                  # Redux store configuration
│   └── types/                    # Redux type definitions
├── services/                     # API services
│   └── role-metrics/             # Role metrics API services
├── interfaces/                   # TypeScript interfaces
└── hooks/                        # Custom React hooks
```

## 🎯 How to Use

### 1. Image Loading

- The application automatically fetches unanalyzed images from the API
- Images are displayed one at a time in a queue format

### 2. Category Selection

- Select a category from the dropdown menu on the right panel
- Categories are fetched from the API and displayed dynamically

### 3. Drawing Bounding Boxes

- Click and drag on the image to draw a bounding box
- The box will appear in red with a semi-transparent overlay
- Release the mouse to finalize the box
- Use the "Undo Box" button to clear the current box

### 4. Submitting Annotations

- The "Confirm" button is enabled only when both category and bounding box are selected
- Click "Confirm" to submit the annotation to the server
- The application will automatically move to the next image

### 5. Discarding Annotations

- Click "Discard" to skip the current image without submitting
- The application will move to the next image in the queue

## 🔧 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check code quality
- `npm run lint:fix` - Fix ESLint issues automatically
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check if code is properly formatted

## 🌐 API Endpoints

The application integrates with the following API endpoints:

- **GET** `/unanalyzed-images` - Fetch images to be annotated
- **GET** `/categories` - Fetch available annotation categories
- **POST** `/annotations` - Submit completed annotations

## 🏗️ Architecture

### State Management

- **Redux Toolkit**: Centralized state management for application data
- **React Query**: Server state management for API calls
- **Local State**: Component-specific state for UI interactions

### Component Architecture

- **Container Components**: Handle business logic and state management
- **Presentational Components**: Focus on UI rendering and user interactions
- **Custom Hooks**: Reusable logic for common functionality

### Data Flow

1. API calls fetch initial data (images, categories)
2. Redux stores application state
3. Components subscribe to state changes
4. User interactions dispatch actions to update state
5. API calls submit final annotations

## 🎨 UI/UX Features

- **Responsive Design**: Works on desktop and tablet devices
- **Visual Feedback**: Clear indicators for drawing states and validation
- **Accessibility**: Keyboard navigation and screen reader support
- **Error Handling**: Graceful handling of network errors and invalid input
- **Loading States**: Loading indicators for API calls

## 🔒 Error Handling

- Network request failures are handled gracefully
- Invalid bounding box dimensions are filtered out
- Missing data is handled with appropriate fallbacks
- User-friendly error messages are displayed

## 🧪 Development Notes

- **TypeScript**: Full type safety throughout the application
- **Code Quality**: ESLint and Prettier ensure consistent code style
- **Git Hooks**: Husky pre-commit hooks run linting and formatting
- **Performance**: Optimized with Next.js features and React best practices

## 🚀 Deployment

### Build for Production

```bash
npm run build
npm run start
```

### Environment Variables

No environment variables are required for this project as it uses mock API endpoints.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is part of a coding challenge and is not licensed for commercial use.

## 👨‍💻 Author

[Your Name] - Frontend Developer

---

**Note**: This project was built as a frontend coding challenge focusing on functionality and code quality rather than visual design. The implementation demonstrates React best practices, state management, and API integration.
