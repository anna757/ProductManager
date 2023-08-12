# product-manager
Product Manager project for my Bachelor's Thesis in Electronic Engineering.
The goal is to demonstrate the process of front-end web development without the use of AI.
The stack is going to be React.js with Material UI for faster development.

## Requirements: 
### 1. Login Page
- **Description**: The main access point to the platform.
- **Features**:
  - Requires a username and password for authentication.
  - If login credentials are incorrect, a validation message is displayed.
  - Default username and password - stored in localStorage (no need for backend integration).
  - After logging out, the user is redirected back to the login page.

### 2. Product List - The main page
- **Description**: Displays a list of all products from the seller's perspective in an organized list with the following details:
  - Product Name
  - Price
  - Category
  - Image
  - Buttons (View/Delete)
- **Features**:
  - Users can search for products by name or type.
  - Perhaps Choosing Categories

### 3. Product Details
- **Description**: Displays detailed information about a selected product.
- **Features**:
  - Allows editing of product details.
  - Product images can be enlarged by clicking on them, opening a modal.

### 4. Product Form
- **Description**: Allows adding new products or editing existing ones.
- **Features**:
  - The form should have validation (Every product should have at least a name, image, and price)
  - Users should be allowed to change everything about a product (Name, Category, Price, Image, etc...)

![Sequence Diagram](https://github.com/anna757/ProductManager/assets/72200944/6b311661-e06c-40a2-9216-86855f3be626)
