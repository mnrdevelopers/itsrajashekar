# Admin Page Customization Guide

Welcome to your Premium Recipe Flipbook admin options!

This flipbook automatically detects any images stored in this folder and updates the cookbook layout without needing any code editing.

## Image Specifications

To get the most realistic hardcover book rendering, prepare your images with the following guidelines:

1. **Naming Convention**:
   - Save your pages sequentially: `01.jpg`, `02.jpg`, `03.jpg`, etc.
   - You can also use `.png` or `.jpeg` extensions (e.g. `01.png`, `02.png`).
   - The scanner supports up to **32 pages**.

2. **Dimensions**:
   - The ideal aspect ratio is **3:4** (Portrait).
   - Recommended resolution: **1100 x 1466 pixels** (or **550 x 733 pixels** minimum for desktop/mobile crispness).
   - Ensure all page images have the exact same dimensions to prevent visual stretching.

3. **Cover Pages**:
   - `01.jpg` is the **Front Cover**. It will be styled as a hard cover and starts the book closed.
   - The last page of your sequence (e.g. `16.jpg`) is the **Back Cover**. It will also render as a hard cover.

---

## Custom Search & Table of Contents Metadata (Optional)

When you replace the pages with custom images, you can also customize the Search and Table of Contents by creating a file named `recipes.json` in the `/pages/` folder.

Create a file named `d:\PROJECTS\itsrajashekar\pages\recipes.json` with the following structure:

```json
[
  {
    "title": "My Custom Dish Name",
    "category": "Appetizer",
    "prepTime": "15 mins",
    "page": 2
  },
  {
    "title": "Strawberry Champagne Tart",
    "category": "Dessert",
    "prepTime": "1 hour",
    "page": 4
  }
]
```

If this file is found, the Table of Contents sidebar and Search input will automatically read from it and jump to the corresponding page index upon selection! If the file is not found, the sidebar will default to simple page numbering ("Page 1", "Page 2", etc.).
