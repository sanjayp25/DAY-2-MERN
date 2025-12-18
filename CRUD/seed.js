const mongoose = require('mongoose');
const Portfolio = require('./src/mongo');

const sampleProjects = [
    {
        title: "E-Commerce Platform",
        description: "A full-featured e-commerce platform with product catalog, shopping cart, and payment integration. Built with React and Node.js, featuring real-time inventory management and user authentication.",
        technologies: "React, Node.js, MongoDB, Stripe, JWT",
        link: "https://example-ecommerce.com",
        github: "https://github.com/johndoe/ecommerce-platform"
    },
    {
        title: "Task Management App",
        description: "A collaborative task management application that allows teams to organize and track projects. Features include real-time updates, task assignments, and progress tracking.",
        technologies: "React, Express, MongoDB, Socket.io",
        link: "https://example-tasks.com",
        github: "https://github.com/johndoe/task-manager"
    },
    {
        title: "Weather Dashboard",
        description: "A responsive weather application that displays current weather, forecasts, and historical data. Integrates with multiple weather APIs and provides beautiful visualizations.",
        technologies: "React, API Integration, Chart.js, CSS3",
        link: "https://example-weather.com",
        github: "https://github.com/johndoe/weather-dashboard"
    },
    {
        title: "Social Media Analytics",
        description: "Analytics dashboard for tracking social media performance across multiple platforms. Real-time metrics, detailed reports, and custom visualizations for data-driven insights.",
        technologies: "React, Node.js, MongoDB, D3.js, PostgreSQL",
        link: "https://example-analytics.com",
        github: "https://github.com/johndoe/social-analytics"
    },
    {
        title: "Blog Platform",
        description: "A modern blogging platform with markdown support, categories, tags, and commenting system. Includes SEO optimization and social media integration for content distribution.",
        technologies: "Next.js, Node.js, MongoDB, Redis, Markdown",
        link: "https://example-blog.com",
        github: "https://github.com/johndoe/blog-platform"
    },
    {
        title: "AI Chat Application",
        description: "An intelligent chatbot application powered by AI. Features natural language processing, multi-language support, and integration with various services for enhanced functionality.",
        technologies: "React, Python, TensorFlow, Node.js, WebSocket",
        link: "https://example-chatbot.com",
        github: "https://github.com/johndoe/ai-chatbot"
    }
];

async function seedDatabase() {
    try {
        await mongoose.connect('mongodb://localhost:27017/PortfolioDB');
        console.log('Connected to MongoDB');

        // Clear existing projects
        await Portfolio.deleteMany({});
        console.log('Cleared existing projects');

        // Insert sample projects
        const result = await Portfolio.insertMany(sampleProjects);
        console.log(`Successfully added ${result.length} projects to the database`);

        // Display inserted projects
        console.log('\nInserted Projects:');
        result.forEach((project, index) => {
            console.log(`${index + 1}. ${project.title}`);
        });

        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();
