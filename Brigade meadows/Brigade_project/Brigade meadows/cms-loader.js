// CMS Content Loader
class CMSLoader {
    constructor() {
        this.announcements = [];
        this.events = [];
        this.siteSettings = {};
    }

    async loadSiteSettings() {
        try {
            const response = await fetch('/content/settings/site.md');
            const text = await response.text();
            const frontMatter = this.parseFrontMatter(text);
            this.siteSettings = frontMatter;
            this.updateSiteSettings();
        } catch (error) {
            console.log('Site settings not found, using defaults');
        }
    }

    async loadAnnouncements() {
        try {
            // In a real implementation, you'd fetch from your CMS API
            // For now, we'll use the static file
            const response = await fetch('/content/announcements/2025-01-20-move-in-restrictions.md');
            const text = await response.text();
            const announcement = this.parseFrontMatter(text);
            if (announcement.active) {
                this.announcements.push(announcement);
            }
            this.updateAnnouncements();
        } catch (error) {
            console.log('Announcements not found, using defaults');
        }
    }

    async loadEvents() {
        try {
            // In a real implementation, you'd fetch from your CMS API
            const response = await fetch('/content/events/2025-01-25-yoga-class.md');
            const text = await response.text();
            const event = this.parseFrontMatter(text);
            if (event.active) {
                this.events.push(event);
            }
            this.updateEvents();
        } catch (error) {
            console.log('Events not found, using defaults');
        }
    }

    parseFrontMatter(text) {
        const frontMatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
        const match = text.match(frontMatterRegex);
        
        if (match) {
            const frontMatter = {};
            const content = match[2];
            
            // Parse YAML front matter
            const lines = match[1].split('\n');
            lines.forEach(line => {
                const colonIndex = line.indexOf(':');
                if (colonIndex > 0) {
                    const key = line.substring(0, colonIndex).trim();
                    let value = line.substring(colonIndex + 1).trim();
                    
                    // Remove quotes if present
                    if ((value.startsWith('"') && value.endsWith('"')) || 
                        (value.startsWith("'") && value.endsWith("'"))) {
                        value = value.slice(1, -1);
                    }
                    
                    frontMatter[key] = value;
                }
            });
            
            frontMatter.content = content;
            return frontMatter;
        }
        
        return { content: text };
    }

    updateSiteSettings() {
        if (this.siteSettings.title) {
            document.title = this.siteSettings.title;
        }
        if (this.siteSettings.footer_text) {
            const footer = document.querySelector('.site-footer');
            if (footer) {
                footer.textContent = this.siteSettings.footer_text;
            }
        }
    }

    updateAnnouncements() {
        const announcementsList = document.querySelector('.announcement-list');
        if (announcementsList && this.announcements.length > 0) {
            announcementsList.innerHTML = '';
            this.announcements.forEach(announcement => {
                const li = document.createElement('li');
                li.innerHTML = `${announcement.icon || '📢'} ${announcement.content}`;
                announcementsList.appendChild(li);
            });
        }
    }

    updateEvents() {
        const eventsContainer = document.getElementById('eventsContainer');
        if (eventsContainer && this.events.length > 0) {
            eventsContainer.innerHTML = '';
            this.events.forEach(event => {
                const div = document.createElement('div');
                div.className = 'event-item';
                const eventText = event.recurring ? 
                    `${event.title} - ${event.recurrence}, ${event.time}` :
                    `${event.title} - ${new Date(event.date).toLocaleDateString()}, ${event.time}`;
                div.textContent = eventText;
                eventsContainer.appendChild(div);
            });
        }
    }

    init() {
        this.loadSiteSettings();
        this.loadAnnouncements();
        this.loadEvents();
    }
}

// Initialize CMS loader when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const cmsLoader = new CMSLoader();
    cmsLoader.init();
});

// CMS Event Loader for Brigade Meadows
class EventLoader {
    constructor() {
        this.events = [];
        this.upcomingContainer = document.querySelector('.events-grid');
        this.pastContainer = null;
    }

    async loadEvents() {
        try {
            // In a real implementation, this would fetch from your CMS API
            // For now, we'll use the static content and allow CMS updates
            console.log('Loading events from CMS...');
            
            // Check if we're in a CMS preview mode
            if (window.netlifyIdentity && window.netlifyIdentity.currentUser()) {
                this.enableCMSEditing();
            }
            
            // Load events from content files
            await this.loadEventsFromFiles();
            
        } catch (error) {
            console.error('Error loading events:', error);
        }
    }

