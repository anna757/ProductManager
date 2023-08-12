# product-manager
Product Manager project for my Bachelor's Thesis in Electronic Engineering.
The goal is to demonstrate the process of front-end web development without the use of AI.

## Requirements: 
### 1. Login Page
- **Description**: The main access point to the platform.
- **Features**:
  - Requires a username and password for authentication.
  - If login credentials are incorrect, a validation message is displayed.
  - Default username and password - stored in localStorage (no need for backend integration).
  - After logging out, the user is redirected back to the login page.

### 2. Product List
- **Description**: Displays a list of all products with their details.
- **Features**:
  - Each product has options to view and delete.
  - Users can search for products by name or type.

### 3. Product Details
- **Description**: Displays detailed information about a selected product.
- **Features**:
  - Allows editing of product details.
  - Product images can be enlarged by clicking on them, opening a modal.

### 4. Product Form
- **Description**: Allows adding new products or editing existing ones.
- **Features**:
  - Users can upload images or replace existing images.
  - The form validates the product's name and price.

![Sequence Diagram](https://github.com/anna757/ProductManager/assets/72200944/6b311661-e06c-40a2-9216-86855f3be626)
