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