
// Sample property data
const properties = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        price: "$1,200",
        title: "Modern Studio Apartment",
        location: "Downtown, New York",
        bedrooms: "studio",
        bathrooms: 1,
        area: 500,
        type: "studio",
        featured: true
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        price: "$1,800",
        title: "Cozy 1-Bedroom Flat",
        location: "Brooklyn, New York",
        bedrooms: 1,
        bathrooms: 1,
        area: 750,
        type: "1br",
        featured: true
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        price: "$2,500",
        title: "Spacious 2-Bedroom",
        location: "Manhattan, New York",
        bedrooms: 2,
        bathrooms: 2,
        area: 1200,
        type: "2br",
        featured: true
    },
    {
        id: 4,
        image: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        price: "$3,200",
        title: "Luxury 3-Bedroom Penthouse",
        location: "Upper East Side, New York",
        bedrooms: 3,
        bathrooms: 3,
        area: 1800,
        type: "3br",
        featured: true
    },
    {
        id: 5,
        image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        price: "$1,400",
        title: "Charming Studio Loft",
        location: "SoHo, New York",
        bedrooms: "studio",
        bathrooms: 1,
        area: 600,
        type: "studio",
        featured: false
    },
    {
        id: 6,
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        price: "$2,000",
        title: "Contemporary 1-Bedroom",
        location: "Queens, New York",
        bedrooms: 1,
        bathrooms: 1,
        area: 850,
        type: "1br",
        featured: false
    }
];

// DOM elements
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const propertiesGrid = document.getElementById('properties-grid');
const filterBtns = document.querySelectorAll('.filter-btn');

// Mobile navigation toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on menu items
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Property card creation
function createPropertyCard(property) {
    return `
        <div class="property-card" data-type="${property.type}">
            <div class="property-image">
                <img src="${property.image}" alt="${property.title}">
                ${property.featured ? '<div class="property-badge">Featured</div>' : ''}
            </div>
            <div class="property-info">
                <div class="property-price">${property.price}/month</div>
                <h3 class="property-title">${property.title}</h3>
                <div class="property-location">
                    <i class="fas fa-map-marker-alt"></i>
                    ${property.location}
                </div>
                <div class="property-features">
                    <div class="feature">
                        <i class="fas fa-bed"></i>
                        ${property.bedrooms === 'studio' ? 'Studio' : property.bedrooms + ' bed'}
                    </div>
                    <div class="feature">
                        <i class="fas fa-bath"></i>
                        ${property.bathrooms} bath
                    </div>
                    <div class="feature">
                        <i class="fas fa-ruler-combined"></i>
                        ${property.area} sqft
                    </div>
                </div>
                <button class="property-btn" onclick="viewProperty(${property.id})">View Details</button>
            </div>
        </div>
    `;
}

// Load properties
function loadProperties(filter = 'all') {
    let filteredProperties = properties;
    
    if (filter !== 'all') {
        filteredProperties = properties.filter(property => property.type === filter);
    }
    
    propertiesGrid.innerHTML = filteredProperties.map(property => 
        createPropertyCard(property)
    ).join('');
    
    // Add animation delay to cards
    const cards = document.querySelectorAll('.property-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// Filter functionality
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Get filter value and load properties
        const filter = btn.getAttribute('data-filter');
        loadProperties(filter);
    });
});

// Search functionality
function searchProperties() {
    const location = document.getElementById('location-input').value.toLowerCase();
    const bedrooms = document.getElementById('bedrooms-select').value;
    const priceRange = document.getElementById('price-range').value;
    
    console.log('Searching for:', { location, bedrooms, priceRange });
    
    let filteredProperties = properties;
    
    // Filter by location
    if (location) {
        filteredProperties = filteredProperties.filter(property => 
            property.location.toLowerCase().includes(location) ||
            property.title.toLowerCase().includes(location)
        );
    }
    
    // Filter by bedrooms
    if (bedrooms) {
        filteredProperties = filteredProperties.filter(property => {
            if (bedrooms === '4') {
                return property.bedrooms >= 4 || property.bedrooms === '4+';
            }
            return property.bedrooms.toString() === bedrooms || 
                   (bedrooms === '1' && property.bedrooms === 'studio');
        });
    }
    
    // Filter by price range
    if (priceRange) {
        filteredProperties = filteredProperties.filter(property => {
            const price = parseInt(property.price.replace(/[$,]/g, ''));
            switch (priceRange) {
                case '500-1000':
                    return price >= 500 && price <= 1000;
                case '1000-2000':
                    return price >= 1000 && price <= 2000;
                case '2000-3000':
                    return price >= 2000 && price <= 3000;
                case '3000+':
                    return price >= 3000;
                default:
                    return true;
            }
        });
    }
    
    // Update the grid with filtered results
    propertiesGrid.innerHTML = filteredProperties.map(property => 
        createPropertyCard(property)
    ).join('');
    
    // Scroll to properties section
    document.getElementById('properties').scrollIntoView({
        behavior: 'smooth'
    });
    
    // Show search results message
    if (filteredProperties.length === 0) {
        propertiesGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
                <i class="fas fa-search" style="font-size: 3rem; color: #64748b; margin-bottom: 1rem;"></i>
                <h3 style="color: #64748b;">No properties found</h3>
                <p style="color: #94a3b8;">Try adjusting your search criteria</p>
            </div>
        `;
    }
}

// View property details
function viewProperty(id) {
    const property = properties.find(p => p.id === id);
    if (property) {
        alert(`Property Details:\n\nTitle: ${property.title}\nLocation: ${property.location}\nPrice: ${property.price}/month\nBedrooms: ${property.bedrooms === 'studio' ? 'Studio' : property.bedrooms}\nBathrooms: ${property.bathrooms}\nArea: ${property.area} sqft\n\nContact us to schedule a viewing!`);
    }
}

// Form submission
function submitForm(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;
    
    // Simple form validation
    if (!name || !email || !message) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Simulate form submission
    alert(`Thank you, ${name}! Your message has been sent. We'll get back to you soon at ${email}.`);
    
    // Reset form
    document.querySelector('.contact-form').reset();
}

// Newsletter subscription
document.querySelector('.newsletter button').addEventListener('click', function() {
    const email = document.querySelector('.newsletter input').value;
    if (email && email.includes('@')) {
        alert('Thank you for subscribing to our newsletter!');
        document.querySelector('.newsletter input').value = '';
    } else {
        alert('Please enter a valid email address.');
    }
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    loadProperties();
    
    // Add entrance animations
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature, .contact-item');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Initial check
    animateOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Set initial styles for animation elements
    const animatedElements = document.querySelectorAll('.feature, .contact-item');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease';
    });
});

// Add some interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Add click animation to property cards
    const addClickAnimation = function() {
        const cards = document.querySelectorAll('.property-card');
        cards.forEach(card => {
            card.addEventListener('click', function() {
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        });
    };
    
    // Call after properties are loaded
    setTimeout(addClickAnimation, 100);
    
    // Re-add animations when filtering
    const originalLoadProperties = loadProperties;
    loadProperties = function(filter) {
        originalLoadProperties(filter);
        setTimeout(addClickAnimation, 100);
    };
});
