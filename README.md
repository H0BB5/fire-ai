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
