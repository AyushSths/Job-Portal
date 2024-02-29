const { Job } = require("../model/job")

// const User = require("../model/User")
// const path = require("path")
// const fs = require("fs")

const fetchjobs = async (req, res, next) => {
    let jobs = await Job.find()
    res.send({ data: jobs })
    // res.send({
    //     // meta_data: {
    //     //     total: total_jobs.length,
    //     //     page: page,
    //     //     per_page
    //     // },
    //     data:jobs
    // })
}

const fetchSearch = async (req, res, next) => {
    let search_term = req.query.search_term || "";
    // console.log("Search Term:", search_term);
    let jobs = await Job.find({
        $or: [
            { name: { $regex: search_term, $options: 'i' } }, // Search by job name (case-insensitive)
            { categorey: { $regex: search_term, $options: 'i' } }, // Search by job categorey (case-insensitive)
            { company: { $regex: search_term, $options: 'i' } } // Search by company name (case-insensitive)
        ]
    });

    res.send({ data: jobs });
}

const fetchjobs_id = async (req, res, next) => {
    let jobs = await Job.findById(req.params.id)
    res.send({ data: jobs })
}

const store = async (req, res, next) => {
    try {
        const { name, categorey, company, jobLevel, description, noOfVacancy, location, offeredSalary, deadline, type, createdAt, createdBy, image } = req.body;
        // if (!name || !categorey || !company || !jobLevel || !noOfVacancy || !offeredSalary || !deadline || !type || !createdAt) {
        //     return res.status(400).json({ error: 'Missing required fields in the request body' });
        // }
        const requiredFields = ['name', 'categorey', 'company', 'jobLevel', 'description', 'noOfVacancy', 'location', 'offeredSalary', 'deadline', 'type', 'createdAt', 'createdBy'];

        const missingFields = requiredFields.filter(field => !req.body[field]);

        if (missingFields.length > 0) {
            return res.status(400).json({ error: `Missing required fields: ${missingFields.join(', ')}` });
        }
        const jobItem = new Job({
            name: name,
            categorey: categorey,
            company: company,
            jobLevel: jobLevel,
            description: description,
            noOfVacancy: noOfVacancy,
            location: location,
            offeredSalary: offeredSalary,
            deadline: deadline,
            type: type,
            createdAt: createdAt,
            image: image,
            createdBy: createdBy,
            // image: req.files ? req.files.map(file => `/uploads/${file.filename}`) : []
        });

        // Check if the job already exists in the chart
        const existingJobs = await Job.findOne({ name: name });

        if (existingJobs) {
            res.status(200).json({ message: 'Item is already added' });
        } else {
            await jobItem.save();
            res.status(201).json({ message: 'Item added in jobs successfully' });
        }
    } catch (err) {
        next(err)
        // console.error(err);
        // res.status(500).json({ error: 'An error occurred while adding the item to the jobs' });
    }
}

const update = async (req, res, next) => {

    try {
        const jobId = req.params.id;
        const updatedjobData = req.body;

        // Find the job by ID and update it
        const existingJob = await Job.findByIdAndUpdate(jobId, updatedjobData, {
            new: true, // Return the updated job
        });

        if (!existingJob) {
            return res.status(404).json({ message: 'Job not found' });
        }

        // Save the updated job
        const updatedjob = await existingJob.save();

        return res.status(200).json(updatedjob);
    } catch (error) {
        console.error('Error updating job:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }

}

const delete_items = async (req, res) => {
    const itemId = req.params.id;

    try {
        // Find the item by ID and remove it from the database
        const deletedItem = await Job.findOneAndDelete({ _id: itemId });
        console.log("Deleted", deletedItem)
        if (!deletedItem) {
            // If the item is not found in the database, return a 404 Not Found response.
            return res.status(404).json({ message: "Job not found in the list." });
        }

        // Respond with a success message.
        res.json({ message: "Job removed from the list." });
    } catch (error) {
        console.error("Error deleting item:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    fetchjobs,
    store,
    fetchjobs_id,
    update,
    fetchSearch,
    delete_items
}