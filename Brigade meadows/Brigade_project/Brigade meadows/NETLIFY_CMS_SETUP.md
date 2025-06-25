# Netlify CMS Setup Guide for Brigade Meadows

This guide will help you set up and use Netlify CMS to manage your community events and content.

## What is Netlify CMS?

Netlify CMS is a content management system that allows you to edit your website content through a user-friendly interface without needing to edit code files directly.

## Features Available

### 1. Events Management
- Create new community events
- Edit existing events
- Set event types (yoga, pet policy, move-in, etc.)
- Add event status (upcoming, ongoing, completed)
- Include event details like time, location, and description

### 2. Announcements
- Post important announcements
- Set priority levels
- Control visibility

### 3. Site Settings
- Update contact information
- Modify site configuration
- Edit page content

## Setup Instructions

### Step 1: Deploy to Netlify

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Connect your repository to Netlify
3. Deploy your site

### Step 2: Enable Identity

1. In your Netlify dashboard, go to **Site settings** > **Identity**
2. Click **Enable Identity**
3. Configure registration settings (recommended: invite only)

### Step 3: Configure Git Gateway

1. In **Site settings** > **Identity** > **Services**
2. Enable **Git Gateway**
3. This allows the CMS to make changes to your repository

### Step 4: Invite Users

1. Go to **Identity** > **Users**
2. Click **Invite users**
3. Enter email addresses of people who should have access to the CMS

## How to Access the CMS

### Option 1: Direct Admin Access
- Navigate to `your-site.com/admin/`
- Log in with your Netlify Identity credentials

### Option 2: From Events Page
- Go to the Events page on your website
- Click the "Admin" button in the navigation (visible when logged in)
- This will open the CMS interface

### Option 3: From Any Page
- When logged in, you'll see an "Edit Events" button on the hero section
- Click to open the CMS

## Using the CMS

### Adding a New Event

1. Log into the CMS
2. Click on **Events** in the sidebar
3. Click **New Events**
4. Fill in the event details:
   - **Title**: Event name
   - **Date**: When the event takes place
   - **Description**: Event details
   - **Event Type**: Select from dropdown (yoga, pet policy, etc.)
   - **Icon**: FontAwesome icon class (e.g., `fas fa-person-praying`)
   - **Status**: upcoming, ongoing, or completed
   - **Time**: Event time (optional)
   - **Location**: Where the event takes place (optional)
   - **Recurring**: Check if it's a recurring event
   - **Recurrence Pattern**: How often it repeats (optional)
5. Click **Publish** to save

### Editing an Existing Event

1. Find the event in the Events list
2. Click on it to open the editor
3. Make your changes
4. Click **Publish** to save

### Managing Announcements

1. Go to **Announcements** in the sidebar
2. Create new announcements or edit existing ones
3. Set priority levels and visibility

## Event Types Available

- **yoga**: Yoga and fitness classes
- **pet_policy**: Pet-related events and policies
- **move_in**: Move-in guidelines and procedures
- **community_day**: Community celebrations
- **green_drive**: Environmental initiatives
- **food_festival**: Food and dining events
- **other**: Miscellaneous events

## Icons

Use FontAwesome icon classes for event icons. Examples:
- `fas fa-person-praying` (yoga)
- `fas fa-dog` (pet events)
- `fas fa-bullhorn` (announcements)
- `fas fa-people-group` (community events)
- `fas fa-tree` (environmental events)
- `fas fa-utensils` (food events)

## File Structure

The CMS creates and manages files in these directories:
- `content/events/` - Event files
- `content/announcements/` - Announcement files
- `content/settings/` - Site configuration

## Troubleshooting

### Can't Access Admin Panel
- Make sure you're logged in with Netlify Identity
- Check that Git Gateway is enabled
- Verify you have the correct permissions

### Changes Not Appearing
- Check that your site is deployed
- Verify the content files are in the correct format
- Ensure the CMS configuration is correct

### Login Issues
- Check your email for the invitation
- Make sure you're using the correct email address
- Contact the site administrator if you need access

## Security Notes

- Only invite trusted users to the CMS
- Regularly review user access
- Monitor changes made through the CMS
- Keep your Netlify Identity settings secure

## Support

If you encounter issues:
1. Check the Netlify documentation
2. Review the CMS configuration file (`admin/config.yml`)
3. Contact your site administrator
4. Check the browser console for error messages

## Next Steps

Once the CMS is set up:
1. Add your first events
2. Customize the event types if needed
3. Set up user roles and permissions
4. Train other users on how to use the CMS
5. Regularly backup your content

The CMS will make it much easier to keep your community website updated with fresh, relevant content! 