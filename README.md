# 🛒 E-commerce Product Listing Application

A modern, fully-featured e-commerce application built with Next.js 14, TypeScript, and Tailwind CSS as part of the **Frontend Assignment - Whatbytes**. Features a responsive design, advanced filtering system, shopping cart functionality, and real-time search capabilities.

## 🌐 Live Demo

**Deployed on Vercel:** [https://whatbytes-eight.vercel.app/](https://whatbytes-eight.vercel.app/)

## 📋 Assignment Requirements Fulfilled

### ✅ **1. Home Page (/) – Product Listing**

**Header:**

- ✅ Logo on the left
- ✅ Search bar in the center
- ✅ Cart icon with real-time badge and profile/avatar on the right

**Main Section:**

- ✅ **Sidebar (left):** Category filters, price range slider, brand filters
- ✅ **Product Grid (right):** Responsive 3/2/1 column layout with product cards including image, title, price, add to cart button, and rating stars

**Footer:**

- ✅ Copyright information and social media icons

### ✅ **2. Product Detail Page (/product/[id])**

**Layout:**

- ✅ **Image Section (left):** Image carousel with thumbnail navigation
- ✅ **Details Section (right):** Product title, price, description, category, quantity selector, add to cart button, and comprehensive reviews section

### ✅ **3. Cart Page (/cart) - Bonus Completed**

- ✅ List of added products with full details
- ✅ Quantity update controls with auto-removal
- ✅ Remove item options
- ✅ Complete price summary with tax and shipping calculations

## 🎯 Core Logic Implementation

### ✅ **Required Features**

- ✅ **Filtering Logic** - Categories, price range, and brand filtering
- ✅ **Search Filtering** - Real-time string matching across product fields
- ✅ **URL-based Filters** - `?category=electronics&price=0-1000&brands=apple,samsung`
- ✅ **State Management** - Zustand for cart with localStorage persistence
- ✅ **Dynamic Routing** - Next.js App Router for `/product/[id]` pages
- ✅ **Conditional Rendering** - "No products found" states with clear actions
- ✅ **Cart Persistence** - localStorage integration with Zustand middleware

### 🔧 **Technology Stack (As Required)**

- ✅ **Next.js 14** - App Router setup as specified
- ✅ **Tailwind CSS** - Rapid and responsive UI development
- ✅ **Lucide React** - Icon library for all UI icons
- ✅ **TypeScript** - Full type safety implementation

## 📦 Repository & Deployment

### **GitHub Repository Structure**

This project follows the assignment requirements with:

- ✅ **Logical, feature-based commits** demonstrating development process
- ✅ **Incremental development** with separate commits for:
  - Initial Next.js setup and project structure
  - Header component with logo, search, and cart
  - Footer component with social media icons
  - Product listing and grid implementation
  - Sidebar filters (category, price, brand)
  - Product detail page with image carousel
  - Shopping cart functionality and state management
  - URL-based filtering and search implementation
  - Responsive design and mobile optimization
  - Toast notifications and user feedback
  - Deployment configuration and final touches

### **Deployment**

- ✅ **Deployed on Vercel** as required
- ✅ **Live URL included** in repository README
- ✅ **Production-ready** with optimized builds

## 🎨 UI/UX Implementation

### **Design Attention to Detail**

- ✅ **Pixel-perfect implementation** matching provided design specifications
- ✅ **Responsive breakpoints** ensuring consistent experience across devices
- ✅ **Interactive elements** with proper hover states and transitions
- ✅ **Loading states** with skeleton UI for better user experience
- ✅ **Error handling** with proper fallbacks and user guidance

### **Advanced Features Beyond Requirements**

- 🚀 **Toast Notifications** - User feedback for all cart actions
- 🚀 **Real-time Search** - Instant results as user types
- 🚀 **Smart Quantity Controls** - Dynamic switching between add/quantity buttons
- 🚀 **Product Reviews System** - Complete review display with ratings breakdown
- 🚀 **URL State Synchronization** - Shareable filtered results
- 🚀 **Cart Badge Animation** - Real-time updates across all pages
- 🚀 **Suspense Boundaries** - Proper loading states for better performance

### 🏪 **Product Management**

- **Product Grid** - Responsive 3-column desktop, 2-column tablet, 1-column mobile layout
- **Product Cards** - Image, title, price, ratings, and dynamic add-to-cart/quantity controls
- **Product Detail Pages** - Comprehensive product information with image carousel, reviews, and specifications
- **Dynamic Quantity Controls** - Smart button switching from "Add to Cart" to quantity selectors

### 🔍 **Advanced Filtering System**

- **Category Filtering** - Electronics, Clothing, Home, All categories
- **Price Range Filtering** - Interactive slider with custom input field
- **Brand Filtering** - Multi-select brand checkboxes (Apple, Samsung, Nike, Adidas, IKEA)
- **Real-time Search** - Search across product titles, descriptions, brands, and categories
- **URL-based Filters** - Shareable filtered results with browser back/forward support

### 🛍️ **Shopping Cart**

- **Persistent Cart** - Uses Zustand with localStorage for cart persistence
- **Real-time Updates** - Cart badge updates instantly across all pages
- **Quantity Management** - Increase/decrease quantities with auto-removal at 0
- **Cart Page** - Full cart management with order summary, tax calculation, and checkout simulation
- **Toast Notifications** - User feedback for all cart actions

### 🎨 **User Interface**

- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Loading States** - Beautiful skeleton UI with Suspense boundaries
- **Interactive Elements** - Hover effects, transitions, and micro-animations
- **Toast Notifications** - React Hot Toast for user feedback
- **Clean Navigation** - Header with logo, search, cart badge, and user avatar

### 📱 **Pages & Navigation**

- **Home Page (/)** - Product listing with sidebar filters
- **Product Detail (/product/[id])** - Detailed product view with reviews
- **Cart Page (/cart)** - Shopping cart management and checkout
- **404 Handling** - Proper error boundaries and fallbacks

## 🛠️ Tech Stack

### **Frontend Framework**

- **Next.js 14** - App Router with TypeScript
- **React 18** - Latest React features with hooks
- **TypeScript** - Full type safety throughout the application

### **Styling & UI**

- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful, customizable icons
- **Custom Color Scheme** - Primary, secondary, light, and dark variants

### **State Management**

- **Zustand** - Lightweight state management for cart functionality
- **Persistent Storage** - Cart state saved to localStorage
- **Real-time Synchronization** - State updates across components

### **User Experience**

- **React Hot Toast** - Elegant toast notifications
- **Suspense Boundaries** - Proper loading states and error handling
- **URL State Management** - Filters and search reflected in URLs

## 📁 Project Structure

```
├── app/
│   ├── cart/
│   │   └── page.tsx                 # Shopping cart page
│   ├── product/[id]/
│   │   └── page.tsx                 # Product detail page
│   ├── globals.css                  # Global styles
│   ├── layout.tsx                   # Root layout with header/footer
│   └── page.tsx                     # Home page with Suspense
├── components/
│   ├── Footer.tsx                   # Application footer
│   ├── Header.tsx                   # Navigation with search and cart
│   ├── HomeContent.tsx              # Home page content component
│   ├── ProductGrid.tsx              # Product listing with filters
│   └── Sidebar.tsx                  # Filter sidebar component
├── store/
│   └── cartStore.ts                 # Zustand cart state management
├── data.json                        # Product data with reviews
├── tailwind.config.js               # Tailwind configuration
└── package.json                     # Dependencies and scripts
```

## 🚀 Getting Started

### **Prerequisites**

- Node.js 18+
- npm or yarn package manager

### **Installation**

1. **Clone the repository**

   ```bash
   git clone <https://github.com/Surjendu-kar/Whatbytes>
   cd ecommerce-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Install required packages**

   ```bash
   npm install zustand react-hot-toast lucide-react
   ```

4. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Key Features Breakdown

### **Product Filtering**

- **URL Examples:**
  - `/?category=electronics` - Electronics only
  - `/?price=0-500` - Products under $500
  - `/?brands=apple,samsung` - Apple and Samsung products
  - `/?search=running&category=clothing` - Search "running" in clothing

### **Cart Functionality**

- **Add to Cart** - Click to add items
- **Quantity Controls** - Replace add button with +/- controls
- **Auto-removal** - Items removed when quantity reaches 0
- **Persistent Storage** - Cart survives browser refresh
- **Real-time Badge** - Header cart count updates instantly

### **Search System**

- **Header Search** - Available on home page only
- **Real-time Results** - Updates as you type
- **Multi-field Search** - Searches title, description, brand, category
- **URL Integration** - Search terms appear in URL for sharing

### **Product Reviews**

- **Rating System** - 5-star ratings with partial stars
- **Review Display** - User reviews with avatars and dates
- **Rating Breakdown** - Visual distribution of star ratings
- **Expandable Reviews** - Show/hide all reviews functionality

## 🎨 Customization

### **Colors (tailwind.config.js)**

```javascript
colors: {
  primary: "#0d4e9c",      // Main blue
  secondary: "#152657",     // Dark blue
  light: "#93c5fd",        // Light blue
  dark: "#10204e",         // Very dark blue
}
```

### **Product Data Structure**

```json
{
  "id": 1,
  "title": "Product Name",
  "price": 99,
  "category": "Electronics",
  "image": "image-url",
  "description": "Product description",
  "rating": 4.5,
  "brand": "Brand Name",
  "reviews": [
    {
      "id": 1,
      "user": "User Name",
      "rating": 5,
      "date": "2024-03-15",
      "comment": "Review comment"
    }
  ]
}
```
