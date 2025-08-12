# Contact Form Setup Guide

## Formspree Configuration

To activate the contact form, you need to:

1. **Sign up for Formspree**
   - Go to [formspree.io](https://formspree.io)
   - Create a free account (1000 submissions/month)

2. **Create a New Form**
   - Click "New Form" in your dashboard
   - Set the form name: "Portfolio Contact Form"
   - Set the email where you want to receive messages

3. **Get Your Form ID**
   - Copy the form endpoint URL: `https://formspree.io/f/YOUR_FORM_ID`
   - Replace `YOUR_FORM_ID` in `src/components/ContactForm.tsx` line 92

4. **Configure Form Settings (Optional)**
   - Enable reCAPTCHA protection
   - Set up custom thank you page redirect
   - Configure email notifications

## File Locations to Update

- `src/components/ContactForm.tsx` - Line 92: Replace `YOUR_FORM_ID`

## Testing

1. Deploy your site
2. Test the form with a real submission
3. Check your email for the message
4. Verify the success/error states work correctly

## Rate Limiting & Security

The form includes:
- ✅ Honeypot anti-spam field
- ✅ Client-side validation
- ✅ Required field validation
- ✅ Email format validation
- ✅ Submit button disabled during sending
- ✅ Retry functionality on errors

## Alternative Backends

If you prefer other services:
- **EmailJS**: Change the fetch URL and payload format
- **Netlify Forms**: Add `netlify` attribute to form tag
- **Vercel Functions**: Create API endpoint in `/api/contact.js`
- **Resend**: Use their API endpoint and authentication

## Environment Variables (Optional)

For additional security, you can move the form ID to an environment variable:

```bash
VITE_FORMSPREE_ID=your_form_id_here
```

Then use `import.meta.env.VITE_FORMSPREE_ID` in the component.