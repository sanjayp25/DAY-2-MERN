# 🎯 Enhanced MERN Portfolio Application

A complete full-stack portfolio management system with user authentication, personalization, and project showcase capabilities.

## ✨ Features

### 🔐 **Authentication System**
- **User Registration (Signup)**: Create accounts with email validation and password confirmation
- **Secure Login**: Email/password authentication with bcryptjs password hashing
- **Session Management**: JWT-based cookie authentication with 7-day session expiry
- **Logout**: Clear session and cookies securely

### 👤 **User Profiles**
- **Profile Management**: Edit name, title, bio, location, skills, and social links
- **Social Integration**: Connect GitHub, LinkedIn, and personal website links
- **Professional Info**: Add professional title, skills, and location
- **Avatar Support**: User profile pictures with placeholder defaults
- **Public Portfolio View**: Share your portfolio with unique profile URLs

### 📊 **Dashboard**
- **Personal Dashboard**: View all your projects in one place
- **Project Count**: See total number of published projects
- **Quick Actions**: Add, view, or delete projects from dashboard
- **User Stats**: Display profile completion status and portfolio metrics

### 🎨 **Portfolio Features**
- **Project Management**: Create, view, and delete portfolio projects
- **Project Details**: Title, description, technologies used, live demo link, and GitHub repository
- **Public Projects Listing**: All projects displayed with filters and sorting
- **Project Showcase**: Beautiful project cards with technology badges
- **User Association**: Each project linked to the creator's profile

### 🌍 **Public Features**
- **Portfolio Homepage**: Professional landing page with hero section
- **Projects Showcase**: Browse all projects from all users
- **About Section**: Learn more about portfolio owners
- **Contact Form**: Get in touch with portfolio creators
- **User Portfolios**: View individual user portfolios with their projects

### 🎨 **Design**
- **Dark Modern Theme**: Professional dark mode interface with gradient accents
- **Responsive Design**: Fully responsive on mobile, tablet, and desktop
- **Smooth Animations**: Hover effects and transitions for better UX
- **Color Scheme**: 
  - Primary: `#00d4ff` (Cyan)
  - Accent: `#0066ff` (Blue)
  - Background: `#0f1419` (Dark Navy)

## 🛠️ **Tech Stack**

### Backend
- **Node.js & Express.js v4.18.2**: Server and routing
- **MongoDB**: NoSQL database for data persistence
- **Mongoose v7.0.0**: MongoDB ODM for schema management
- **bcryptjs v2.4.3**: Password hashing and encryption
- **jsonwebtoken v9.0.0**: JWT token generation and verification
- **cookie-parser v1.4.6**: Cookie parsing middleware
- **Handlebars (HBS)**: Server-side templating

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Custom styling with gradients and animations
- **Vanilla JavaScript**: Client-side interactivity
- **Font Awesome 6.4.0**: Icon library
- **Bootstrap Icons**: Additional icons

## 📁 **Project Structure**

```
CRUD/
├── src/
│   ├── server.js          # Express server with all routes
│   └── mongo.js           # MongoDB schemas (Portfolio & User)
├── templates/
│   ├── home.hbs           # Landing page with user nav
│   ├── login.hbs          # Login form
│   ├── signup.hbs         # Registration form
│   ├── profile.hbs        # User profile edit form
│   ├── dashboard.hbs      # Personal dashboard
│   ├── user-portfolio.hbs # Public portfolio view
│   ├── projects.hbs       # All projects listing
│   ├── project-detail.hbs # Single project details
│   ├── add-project.hbs    # Add new project form
│   ├── about.hbs          # About page
│   └── contact.hbs        # Contact form
├── public/
│   └── css/               # Stylesheet files
├── package.json           # Dependencies
└── seed.js               # Sample data seeding
```

## 🗄️ **Database Models**

### User Schema
```javascript
{
  username: String (unique),
  email: String (unique),
  password: String (hashed),
  name: String,
  title: String (professional title),
  bio: String,
  avatar: String (URL),
  location: String,
  skills: String (comma-separated),
  website: String (URL),
  github: String (URL),
  linkedin: String (URL),
  createdAt: Date
}
```

### Portfolio Schema
```javascript
{
  title: String,
  description: String,
  technologies: String,
  link: String (demo URL),
  github: String (repo URL),
  userId: ObjectId (reference to User),
  createdAt: Date
}
```

## 🚀 **Getting Started**

