import { Request, Response } from 'express';
import Testimonial from '../models/Testimonial';

export const getTestimonials = async (_req: Request, res: Response) => {
    try {
        const testimonials = await Testimonial.find().sort({ createdAt: -1 });
        res.json(testimonials);
    } catch (err) {
        console.error('Error fetching testimonials:', err);
        res.status(500).json({ error: 'Failed to fetch testimonials' });
    }
};

export const createTestimonial = async (req: Request, res: Response) => {
    try {
        const { name, program, text, photo } = req.body;

        if (!name || !program || !text) {
            return res.status(400).json({ error: 'Name, program, and text are required' });
        }

        const newTestimonial = await Testimonial.create({
            name,
            program,
            text,
            photo,
        });

        res.status(201).json(newTestimonial);
    } catch (err) {
        console.error('Error creating testimonial:', err);
        res.status(500).json({ error: 'Failed to create testimonial' });
    }
};

export const updateTestimonial = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedTestimonial = await Testimonial.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedTestimonial) {
            return res.status(404).json({ error: 'Testimonial not found' });
        }

        res.json(updatedTestimonial);
    } catch (err) {
        console.error('Error updating testimonial:', err);
        res.status(500).json({ error: 'Failed to update testimonial' });
    }
};

export const deleteTestimonial = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const deletedTestimonial = await Testimonial.findByIdAndDelete(id);

        if (!deletedTestimonial) {
            return res.status(404).json({ error: 'Testimonial not found' });
        }

        res.json({ message: 'Testimonial deleted successfully' });
    } catch (err) {
        console.error('Error deleting testimonial:', err);
        res.status(500).json({ error: 'Failed to delete testimonial' });
    }
};
