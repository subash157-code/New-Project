const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Import all models
const PaymentBooking = require("../models/PaymentBooking");
const Registration = require("../models/Registration");
const ContactMessage = require("../models/Contact");
const NewUser = require("../models/NewUser");
const UserDetails = require("../models/UserDetails");
const Logininfo = require("../models/Logininfo");
const LoginInformation = require("../models/LoginInformation");
const AdminUser = require("../models/Adminuser");
const DemoRegistration = require("../models/Demo");
const ChatAnswer = require('../models/Chatanswer');
const Course = require('../models/Course');
const Event = require('../models/Event');
const Gallery = require('../models/Gallery');
const UserResult = require("../models/UserResult");

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage: storage });

// Model map for generic admin routes
const modelMap = {
    paymentBookings: PaymentBooking,
    registrations: Registration,
    contactMessages: ContactMessage,
    newUsers: NewUser,
    userDetails: UserDetails,
    loginInfos: Logininfo,
    demoRegistrations: DemoRegistration,
    chatAnswers: ChatAnswer,
    courses: Course,
    events: Event,
    galleries: Gallery, // Use 'galleries' to match the client logic
    loginInformation: LoginInformation
};

// Route to add a new course
router.post('/courses', upload.single('image'), async (req, res) => {
    try {
        const { name, duration, payment, description } = req.body;
        const image = req.file ? req.file.path : null;

        const newCourse = new Course({
            name,
            duration,
            payment,
            description,
            image
        });

        await newCourse.save();
        res.status(201).json({ message: 'Course added successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// GET: Fetch all courses
router.get('/courses', async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Route to add a new event
router.post('/events', upload.single('image'), async (req, res) => {
    try {
        const { eventName, description, deadlineDate } = req.body;
        const image = req.file ? req.file.path : null;

        const newEvent = new Event({
            eventName,
            description,
            deadlineDate,
            image
        });

        await newEvent.save();
        res.status(201).json({ message: 'Event added successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// GET: Fetch all events
router.get('/events', async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Route to add a new gallery
router.post('/galleries', upload.array('images', 10), async (req, res) => {
    try {
        const { title, description, captureDate, captureTime } = req.body;
        const images = req.files ? req.files.map(file => file.path) : [];

        const newGallery = new Gallery({
            title,
            description,
            captureDate,
            captureTime,
            images
        });

        await newGallery.save();
        res.status(201).json({ message: 'Gallery added successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// GET: Fetch all galleries
router.get('/galleries', async (req, res) => {
    try {
        const galleries = await Gallery.find();
        res.status(200).json(galleries);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// ------------------ Standard CRUD Routes (non-admin) ------------------

// Payment Booking
router.post('/paymentbooking', async (req, res) => {
    try {
        const booking = new PaymentBooking(req.body);
        await booking.save();
        res.status(201).json({ message: 'Payment booking saved successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/paymentbooking', async (req, res) => {
  const { username, password } = req.query;

  try {
    const booking = await PaymentBooking.findOne({ username, password });

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found.' });
    }

    res.status(200).json({
      success: true,
      user: {
        name: booking.name,
        email: booking.email,
        courseTitle: booking.courseTitle,
        appointmentDate: booking.appointmentDate,
        timing: booking.timing
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Registration
router.post("/registration", async (req, res) => {
    try {
        await new Registration(req.body).save();
        res.status(201).json({ message: "Registration successful" });
    } catch {
        res.status(500).json({ error: "Failed to save registration" });
    }
});

// Contact
router.post("/contact", async (req, res) => {
    try {
        await new ContactMessage(req.body).save();
        res.status(201).json({ message: "Message received. Thank you!" });
    } catch {
        res.status(500).json({ error: "Failed to submit contact message." });
    }
});

// NewUser
router.post("/newuser", async (req, res) => {
    try {
        await new NewUser(req.body).save();
        res.status(201).json({ message: "New User details updated successfully!" });
    } catch {
        res.status(500).json({ error: "Failed to save New User details." });
    }
});

// UserDetails
router.post("/userdetails", async (req, res) => {
    try {
        await new UserDetails(req.body).save();
        res.status(201).json({ message: "User details submitted successfully!" });
    } catch {
        res.status(500).json({ error: "Failed to save user details." });
    }
});

// Logininfo
router.post('/Logininfo', async (req, res) => {
    try {
        const { username, password, date } = req.body;
        if (!username || !password || !date) return res.status(400).json({ error: 'Missing fields' });
        await new Logininfo({ username, password, date: new Date(date) }).save();
        res.status(201).json({ message: 'Login info saved' });
    } catch {
        res.status(500).json({ error: 'Server error' });
    }
});

router.get("/Logininfo", async (_, res) => {
    try {
        const info = await Logininfo.find();
        res.json(info);
    } catch {
        res.status(500).json({ error: "Failed to fetch logininfo" });
    }
});

// LoginInformation
router.post("/loginInformation", async (req, res) => {
    try {
        await new LoginInformation(req.body).save();
        res.status(201).json({ message: "LoginInformation saved" });
    } catch {
        res.status(500).json({ message: "Error saving LoginInformation" });
    }
});

router.get("/loginInformation", async (_, res) => {
    try {
        const records = await LoginInformation.find();
        res.json(records);
    } catch {
        res.status(500).json({ error: "Failed to fetch loginInformation" });
    }
});

// Chat Answers
router.post('/submit', async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: 'No answers submitted' });
        }
        await new ChatAnswer({ answers: req.body }).save();
        res.json({ message: 'Your answers have been saved successfully!' });
    } catch {
        res.status(500).json({ message: 'Failed to save answers.' });
    }
});

router.get('/chatanswers', async (_, res) => {
    try {
        const chatAnswers = await ChatAnswer.find().sort({ submittedAt: -1 });
        res.json({ data: chatAnswers });
    } catch {
        res.status(500).json({ message: 'Failed to fetch chat answers.' });
    }
});

// Demo class
router.post("/democlass", async (req, res) => {
    const { name, email, course } = req.body;
    if (!name || !email || !course) {
        return res.status(400).json({ message: "Missing fields" });
    }
    try {
        await new DemoRegistration({ name, email, course }).save();
        res.status(201).json({ message: "Registered successfully" });
    } catch {
        res.status(500).json({ message: "Server error" });
    }
});

router.get("/democlass", async (_, res) => {
    try {
        const entries = await DemoRegistration.find().sort({ createdAt: -1 });
        res.json({ data: entries });
    } catch {
        res.status(500).json({ message: "Server error" });
    }
});


// ------------------ Admin Login ------------------
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "123";

router.post("/admin/adminlogin", (req, res) => {
    const { username, password } = req.body;
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        return res.json({ success: true });
    }
    return res.status(401).json({ success: false, message: "Invalid credentials" });
});

let adminLogins = [];

router.post("/adminlogininfo", (req, res) => {
    const { username, date } = req.body;
    if (!username || !date) return res.status(400).json({ message: "Missing fields" });
    adminLogins.push({ username, date });
    res.json({ message: "Login info saved" });
});

router.get("/adminlogininfo", (_, res) => {
    res.json({ logins: adminLogins });
});


// ------------------ Admin Dashboard Data ------------------
router.get("/admin/dashboard", async (_, res) => {
    try {
        const dashboard = {
            paymentBookings: await PaymentBooking.find(),
            registrations: await Registration.find(),
            contactMessages: await ContactMessage.find(),
            newUsers: await NewUser.find(),
            userDetails: await UserDetails.find(),
            loginInfos: await Logininfo.find(),
            adminlogins: await AdminUser.find(),
            demoRegistrations: await DemoRegistration.find(),
            chatAnswers: await ChatAnswer.find().sort({ submittedAt: -1 }),
            courses: await Course.find(),
            events:await Event.find(),
            galleried: await Gallery.find()
        };
        res.json(dashboard);
    } catch (error) {
        res.status(500).json({ message: "Failed to load dashboard data" });
    }
});

// Generic DELETE route for all models
router.delete('/:section/:id', async (req, res) => {
    const { section, id } = req.params;
    const Model = modelMap[section];

    if (!Model) {
        return res.status(404).json({ message: 'Invalid section' });
    }

    try {
        const deletedItem = await Model.findByIdAndDelete(id);
        if (!deletedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json({ message: `${section.slice(0, -1)} deleted successfully!` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Generic PUT route for all models
router.put('/:section/:id', upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'images', maxCount: 10 }
]), async (req, res) => {
    const { section, id } = req.params;
    const Model = modelMap[section];

    if (!Model) {
        return res.status(404).json({ message: 'Invalid section' });
    }

    const updateData = req.body;

    // Handle single image upload
    if (req.files && req.files.image && req.files.image.length > 0) {
        updateData.image = req.files.image[0].path;
    }
    
    // Handle multiple images upload
    if (req.files && req.files.images && req.files.images.length > 0) {
        const newImagePaths = req.files.images.map(file => file.path);
        updateData.images = newImagePaths;
    }
    
    try {
        const updatedItem = await Model.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
        if (!updatedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json({ message: `${section.slice(0, -1)} updated successfully!`, item: updatedItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post("/userresults", async (req, res) => {
  try {
    const newResult = new UserResult(req.body);
    await newResult.save();
    res.status(201).json({ message: "Result saved" });
  } catch (err) {
    res.status(500).json({ error: "Failed to save result" });
  }
});

module.exports = router;