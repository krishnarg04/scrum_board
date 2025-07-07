# 🏃‍♂️ Scrum Board

A modern, minimalistic Scrum board application built with vanilla HTML, CSS, and JavaScript. Features a clean black & white design with dark mode support and flexible viewing options.

![Scrum Board Preview](https://via.placeholder.com/800x400/1a1a1a/ffffff?text=Scrum+Board+Preview)

## ✨ Features

### 🎯 **Core Functionality**
- **Customizable Categories**: Create, edit, and delete task categories with custom colors
- **Auto-Generated Task IDs**: Unique task identifiers based on category (e.g., FEATURE-001, BUG-002)
- **Drag & Drop**: Seamlessly move tasks between Scrum stages
- **localStorage Persistence**: All data automatically saved in browser storage

### 🎨 **User Interface**
- **Minimalistic B&W Design**: Clean, professional black and white aesthetic
- **Dark Mode Toggle**: Eye-friendly dark theme with smooth transitions
- **Block Mode Toggle**: Switch between column and horizontal block layouts
- **Independent Scrolling**: Each section scrolls independently for better focus
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### 🏃‍♂️ **Scrum Workflow**
- **📋 To Do**: New tasks start here
- **🔄 In Progress**: Tasks currently being worked on
- **🧪 Testing**: Tasks in testing/review phase
- **✅ Completed**: Finished tasks

### 📱 **Task Management**
- **Rich Task Details**: Click any task to view/edit comprehensive details
- **Task Metadata**: Creation timestamps and stage tracking
- **Bulk Operations**: Manage multiple tasks efficiently
- **Search & Filter**: Easy navigation through large task lists

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server required - runs entirely in the browser

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/scrum-board.git
   cd scrum-board
   ```

2. **Open the application**
   ```bash
   # Simply open index.html in your browser
   open index.html
   # or
   double-click index.html
   ```

3. **Start using**
   - No build process required
   - No dependencies to install
   - Works offline

## 📖 Usage Guide

### Getting Started
1. **Create Categories**: Click "Add Category" to create custom task categories
2. **Add Tasks**: Select a category, enter description, click "Add Task"
3. **Move Tasks**: Drag and drop tasks between stages
4. **Edit Tasks**: Click on any task to view/edit details

### Interface Controls

#### 🎛️ **Header Controls**
- **Dark Mode Toggle**: Switch between light and dark themes
- **Block Mode Toggle**: Switch between column and block layouts

#### 📝 **Task Creation**
- **Category Selector**: Choose from existing categories
- **Task Input**: Enter task description
- **Add Button**: Create new task (or press Enter)

#### 🏷️ **Category Management**
- **Add Category**: Create new categories with custom colors
- **Manage Categories**: View, edit, or delete existing categories

### Keyboard Shortcuts
- **Enter**: Add new task (when in task input field)
- **Escape**: Close modals
- **Click & Drag**: Move tasks between stages

## 🎨 Themes & Layout

### Light Mode (Default)
- Clean white background
- Black text and accents
- Subtle gray borders and highlights

### Dark Mode
- Deep black background (#1a1a1a)
- White text and accents
- Optimized for low-light environments

### Layout Modes

#### Column Mode (Default)
```
┌─────────┬─────────┬─────────┬─────────┐
│ To Do   │Progress │ Testing │Complete │
│ ┌─────┐ │ ┌─────┐ │ ┌─────┐ │ ┌─────┐ │
│ │Task │ │ │Task │ │ │Task │ │ │Task │ │
│ └─────┘ │ └─────┘ │ └─────┘ │ └─────┘ │
└─────────┴─────────┴─────────┴─────────┘
```

#### Block Mode
```
┌─────────┬───────────────────────────────┐
│ To Do   │ [Task] [Task] [Task] [Task]   │
├─────────┼───────────────────────────────┤
│Progress │ [Task] [Task]                 │
├─────────┼───────────────────────────────┤
│ Testing │ [Task]                        │
├─────────┼───────────────────────────────┤
│Complete │ [Task] [Task] [Task]          │
└─────────┴───────────────────────────────┘
```

## 🗂️ File Structure

```
scrum-board/
├── index.html          # Main application file
├── styles.css          # Styling and themes
├── script.js           # Application logic
├── README.md           # Documentation
└── data/
    └── scrum.png       # Favicon (optional)
```

## 🔧 Technical Details

### Built With
- **HTML5**: Semantic markup and modern features
- **CSS3**: Custom properties, flexbox, grid, animations
- **Vanilla JavaScript**: ES6+ features, localStorage API

### Browser Support
- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+

### Data Storage
- **localStorage**: All data persists in browser storage
- **No server required**: Fully client-side application
- **Export/Import**: Data can be manually exported via browser dev tools

## 🎯 Features in Detail

### Task ID System
Tasks automatically receive unique IDs based on their category:
- `FEATURE-001`, `FEATURE-002`, etc.
- `BUG-001`, `BUG-002`, etc.
- `TASK-001`, `TASK-002`, etc.

### Drag & Drop
- **Visual Feedback**: Hover states and drag indicators
- **Touch Support**: Works on mobile devices
- **Validation**: Prevents invalid drops
- **Animation**: Smooth transitions between stages

### Data Persistence
All data is automatically saved to localStorage:
- **Tasks**: Complete task information and metadata
- **Categories**: Custom categories and colors
- **Preferences**: Theme and layout mode preferences
- **Counters**: Task ID counters for each category

## 🔄 Workflow Examples

### Feature Development Workflow
1. Create task in "To Do" with FEATURE category
2. Move to "In Progress" when development starts
3. Move to "Testing" when ready for QA
4. Move to "Completed" when shipped

### Bug Fix Workflow
1. Create task in "To Do" with BUG category
2. Move to "In Progress" when investigating
3. Move to "Testing" when fix is ready
4. Move to "Completed" when verified

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by modern project management tools
- Built with performance and simplicity in mind
- Designed for teams of all sizes

## 📞 Support

If you encounter any issues or have questions:
1. Check the [Issues](https://github.com/yourusername/scrum-board/issues) page
2. Create a new issue with detailed description
3. Include browser information and steps to reproduce

---

**Made with ❤️ for productive teams**