# Fire Safety AI

A project by Dylan and Lyle :tada:

## Project Description

This project is an AI driven sales tool for fire safety equipment. It is designed to be used by salespeople to help them sell fire safety equipment to businesses.

## Tasks

- [x] Architecture
- [x] Git
  - [x] Branching
  - [x] Committing
  - [x] Pull Requests
  - [x] Merging
- [ ] Database
  - [x] Functionality
  - [x] Schema
    - [x] Search Tags
    - [ ] Filter Tags
    - [x] List All Tags
    - [x] Create Submission
- [x] User Interface
  - [x] Flow
  - [x] Search
  - [x] Dashboard
  - [x] Submission
  - [x] Form
  - [x] Results
- [x] Authentication
  - [x] Organization setup
- [x] API
  - [x] Functionality
- [x] AI
  - [x] OCR
- [ ] Testing
- [x] Deployment

### Notes

- Move to drizzle ORM for database
- Handle upload of images better
- Add more tags for searching
- Add more tags for filtering
- Create data table

#### ToDo's

- Integrate auto email sending we can use services like mailgun, sendgrid, etc.

##### Done

```
For integration with Zod, we can do:
const schema = z.object({
  date: z.date()
})

// Parse date when validating
const { data } = form.getValues();
data.date = date;

form.setValue('date', date);
```

## TO-DO

- [x] Split up the form into multiple pages
- [ ] Add back tag upload
- [ ] Add Calendar to DB and Form
- [ ] Add optional second photo to form submission
- [ ] create more generic dashboard (total tags, total submissions, top technician submissions, etc.)
- [ ] Create Notification System
- [ ] Integrate SendGrid
- [ ] Create Notification Table // DONE
- [ ] Notification Layout
- [ ] Notification Item
- [ ] Add filters to search pages

### Tag Creation

// Customer Data Related

- [x] Step 1: Front Tag Image
- [x] Step 2: Confirm Extraction / Fields

// Sales Data Related

- [ ] Step 3: Back Tag Image
- [ ] Step 4: Confirm / Set Expiration Date
- [ ] Step 5: Create Submission
