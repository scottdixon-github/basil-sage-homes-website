# Basil & Sage Homes - Property Rental Website

Professional property management and rental homes website for Ladson, SC area.

## 🏗️ Project Structure

```
├── index.html              # Homepage
├── pages/                  # All internal pages
│   ├── properties/        # Individual property listings
│   ├── about.html
│   ├── contact.html
│   ├── features.html
│   ├── listings.html
│   ├── testimonials.html
│   └── ...
├── assets/                 # Static assets
│   ├── css/               # Stylesheets
│   ├── js/                # JavaScript files
│   ├── images/            # Images and logos
│   └── videos/            # Video files
├── server/                 # Backend server
│   ├── server.js          # Express server
│   ├── package.json       # Server dependencies
│   └── .env              # Environment variables (not in git)
├── .htaccess              # Apache configuration
├── robots.txt             # SEO robots file
└── sitemap.xml            # SEO sitemap

```

## 🚀 Features

- **Responsive Design**: Mobile-first approach with modern UI
- **Property Listings**: Dynamic property showcase with filtering
- **Contact Forms**: Lead generation with backend integration
- **SEO Optimized**: Meta tags, structured data, and sitemap
- **Interactive Maps**: Property location visualization
- **Testimonials**: Customer reviews and ratings
- **AI Chat Support**: Integrated chat functionality

## 💻 Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript
- **Backend**: Node.js, Express
- **Database**: SQLite
- **Styling**: Custom CSS with responsive design
- **SEO**: Schema.org structured data, Open Graph tags

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd "Website for Demo"
```

2. Install server dependencies:
```bash
cd server
npm install
```

3. Create a `.env` file in the server directory with your configuration:
```
PORT=3000
# Add other environment variables as needed
```

4. Start the server:
```bash
npm start
```

5. Open `index.html` in your browser or serve via a web server

## 📦 Deployment

### Hostinger Deployment
See `HOSTINGER_DEPLOYMENT_GUIDE.md` for detailed deployment instructions.

### General Deployment
1. Upload all files to your web server
2. Ensure `.htaccess` is properly configured
3. Set up the Node.js backend on your hosting
4. Configure environment variables
5. Update database permissions

## 🔧 Configuration

- **Server Port**: Configure in `server/.env`
- **Database**: SQLite database at `server/leads.db`
- **Contact Form**: Update endpoint in contact form JavaScript

## 📱 Pages

- **Home**: Main landing page with hero video
- **Listings**: Browse available properties
- **Property Details**: Individual property pages
- **Features**: Property management features
- **Testimonials**: Customer reviews
- **About**: Company information
- **Contact**: Contact form and information
- **FAQ**: Frequently asked questions
- **Legal**: Privacy policy, terms, cookies

## 🎨 Customization

- **Styling**: Edit CSS files in `assets/css/`
- **Scripts**: Modify JavaScript in `assets/js/`
- **Content**: Update HTML files in root and `pages/`
- **Images**: Replace images in `assets/images/`

## 📄 License

All rights reserved - Basil & Sage Homes

## 📞 Contact

For questions or support, visit the contact page or reach out to the development team.
