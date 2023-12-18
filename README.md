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
  - [ ] Schema
    - [ ] Search Tags
    - [ ] Filter Tags
    - [ ] List All Tags
    - [ ] Create Submission
- [ ] User Interface
  - [ ] Flow
  - [ ] Search
  - [ ] Dashboard
  - [ ] Submission
  - [ ] Form
  - [ ] Results
- [ ] Authentication
  - [ ] Organization setup
- [ ] API
  - [ ] Functionality
- [ ] AI
  - [ ] OCR
- [ ] Testing
- [ ] Deployment

### Notes

- Move to drizzle ORM for database
- Handle upload of images better
- Add more tags for searching
- Add more tags for filtering
- Create data table

#### ToDo's

- Handle upload of images better
- Sort out customer vs tag submission/edits
- Integrate auto email sending we can use services like mailgun, sendgrid, etc.

##### User Routes

Dash -> Customer (first tag) -> Creates Customer Record & also
-> Creates Tag ->

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

- Just finished updating the fire tag to the database // DONE
- Get initial data to show up on the form when a tag exists // DONE
- distinguish the customer search from the tag search // DONE
- Get OPEN AI to fill form with data that it can retrieve // DONE
- maybe hide form until the text extraction is first attempted // DONE

- loading animation for the open ai / text extraction
- create more generic dashboard (total tags, total submissions, top technician submissions, etc.)
- Add optional second photo to form submission
- Create Notification System
- - Integrate SendGrid
- - Create Notification Table
- - Notification Layout
- - Notification Item
- Add filters to search pages
