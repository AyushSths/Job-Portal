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

const store = async (req, res, next) => {
    try {
        const { name, categorey, company, jobLevel, description, noOfVacancy, location, offeredSalary, deadline, type, createdAt, createdBy, image } = req.body;
        if (!name || !categorey || !company || !jobLevel || !noOfVacancy || !offeredSalary || !deadline || !type || !createdAt || !createdBy) {
            return res.status(400).json({ error: 'Missing required fields in the request body' });
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
            createdBy: createdBy,
            image: image
        });

        // Check if the job already exists in the chart
        const existingJobs = await Job.findOne({ name: name });

        if (existingJobs) {
            res.status(200).json({ message: 'Item is already added' });
        } else {
            await jobItem.save();
            res.status(201).json({ message: 'Item added in jobs successfully' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while adding the item to the jobs' });
    }
}

module.exports = {
    fetchjobs,
    store
}