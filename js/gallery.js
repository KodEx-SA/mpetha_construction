/* ===================================
   GALLERY LIGHTBOX FUNCTIONALITY
   =================================== */

// ========== GALLERY CONFIGURATION ==========
const galleryImages = [
    {
        src: 'images/projects/project1.jpg',
        title: 'Modern Residential Home',
        category: 'House Building',
        description: 'Complete residential construction project featuring modern architecture and quality finishes.'
    },
    {
        src: 'images/projects/project2.jpg',
        title: 'Interior Wall Finishing',
        category: 'Wall Decoration',
        description: 'Professional wall decoration and finishing services with modern textures and patterns.'
    },
    {
        src: 'images/projects/project3.jpg',
        title: 'Commercial Paint Job',
        category: 'Painting',
        description: 'High-quality commercial painting project with premium materials and expert application.'
    }
];

let currentImageIndex = 0;

// ========== LIGHTBOX FUNCTIONS ==========

// Open lightbox with specific image
function openLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');

    if (lightbox) {
        lightbox.classList.add('active');
        displayLightboxImage(index);

        // Prevent body scroll when lightbox is open
        document.body.style.overflow = 'hidden';

        // Add keyboard navigation
        document.addEventListener('keydown', handleLightboxKeyboard);
    }
}

// Close lightbox
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');

    if (lightbox) {
        lightbox.classList.remove('active');

        // Re-enable body scroll
        document.body.style.overflow = '';

        // Remove keyboard navigation
        document.removeEventListener('keydown', handleLightboxKeyboard);
    }
}

// Display image in lightbox
function displayLightboxImage(index) {
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');

    if (galleryImages[index]) {
        const image = galleryImages[index];

        // Fade out current image
        if (lightboxImage) {
            lightboxImage.style.opacity = '0';

            setTimeout(() => {
                lightboxImage.src = image.src;
                lightboxImage.alt = image.title;

                // Fade in new image
                lightboxImage.style.opacity = '1';
            }, 300);
        }

        // Update caption
        if (lightboxCaption) {
            lightboxCaption.innerHTML = `
                <h3>${image.title}</h3>
                <p class="category">${image.category}</p>
                <p class="description">${image.description}</p>
                <p class="image-counter">${index + 1} / ${galleryImages.length}</p>
            `;
        }
    }
}

// Change lightbox image (next/previous)
function changeLightboxImage(direction) {
    currentImageIndex += direction;

    // Loop around if at the end or beginning
    if (currentImageIndex >= galleryImages.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = galleryImages.length - 1;
    }

    displayLightboxImage(currentImageIndex);
}

// Handle keyboard navigation
function handleLightboxKeyboard(e) {
    switch (e.key) {
        case 'Escape':
            closeLightbox();
            break;
        case 'ArrowLeft':
            changeLightboxImage(-1);
            break;
        case 'ArrowRight':
            changeLightboxImage(1);
            break;
    }
}

// ========== CLICK OUTSIDE TO CLOSE ==========
document.addEventListener('DOMContentLoaded', function () {
    const lightbox = document.getElementById('lightbox');

    if (lightbox) {
        lightbox.addEventListener('click', function (e) {
            // Close if clicking on the overlay (not the content)
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // Add smooth transition to lightbox image
    const lightboxImage = document.getElementById('lightboxImage');
    if (lightboxImage) {
        lightboxImage.style.transition = 'opacity 0.3s ease';
    }

    // Initialize gallery filters (optional)
    initGalleryFilters();
});

// ========== GALLERY FILTERS (OPTIONAL) ==========
function initGalleryFilters() {
    // This can be expanded to add filtering functionality
    // For example, filter by service category

    const projectCards = document.querySelectorAll('.project-card');

    // Add data attributes for filtering
    projectCards.forEach((card, index) => {
        const category = galleryImages[index] ? galleryImages[index].category : '';
        card.setAttribute('data-category', category.toLowerCase().replace(/\s+/g, '-'));
    });
}

// Filter projects by category
function filterProjects(category) {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'block';
            // Add fade-in animation
            card.style.animation = 'fadeIn 0.5s ease';
        } else {
            card.style.display = 'none';
        }
    });
}

// ========== TOUCH SWIPE SUPPORT FOR MOBILE ==========
let touchStartX = 0;
let touchEndX = 0;

function handleTouchStart(e) {
    touchStartX = e.changedTouches[0].screenX;
}

function handleTouchEnd(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}

function handleSwipe() {
    const swipeThreshold = 50; // Minimum distance for swipe

    if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe left - next image
        changeLightboxImage(1);
    }

    if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe right - previous image
        changeLightboxImage(-1);
    }
}

// Add touch event listeners
document.addEventListener('DOMContentLoaded', function () {
    const lightboxContent = document.querySelector('.lightbox-content');

    if (lightboxContent) {
        lightboxContent.addEventListener('touchstart', handleTouchStart, false);
        lightboxContent.addEventListener('touchend', handleTouchEnd, false);
    }
});

// ========== IMAGE PRELOADING ==========
function preloadImages() {
    galleryImages.forEach(image => {
        const img = new Image();
        img.src = image.src;
    });
}

// Preload images when page loads
document.addEventListener('DOMContentLoaded', preloadImages);

// ========== LAZY LOADING FOR GALLERY IMAGES ==========
function initLazyLoading() {
    const images = document.querySelectorAll('.project-image img');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.src; // Trigger loading
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

document.addEventListener('DOMContentLoaded', initLazyLoading);

// ========== GALLERY GRID ANIMATION ==========
document.addEventListener('DOMContentLoaded', function () {
    const projectCards = document.querySelectorAll('.project-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100); // Stagger animation
            }
        });
    }, { threshold: 0.1 });

    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// ========== ADDITIONAL GALLERY FEATURES ==========

// Add zoom on hover for project images
function addImageZoom() {
    const projectImages = document.querySelectorAll('.project-image img');

    projectImages.forEach(img => {
        img.style.transition = 'transform 0.5s ease';

        img.parentElement.addEventListener('mouseenter', () => {
            img.style.transform = 'scale(1.1)';
        });

        img.parentElement.addEventListener('mouseleave', () => {
            img.style.transform = 'scale(1)';
        });
    });
}

document.addEventListener('DOMContentLoaded', addImageZoom);

// Download image function (optional)
function downloadImage(imageUrl, imageName) {
    fetch(imageUrl)
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = imageName;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        })
        .catch(error => console.error('Download error:', error));
}

// Share image function (optional)
function shareImage(imageUrl, title) {
    if (navigator.share) {
        navigator.share({
            title: title,
            url: imageUrl
        })
            .then(() => console.log('Successfully shared'))
            .catch(error => console.log('Error sharing:', error));
    } else {
        // Fallback: Copy URL to clipboard
        navigator.clipboard.writeText(imageUrl)
            .then(() => alert('Image URL copied to clipboard!'))
            .catch(err => console.error('Could not copy URL:', err));
    }
}

// ========== CONSOLE LOG ==========
console.log('Gallery functionality loaded successfully');
console.log(`Total gallery images: ${galleryImages.length}`);