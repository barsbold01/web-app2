import mongoose from 'mongoose';

const flexibleSchemaOptions = {
  strict: false,
  versionKey: false
};

const universitySchema = new mongoose.Schema({}, {
  ...flexibleSchemaOptions,
  collection: 'universities'
});

const scholarshipSchema = new mongoose.Schema({}, {
  ...flexibleSchemaOptions,
  collection: 'scholarships'
});

const examContentSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  data: { type: mongoose.Schema.Types.Mixed, required: true }
}, {
  versionKey: false,
  collection: 'exam_contents'
});

export const University = mongoose.model('University', universitySchema);
export const Scholarship = mongoose.model('Scholarship', scholarshipSchema);
export const ExamContent = mongoose.model('ExamContent', examContentSchema);
