# Mpetha Construction Website

> Professional construction company website featuring house building, wall decoration, and painting services.

## 🏗️ Project Overview

A modern, responsive website built with HTML5, CSS3, and vanilla JavaScript for Mpetha Construction. The website showcases the company's services, portfolio, and provides an easy way for potential clients to get in touch.

## ✨ Features

### Core Features
- ✅ **Auto-Sliding Hero Carousel** - Dynamic image slider with 3 construction project images
- ✅ **Responsive Navigation** - Mobile-friendly hamburger menu
- ✅ **Animated Statistics** - Counter animation for company metrics
- ✅ **Service Showcase** - Detailed cards for each service offering
- ✅ **Project Gallery** - Lightbox gallery with fullscreen image viewing
- ✅ **Contact Form** - Validated form with real-time error checking
- ✅ **Smooth Scrolling** - Seamless navigation between sections
- ✅ **Scroll Animations** - Elements animate as you scroll down
- ✅ **Scroll-to-Top Button** - Quick navigation back to top
- ✅ **SEO Optimized** - Meta tags and semantic HTML structure
- ✅ **Fast Loading** - Optimized images and efficient code

### Technical Features
- Mobile-first responsive design
- Cross-browser compatible
- Accessible (WCAG standards)
- Modern ES6 JavaScript
- CSS Grid & Flexbox layouts
- Intersection Observer API for animations
- Form validation with regex patterns
- Touch swipe support for mobile gallery

## 📁 Project Structure

```
mpetha-construction/
│
├── index.html              # Main HTML file
│
├── css/
│   ├── style.css          # Main stylesheet
│   ├── responsive.css     # Mobile responsiveness
│   └── animations.css     # Animation effects
│
├── js/
│   ├── main.js           # Main JavaScript
│   ├── form-validation.js # Form handling
│   └── gallery.js        # Lightbox gallery
│
├── images/
│   ├── hero/             # Hero carousel images (3 images)
│   │   ├── slide1.jpg
│   │   ├── slide2.jpg
│   │   └── slide3.jpg
│   │
│   └── projects/         # Project gallery images
│       ├── project1.jpg
│       ├── project2.jpg
│       └── project3.jpg
│
└── README.md             # This file
```

## 🚀 Setup Instructions

### 1. Image Setup

**IMPORTANT:** Replace placeholder image paths with your actual images.

#### Hero Carousel Images (3 images)
Place your 3 construction project images in:
- `images/hero/slide1.jpg`
- `images/hero/slide2.jpg`
- `images/hero/slide3.jpg`

**Recommended specifications:**
- Format: JPG or WebP
- Size: 1920x1080px (Full HD)
- File size: < 500KB each (optimize for web)
- Quality: 80-85%

#### Project Gallery Images (3 images)
Place the same or different images in:
- `images/projects/project1.jpg`
- `images/projects/project2.jpg`
- `images/projects/project3.jpg`

**Recommended specifications:**
- Format: JPG
- Size: 1200x900px or 800x600px
- File size: < 300KB each
- Quality: 80-85%

### 2. Content Customization

#### Update Contact Information
Open `index.html` and search for these placeholders to update:

```html
<!-- Phone -->
<p>+27 XX XXX XXXX</p>

<!-- Email -->
<p>info@mpethaconstruction.co.za</p>

<!-- Location -->
<p>Rustenburg, South Africa</p>

<!-- Business Hours -->
<p>Mon - Fri: 8:00 AM - 5:00 PM</p>
<p>Sat: 9:00 AM - 1:00 PM</p>
```

#### Update Social Media Links
Find the social media section in `index.html`:

```html
<a href="#" class="social-icon"><i class="fab fa-facebook-f"></i></a>
<a href="#" class="social-icon"><i class="fab fa-instagram"></i></a>
<a href="#" class="social-icon"><i class="fab fa-linkedin-in"></i></a>
<a href="#" class="social-icon"><i class="fab fa-whatsapp"></i></a>
```

Replace `#` with actual social media URLs.

#### Add Company Logo (Optional)
To add a logo, replace the text logo in the navigation:

