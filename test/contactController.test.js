// Import required modules
require("dotenv").config();
const request = require('supertest');
const app = require('../index'); // Assuming your Express app is exported from index.js
const Contact = require('../models/contacts');
const mongoose = require('mongoose');


beforeAll(async () => {
    await mongoose.connect(process.env.TEST_DB_URL);
  });
  
  afterAll(async () => {
    await mongoose.disconnect();
   
}, 1000);





  describe('updateContactHandler', () => {
    // Mock data for testing
    const mockContact = {
        _id: 'fake_contact_id',
        userId: 'fake_user_id',
        firstName: 'John',
        lastName: 'Doe',
        phoneNumber: '1234567890'
    };

    beforeEach(() => {
        // Mock findByIdAndUpdate function of Contact model
        Contact.findByIdAndUpdate = jest.fn().mockResolvedValue(mockContact);
    });

    it('should update an existing contact', async () => {
        const updatedContactData = {
            firstName: 'Jane',
            lastName: 'Doe',
            phoneNumber: '0987654321'
        };

        const response = await request(app)
            .put('/contact/fake_contact_id')
            .send(updatedContactData)
            .expect(200);

        expect(response.body).toEqual(mockContact);
    });

    it('should return 400 if required fields are missing', async () => {
        const invalidData = {
            // Missing firstName
            lastName: 'Doe',
            phoneNumber: '0987654321'
        };

        await request(app)
            .put('/contacts/fake_contact_id')
            .send(invalidData)
            .expect(400, { message: 'Missing required fields' });
    });

    it('should return 404 if contact not found', async () => {
        // Mock findById function of Contact model to return null
        Contact.findById = jest.fn().mockResolvedValue(null);

        const updatedContactData = {
            firstName: 'Jane',
            lastName: 'Doe',
            phoneNumber: '0987654321'
        };

        await request(app)
            .put('/contacts/non_existing_contact_id')
            .send(updatedContactData)
            .expect(404, { message: 'Contact not found' });
    });

    it('should handle internal server error', async () => {
        // Mock findByIdAndUpdate to throw an error
        Contact.findByIdAndUpdate = jest.fn().mockRejectedValue(new Error('Database error'));

        const updatedContactData = {
            firstName: 'Jane',
            lastName: 'Doe',
            phoneNumber: '0987654321'
        };

        await request(app)
            .put('/contacts/fake_contact_id')
            .send(updatedContactData)
            .expect(500, { message: 'Internal Server Error' });
    });
});