    async loadEventsFromFiles() {
        // This would typically fetch from your CMS API
        // For demonstration, we'll use the static content
        const sampleEvents = [
            {
                title: "Yoga Class",
                date: "2025-01-25T07:00:00.000Z",
                description: "Start your day with a refreshing yoga session in the community hall. Open to all residents of all skill levels.",
                event_type: "yoga",
                icon: "fas fa-person-praying",
                status: "upcoming",
                time: "7 AM",
                location: "Community Hall"
            },
            {
                title: "Pet Policy Awareness",
                date: "2025-01-15T18:00:00.000Z",
                description: "Learn about our pet-friendly rules and how to be a responsible pet owner. Q&A session with the committee.",
                event_type: "pet_policy",
                icon: "fas fa-dog",
                status: "ongoing",
                time: "6 PM",
                location: "Community Hall"
            },
            {
                title: "Move-in Guidelines",
                date: "2025-01-20T09:00:00.000Z",
                description: "Important guidelines for move-ins and logistics. Contact the estate office for detailed information.",
                event_type: "move_in",
                icon: "fas fa-bullhorn",
                status: "upcoming",
                time: "9 AM",
                location: "Estate Office"
            }
        ];

        const pastEvents = [
            {
                title: "Annual Community Day",
                date: "2024-12-10T10:00:00.000Z",
                description: "A day of fun, games, and celebration for all residents. Thank you for making it a memorable success!",
                event_type: "community_day",
                icon: "fas fa-people-group",
                status: "completed",
                time: "10 AM",
                location: "Community Grounds"
            },
            {
                title: "Green Drive Initiative",
                date: "2024-11-15T08:00:00.000Z",
                description: "Residents joined hands to plant 200+ saplings across the campus. Let's keep our community green!",
                event_type: "green_drive",
                icon: "fas fa-tree",
                status: "completed",
                time: "8 AM",
                location: "Community Campus"
            },
            {
                title: "Food Festival",
                date: "2024-11-05T17:00:00.000Z",
                description: "A celebration of diverse cuisines from our multicultural community. Delicious food and great company!",
                event_type: "food_festival",
                icon: "fas fa-utensils",
                status: "completed",
                time: "5 PM",
                location: "Community Hall"
            }
        ];

        this.renderEvents(sampleEvents, 'upcoming');
        this.renderEvents(pastEvents, 'past');
    }

    renderEvents(events, type) {
        const container = type === 'upcoming' ? this.upcomingContainer : this.getPastContainer();
        if (!container) return;

        // Clear existing content
        container.innerHTML = '';

        events.forEach((event, index) => {
            const eventCard = this.createEventCard(event, index);
            container.appendChild(eventCard);
        });
    }

    createEventCard(event, index) {
        const card = document.createElement('div');
        card.className = 'event-card';
        card.setAttribute('data-aos', 'fade-up');
        if (index > 0) {
            card.setAttribute('data-aos-delay', (index * 100).toString());
        }

        const statusClass = this.getStatusClass(event.status);
        const formattedDate = this.formatDate(event.date);

        card.innerHTML = `
            <div class="event-icon">
                <i class="${event.icon}"></i>
            </div>
            <div class="event-title">${event.title}</div>
            <div class="event-date">
                <i class="fas fa-calendar"></i> ${formattedDate}
            </div>
            <div class="event-desc">${event.description}</div>
            <span class="event-status ${statusClass}">${this.getStatusText(event.status)}</span>
        `;

        return card;
    }

    getStatusClass(status) {
        switch (status) {
            case 'upcoming': return 'status-upcoming';
            case 'ongoing': return 'status-ongoing';
            case 'completed': return 'status-past';
            default: return 'status-upcoming';
        }
    }

    getStatusText(status) {
        switch (status) {
            case 'upcoming': return 'Upcoming';
            case 'ongoing': return 'Ongoing';
            case 'completed': return 'Completed';
            default: return 'Upcoming';
        }
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    }

    getPastContainer() {
        if (!this.pastContainer) {
            // Find the past events container
            const pastSection = document.querySelector('.section-title[style*="margin-top"]');
            if (pastSection) {
                this.pastContainer = pastSection.parentElement.querySelector('.events-grid');
            }
        }
        return this.pastContainer;
    }

    enableCMSEditing() {
        // Add CMS editing capabilities
        const editButton = document.createElement('button');
        editButton.innerHTML = '<i class="fas fa-edit"></i> Edit Events';
        editButton.className = 'cms-edit-btn';
        editButton.onclick = () => this.openCMS();
        
        // Add to page
        const header = document.querySelector('.hero-section');
        if (header) {
            header.appendChild(editButton);
        }
    }

    openCMS() {
        if (window.netlifyIdentity) {
            window.netlifyIdentity.open();
        }
    }
}

// Initialize event loader when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const eventLoader = new EventLoader();
    eventLoader.loadEvents();
});

// Export for use in other scripts
window.EventLoader = EventLoader; 