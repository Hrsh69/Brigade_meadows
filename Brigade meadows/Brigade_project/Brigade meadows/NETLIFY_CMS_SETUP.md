# Netlify CMS Setup Guide for Brigade Meadows Website

## Overview
This guide will help you set up Netlify CMS for your Brigade Meadows website, allowing you to manage content through a user-friendly interface.

## What's Been Added

### 1. Admin Interface
- **Location**: `/admin/index.html`
- **Purpose**: Provides the CMS interface for content management
- **Access**: Visit `yourdomain.com/admin/` to access the CMS

### 2. Configuration
- **Location**: `/admin/config.yml`
- **Purpose**: Defines the content structure and fields
- **Features**: 
  - Announcements management
  - Events management
  - Site settings
  - Page content management

### 3. Content Structure
- **Announcements**: `/content/announcements/`
- **Events**: `/content/events/`
- **Settings**: `/content/settings/`
- **Pages**: `/content/pages/`

### 4. Dynamic Content Loading
- **File**: `cms-loader.js`
- **Purpose**: Loads CMS content dynamically on the website
- **Features**: Updates announcements, events, and site settings automatically

## Setup Instructions

### Step 1: Deploy to Netlify
1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Connect your repository to Netlify
3. Deploy your site

### Step 2: Enable Netlify Identity
1. Go to your Netlify dashboard
2. Navigate to **Site settings** > **Identity**
3. Click **Enable Identity**
4. Configure registration settings (recommended: invite only)

### Step 3: Configure Git Gateway
1. In **Site settings** > **Identity** > **Services**
2. Enable **Git Gateway**
3. This allows the CMS to commit changes to your repository

### Step 4: Set Up Admin Users
1. Go to **Identity** > **Users**
2. Click **Invite users** to add content editors
3. Users will receive email invitations to join

### Step 5: Access the CMS
1. Visit `yourdomain.com/admin/`
2. Log in with your Netlify Identity credentials
3. Start managing content!

## Content Management

### Announcements
- **Fields**: Title, Date, Priority, Content, Icon, Active status
- **Use**: For important community updates and notices
- **Display**: Shows on the homepage with icons and priority indicators

### Events
- **Fields**: Title, Date, Time, Location, Description, Recurring pattern
- **Use**: For community events, activities, and gatherings
- **Display**: Shows on the homepage with auto-scrolling

### Site Settings
- **Fields**: Site title, description, contact email, office hours, footer text
- **Use**: Global site configuration
- **Display**: Updates across the entire website

## Local Development

### Testing Locally
1. Install Netlify CLI: `npm install -g netlify-cli`
2. Run: `netlify dev`
3. Access CMS at `http://localhost:8888/admin/`

### Local Backend
The CMS is configured with `local_backend: true`, which allows you to:
- Test content changes locally
- Preview changes before publishing
- Work offline

## Customization

### Adding New Content Types
1. Edit `/admin/config.yml`
2. Add new collections under the `collections` section
3. Define fields and structure
4. Create corresponding content folders

### Styling the Admin Interface
1. Create custom CSS for the admin interface
2. Add it to the admin page
3. Customize the look and feel

### Extending Functionality
1. Add custom widgets if needed
2. Implement custom preview templates
3. Add validation rules

## Security Considerations

### Access Control
- Use Netlify Identity for authentication
- Set up role-based access if needed
- Regularly review user permissions

### Content Validation
- Implement field validation in the CMS config
- Use required fields for critical content
- Set up content approval workflows if needed

## Troubleshooting

### Common Issues
1. **CMS not loading**: Check if Netlify Identity is enabled
2. **Changes not saving**: Verify Git Gateway is configured
3. **Content not displaying**: Check the cms-loader.js implementation

### Support
- Netlify CMS Documentation: https://www.netlifycms.org/docs/
- Netlify Identity Documentation: https://docs.netlify.com/visitor-access/identity/
- Community Forum: https://github.com/netlify/netlify-cms/discussions

## Next Steps

1. **Customize the CMS interface** to match your brand
2. **Add more content types** as needed
3. **Set up content workflows** for approval processes
4. **Implement preview functionality** for content editors
5. **Add image management** for media content

## File Structure
```
Brigade meadows/
├── admin/
│   ├── index.html          # CMS interface
│   └── config.yml          # CMS configuration
├── content/
│   ├── announcements/      # Announcement content
│   ├── events/            # Event content
│   ├── pages/             # Page content
│   └── settings/          # Site settings
├── index/
│   ├── index.html         # Main website
│   ├── cms-loader.js      # Dynamic content loader
│   └── ...                # Other website files
└── NETLIFY_CMS_SETUP.md   # This guide
```

Your website is now ready for content management through Netlify CMS! 