```html
<!-- Current: Text Logo -->
<div class="logo">
    <a href="index.html">
        <span class="logo-text">MPETHA</span>
        <span class="logo-subtext">CONSTRUCTION</span>
    </a>
</div>

<!-- Alternative: Image Logo -->
<div class="logo">
    <a href="index.html">
        <img src="images/logo/logo.png" alt="Mpetha Construction">
    </a>
</div>
```

### 3. Statistics Update

Update the numbers in the stats section to match real data:

```html
<h3 class="stat-number" data-target="150">0</h3> <!-- Projects Completed -->
<h3 class="stat-number" data-target="200">0</h3> <!-- Happy Clients -->
<h3 class="stat-number" data-target="5">0</h3>   <!-- Years Experience -->
<h3 class="stat-number" data-target="3">0</h3>   <!-- Service Offerings -->
```

### 4. Color Scheme Customization

To change colors, edit the CSS variables in `css/style.css`:

```css
:root {
    --primary-color: #FF6B35;      /* Main orange */
    --secondary-color: #004E89;    /* Professional blue */
    --accent-color: #F7B801;       /* Warning yellow */
    /* Change these values to match your brand */
}
```

## 🌐 Deployment

### Option 1: GitHub Pages (Free)
1. Create a GitHub repository
2. Push all files to the repository
3. Go to Settings → Pages
4. Select main branch as source
5. Your site will be live at `https://yourusername.github.io/repository-name`

### Option 2: Netlify (Free)
1. Create account at [netlify.com](https://netlify.com)
2. Drag and drop the project folder
3. Site goes live instantly with custom URL

### Option 3: Traditional Web Hosting
1. Upload all files to your hosting via FTP
2. Ensure index.html is in the root directory
3. Check that all file paths are correct

### Option 4: Vercel (Free)
1. Create account at [vercel.com](https://vercel.com)
2. Import from GitHub or upload files
3. Automatic deployment

## 📧 Contact Form Configuration

The contact form currently logs data to the console. To make it functional:

### Option 1: FormSpree (Easiest)
1. Sign up at [formspree.io](https://formspree.io)
2. Get your form endpoint
3. Update the form action in `index.html`:

```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST" class="contact-form" id="contactForm">
```

### Option 2: Email Service (EmailJS)
1. Sign up at [emailjs.com](https://emailjs.com)
2. Configure email template
3. Add EmailJS code to `js/form-validation.js`

### Option 3: Backend Integration
See the commented code in `js/form-validation.js` for API integration examples.

## 🎨 Image Optimization

Before uploading images, optimize them:

### Online Tools:
- [TinyPNG](https://tinypng.com) - PNG & JPG compression
- [Squoosh](https://squoosh.app) - Advanced image optimization
- [Compressor.io](https://compressor.io) - Online compression

### Desktop Tools:
- Adobe Photoshop - Save for Web
- GIMP (Free) - Export with quality settings
- ImageOptim (Mac) / FileOptimizer (Windows)

## 🔧 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Mobile Responsiveness

The website is fully responsive with breakpoints at:
- Desktop: 1200px+
- Laptop: 1024px
- Tablet: 768px
- Mobile: 480px and below

## ⚡ Performance Tips

1. **Optimize Images**: Compress all images before upload
2. **Enable Caching**: Configure server caching headers
3. **Minify Code**: Use tools to minify CSS/JS for production
4. **Use CDN**: Consider using a CDN for faster global delivery

## 🐛 Troubleshooting

### Images Not Showing
- Check file paths are correct
- Ensure images are in the correct folders
- Verify image file names match HTML references

### Form Not Working
- Check browser console for errors
- Verify form validation is working
- Ensure FormSpree or email service is configured

### Carousel Not Sliding
- Check that all 3 images exist
- Verify JavaScript is loading correctly
- Check browser console for errors

## 📞 Support

For technical support or customizations:
- Developer: Ashley K Koketso
- Email: motsieashley31@gmail.com
- GitHub: https://github.com/KodEx-SA/

## 📝 License

© 2025 Mpetha Construction. All rights reserved.

## 🔄 Future Updates

Planned features to add when electrical services launch:
- Additional service card for electrical work
- New certification badges
- Updated statistics
- Electrical project gallery

---

**Built with ❤️ by Ashley K Motsie**