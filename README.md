The demo video link is : https://drive.google.com/drive/folders/1jcfoMDu58AtXjLnVjrGSAcDe-KTJbDee?usp=sharing

1. Introduction
• Project Title: House Rent Application
• Team Members:
1. Deepak Raja R.A
2. Sairam M
3. Nikesh K
4. Omkirupanjan R
5. Vishnu Vardhan Reddy K
2. Project Overview
• Purpose: The House Rent Application aims to streamline the rental process for
landlords and tenants by providing a centralized, easy-to-use platform. The goal is to
connect property owners with potential renters, ensuring a seamless experience for
managing property listings, rental inquiries, and transactions.
• Features:
• User Authentication:
Secure registration and login for both landlords and tenants using JWT.
Role-based access control.
• Property Listings:
rental details.
Create, update, and delete property listings with images, descriptions, and
• Search and Filter:
Advanced search functionality based on location, rent range, and property type.
• User Dashboard:
Landlords: View and manage property listings and tenant inquiries.
Tenants: Track inquiries and view saved properties.
• Inquiry Management:
Tenants can send inquiries directly to landlords.
Landlords can manage and respond to inquiries.
• Responsive Design:
Optimized for desktop, tablet, and mobile devices.
• Database Management:
MongoDB stores user information, property details, and messages securely.
• Deployment:
The application is deployed on Vercel for frontend and backend hosting.
• Goals:
❖ Enable landlords to list properties effortlessly with detailed descriptions and images.
❖ Allow tenants to search, filter, and inquire about properties that meet their needs.
❖ Facilitate a smooth communication channel between landlords and tenants.
❖ Provide a responsive and secure platform accessible on various devices.
`
3. Architecture
Frontend Architecture
Technology: React.js
Component-Based Design:
• The frontend is structured using React components for modularity and reusability.
o Core Components:
▪ Header & Footer: Navigation and branding.
▪ Home Page: Displays featured properties and search functionality.
▪ Property Details Page: Detailed view of a selected property with
images, description, and contact options.
▪ Dashboard: User-specific functionalities such as managing listings
(landlords) or inquiries (tenants).
• State Management:
o React Context API is used to manage global state (e.g., user authentication
status).
o Local state is handled within individual components for UI interactions.
• Routing:
o React Router manages navigation across pages, enabling dynamic content
loading without full-page refresh.
• Styling:
o CSS Frameworks: Tailwind CSS for modern, responsive UI design.
o Custom CSS is used for specific components.
Backend Architecture
Technology: Node.js and Express.js
• Server-Side Framework:
o Express.js handles HTTP requests and defines API routes.
o Middleware for authentication, logging, and error handling.
• API Endpoints:
o User Authentication:
▪ POST /api/auth/register - User registration.
▪ POST /api/auth/login - User login with JWT token generation.
o Property Management:
▪ GET /api/properties - Fetch all properties.
▪ POST /api/properties - Add a new property (landlord role).
▪ PUT /api/properties/:id - Update property details.
▪ DELETE /api/properties/:id - Remove a property.
o Inquiries:
▪ POST /api/inquiries - Submit an inquiry.
▪ GET /api/inquiries/:userId - Fetch inquiries for a specific
user.
• Authentication & Security:
o JWT (JSON Web Token) ensures secure access to protected routes.
o Passwords are hashed using bcrypt.
• Database Schema & Interactions
Technology: MongoDB
Database Design:
The database uses a NoSQL structure with collections for users, properties, and
inquiries.
User Schema:
{
"_id": ObjectId,
"name": String,
"email": String,
"password": String (hashed),
"role": String ("landlord" or "tenant"),
"createdAt": Date,
"updatedAt": Date
}
Property Schema:
{
"_id": ObjectId,
"title": String,
"description": String,
"price": Number,
"location": String,
"images": [String],
"owner": ObjectId (ref: User),
"createdAt": Date,
"updatedAt": Date
}
Inquiry Schema:
{
"_id": ObjectId,
"propertyId": ObjectId (ref: Property),
"senderId": ObjectId (ref: User),
"message": String,
"createdAt": Date
}
• Database Interactions:
Mongoose ORM is used for schema definition and database operations.
CRUD operations (Create, Read, Update, Delete) are performed through
Mongoose methods.
• Data Security:
• Password Hashing: Passwords are stored securely using bcrypt
hashing.
• Data Validation: Data is validated on both frontend and backend to
ensure data integrity and prevent SQL injection or other attacks.
4. Setup Instructions
• Prerequisites:
Before setting up the project, ensure you have the following software
dependencies installed:
• Node.js (v14.x or later
• MongoDB
• Git (for cloning the repository)
• Installation: Follow these steps to set up the project on your local machine:
• Clone the Repository: git clone <repository-url>
• Navigate into the project directory: cd <project-directory>
• Install backend Dependencies: cd backend & npm install
• Install frontend dependencies: cd ../frontend & npm install
• Set Up Environment Variables: In the backend directory, create a .env file to store
your environment variables. Add the following variables to your .env file:
• DB_URI=<your-mongodb-connection-string>
• JWT_SECRET=<your-jwt-secret-key>
• PORT=<port-for-backend-server>
• Run the Development Servers:
• Start the backend server: cd backend & npm start
• Start the frontend server: cd ../frontend & npm run dev
• Access the Application: Open your browser and go to http://localhost:3000 to view
the frontend. The backend server should be running on http://localhost:5000 (or the
port specified in your .env file).
5. Folder Structure
• Client:
The React frontend is structured to ensure modularity, scalability, and ease of maintenance.
Below is an overview of the folder structure:
/frontend
/public
index.html # Main HTML file
favicon.ico # App icon
assets # Static images and assets
/src
/components # Reusable React components
Navbar.js # Navigation bar component
PropertyCard.js # Individual property display card
Footer.js # Footer component
/pages # Page components for routing
Home.js # Homepage
PropertyDetails.js # Detailed view of a property
Dashboard.js # User-specific dashboard
Login.js # Login page
/context # Context API for state management
AuthContext.js # Authentication state handling
/utils # Helper functions (e.g., API calls)
api.js # Axios instance for API requests
App.js # Main React app component
index.js # React DOM rendering entry point
styles.css # Global CSS styles
• Server:
/backend
/config
db.js # Database connection setup
/controllers # Logic for handling API requests
authController.js # User authentication logic
propertyController.js # Property-related functionality
inquiryController.js # Inquiry management logic
/models # Mongoose schemas
User.js # User schema
Property.js # Property schema
Inquiry.js # Inquiry schema
/routes # API endpoints
authRoutes.js # Routes for authentication
propertyRoutes.js # Routes for property management
inquiryRoutes.js # Routes for inquiries
/middleware # Middleware for security and validation
authMiddleware.js # JWT authentication verification
errorHandler.js # Centralized error handling
/utils # Utility functions
tokenGenerator.js # JWT token creation
.env # Environment variables
server.js # Entry point for the backend server
package.json # Backend dependencies
6. Running the Application
• Installation: Follow these steps to set up the project on your local machine:
• Clone the Repository: git clone <repository-url>
• Navigate into the project directory: cd <project-directory>
• Install backend Dependencies: cd backend & npm install
• Install frontend dependencies: cd ../frontend & npm install
• Set Up Environment Variables: In the backend directory, create a .env file to store
your environment variables. Add the following variables to your .env file:
• DB_URI=<your-mongodb-connection-string>
• JWT_SECRET=<your-jwt-secret-key>
• PORT=<port-for-backend-server>
• Run the Development Servers:
• Start the backend server: cd backend & npm start
• Start the frontend server: cd ../frontend & npm run dev
• Access the Application: Open your browser and go to http://localhost:3000 to view
the frontend. The backend server should be running on http://localhost:5000 (or the
port specified in your .env file).
7. API Documentation
1. Register a User
o Endpoint: POST /api/auth/register
o Description: Registers a new user.
o Request Body:
{
"name": "John Doe",
"email": "john@example.com",
"password": "password123",
"role": "tenant"
}
{
o Response:
"message": "User registered successfully",
"user": {
"id": "64d2f8b1f8f8a5",
"name": "John Doe",
"email": "john@example.com",
"role": "tenant"
}
}
2. Login a User
o Endpoint: POST /api/auth/login
o Description: Logs in a user and returns a JWT token.
o Request Body:
{
"email": "john@example.com",
"password": "password123"
o Response:
}
{
}
"token": "jwt_token_string"
Property Endpoints
3. Get All Properties
o Endpoint: GET /api/properties
o Description: Retrieves all property listings.
o Response:
[
{
"id": "64d3a8b1f9e1",
"title": "2 BHK Apartment",
"price": 1200,
"location": "New York",
"owner": "John Doe",
"createdAt": "2024-08-15T10:20:30Z"
}
]
4. Add a Property
o Endpoint: POST /api/properties
o Description: Adds a new property listing.
o Request Body:
{
"title": "3 BHK Villa",
"description": "A spacious villa with modern amenities.",
"price": 2500,
"location": "California"
o Response:
}
{
"message": "Property added successfully",
"property": {
"id": "64d4b2e1f9e2",
"title": "3 BHK Villa",
"price": 2500,
"location": "California"
}
}
5. Update a Property
o Endpoint: PUT /api/properties/:id
o Description: Updates a specific property listing.
o Request Body:
{
"price": 2600
}
o Response:
{
"message": "Property updated successfully"
}
6. Delete a Property
o Endpoint: DELETE /api/properties/:id
o Description: Deletes a specific property listing.
o Response:
{
"message": "Property deleted successfully"
}
Inquiry Endpoints
7. Create an Inquiry
o Endpoint: POST /api/inquiries
o Description: Submits an inquiry for a property.
o Request Body:
{
"propertyId": "64d3a8b1f9e1",
"message": "I am interested in this property."
}
o Response:
{
"message": "Inquiry submitted successfully"
}
8. Get User Inquiries
o Endpoint: GET /api/inquiries/:userId
o Description: Retrieves all inquiries for a specific user.
o Response:
[
{
"id": "64d5b2e1f9e3",
"propertyId": "64d3a8b1f9e1",
"message": "I am interested in this property."
}
]
8. Authentication:
• Role-Based Access: Users are assigned roles (tenant or landlord), and role-based
middleware ensures only authorized users can perform certain actions (e.g., only landlords
can add properties).
• Middleware:
• Auth Middleware:
Ensures that only authenticated users with valid tokens can access protected routes. Example:
JavaScript
const authMiddleware = (req, res, next) => {
const token = req.header("Authorization");
if (!token) return res.status(401).json({ message: "Access Denied" });
try {
const verified = jwt.verify(token, process.env.JWT_SECRET);
req.user = verified;
next();
} catch (err) {
res.status(400).json({ message: "Invalid Token" });
}
};
• Secure Data Handling:
Passwords are hashed using bcrypt before being stored in the database. Tokens are stored on the
client side (local Storage or cookies).
9. User Interface
10. Testing
Testing Strategy
1. Unit Testing
o Goal: Test individual components and functions.
o Tools:
▪ Jest for functions and backend routes.
▪ React Testing Library for React component interaction.
2. Integration Testing
o Goal: Ensure frontend and backend work together smoothly.
o Tools:
▪ Supertest for backend API requests.
▪ Jest to check data flow across components.
3. End-to-End (E2E) Testing
o Goal: Test complete user interactions, such as login and course management.
o Tools:
▪ Cypress to simulate full user journeys and interactions.
Testing Tools
• Jest: Main tool for unit and integration tests.
• React Testing Library: Tests React components from a user perspective.
• Supertest: Simulates HTTP requests to test backend APIs.
• Cypress: Tests the entire application as a user would interact with it.
Example Tests
• Unit: Calculate course progress function.
• Integration: Confirm course enrollment updates backend and frontend.
• E2E: Login, enroll in a course, and download a completion certificate.
Running Tests
• Frontend/Backend: npm test for Jest and Supertest tests.
• E2E: npx cypress open to start Cypress for end-to-end testing.
11. Demo
• Live Link: House Rent Application
Alternatively, consider recording a short GIF or video to demonstrate key flows like:
• Logging in as a user.
• Searching for properties.
• Adding or updating a property (landlord role).
• Submitting an inquiry (tenant role).
12. Known Issues
Here are the currently identified bugs or limitations in the application:
• Authentication Errors:
o Issue: Occasional delay in JWT token validation during login.
o Impact: Users may experience delayed page transitions after logging in.
• Image Upload Limitations:
o Issue: Limited support for large file sizes during property image uploads.
o Impact: Users may need to compress images manually before uploading.
• Search Functionality:
o Issue: Filtering by multiple criteria (e.g., price + location) may not work correctly in
some cases.
o Impact: Search results might not match the user's expectations.
• Dashboard Performance:
o Issue: Dashboards with many properties or inquiries may load slowly.
o Impact: User experience may degrade for landlords with extensive listings.
• Mobile View Responsiveness:
o Issue: Some components (e.g., property cards) may not scale perfectly on smaller
screens.
o Impact: Mobile users might experience minor layout issues.
13. Future Enhancements
Here are potential features and improvements planned for future iterations of the
project:
• Advanced Search Filters:
o Add support for additional criteria like property type, amenities, and
availability status.
• Image Optimization:
o Implement automatic image compression and support for more formats during
uploads.
• Real-Time Notifications:
o Notify landlords instantly when tenants submit inquiries using WebSockets or
services like Firebase.
• Payment Integration:
o Introduce payment gateways to enable rent transactions directly through the
platform.
• Reviews and Ratings:
o Allow tenants to leave reviews and ratings for properties or landlords,
improving user trust.
• Dark Mode:
o Add a theme toggle feature for dark and light modes.
• Multi-Language Support:
o Provide translations to cater to a global audience.
• Analytics for Landlords:
o Dashboard insights, such as most viewed properties and inquiry trends.
• Mobile App:
o Build a cross-platform mobile application using React Native for better
accessibility.
• Enhanced Security:
o Add features like two-factor authentication (2FA) and regular password
expiration prompts.