### Prerequisites
- Node.js (v14+)
- MongoDB (running locally on port 27017)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/sanjayp25/DAY-2-MERN.git
cd CRUD
```

2. **Install dependencies**
```bash
npm install
```

3. **Start MongoDB**
```bash
mongod
```

4. **Run the server**
```bash
npm start
```

5. **Seed sample data (optional)**
```bash
node seed.js
```

6. **Open in browser**
```
http://localhost:3000
```

## 📚 **API Routes**

### Authentication Routes
- `GET /signup` - Show signup form
- `POST /signup` - Register new user
- `GET /login` - Show login form
- `POST /login` - Authenticate user
- `GET /logout` - Clear session

### User Routes
- `GET /profile/:id` - Show user profile edit form
- `POST /profile/:id` - Update user profile
- `GET /dashboard` - User's personal dashboard
- `GET /portfolio/:userId` - View public user portfolio

### Portfolio Routes
- `GET /` - Home page
- `GET /about` - About page
- `GET /projects` - All projects listing
- `GET /project/:id` - Single project details
- `GET /add-project` - Show add project form
- `POST /add-project` - Create new project (requires login)
- `POST /delete-project/:id` - Delete project
- `GET /contact` - Contact form
- `POST /contact` - Submit contact form

## 🔒 **Security Features**

- **Password Hashing**: bcryptjs with 8 salt rounds
- **JWT Tokens**: Secure token-based authentication
- **HTTP-Only Cookies**: Token stored in HTTP-only cookies
- **Input Validation**: Server-side validation for all forms
- **Session Expiry**: 7-day automatic session expiration
- **CORS Protection**: Request validation

## 🎓 **Usage Examples**

### Sign Up
1. Click "Sign Up" in navigation
2. Enter username, email, password
3. Confirm password
4. Click "Register"

### Login & Dashboard
1. Click "Login"
2. Enter email and password
3. On success, redirected to profile
4. Click "Dashboard" to view all your projects
5. Add new projects from dashboard

### Create Project
1. Go to Dashboard or click "Add Project"
2. Fill in project details
3. Add technologies (comma-separated)
4. Provide demo link and GitHub URL
5. Click "Add Project"

### View Public Portfolio
1. From any project card or dashboard
2. Click "View Portfolio" from user dropdown
3. See all your projects publicly
4. Share your portfolio URL with others

## 🌐 **Live Features**

### Navigation with User Status
- **Not Logged In**: See Login & Sign Up buttons
- **Logged In**: User avatar dropdown with quick links
  - Dashboard
  - Edit Profile
  - View Portfolio
  - Logout

### Responsive Dropdown Menu
- Hover over user avatar to see options
- Mobile-friendly touch interactions
- Quick navigation to key sections

### Public Portfolio URLs
- Share unique portfolio URLs: `/portfolio/:userId`
- Display user info, skills, and projects
- Social media links (if provided)
- Professional showcase format

## 📊 **Sample Projects**

The application comes with 6 pre-loaded sample projects:
1. **E-Commerce Platform** - Full-stack shopping solution
2. **Task Management App** - Productivity tool
3. **Weather Dashboard** - Real-time weather data
4. **Social Analytics** - Social media insights
5. **Blog Platform** - Content management
6. **AI Chat Assistant** - Conversational AI

## 🐛 **Troubleshooting**

### Server won't start
- Ensure MongoDB is running
- Check port 3000 is not in use
- Verify all dependencies are installed

### Login not working
- Check MongoDB connection
- Verify user exists in database
- Check password hashing is working

### Projects not showing
- Ensure projects are created with valid userId
- Check database connection
- Verify project data in MongoDB

## 📝 **Environment Variables**

Currently configured for local development. For production, add `.env` file:

```
MONGODB_URI=mongodb://localhost:27017/PortfolioDB
PORT=3000
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

## 🎯 **Future Enhancements**

- [ ] File upload for profile pictures
- [ ] Email verification
- [ ] Password reset functionality
- [ ] Project filtering and search
- [ ] Comments on projects
- [ ] Project likes/stars
- [ ] Admin dashboard
- [ ] Analytics and metrics
- [ ] Dark/light theme toggle
- [ ] Multi-language support

## 📄 **License**

This project is open source and available under the ISC License.

## 👨‍💼 **Author**

**Sanjay P**
- GitHub: [@sanjayp25](https://github.com/sanjayp25)
- Repository: [DAY-2-MERN](https://github.com/sanjayp25/DAY-2-MERN)

## 🙏 **Acknowledgments**

- Font Awesome for icons
- Bootstrap for responsive design concepts
- MERN Stack community for best practices
- MongoDB for database solutions

---

**Last Updated**: December 18, 2025  
**Version**: 2.0.0 (Enhanced Portfolio Release)

For questions or contributions, please open an issue or submit a pull request!
