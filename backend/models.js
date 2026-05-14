import mongoose from 'mongoose';

const flexibleSchemaOptions = {
  strict: false,
  versionKey: false
};

const universitySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }
}, {
  ...flexibleSchemaOptions,
  collection: 'universities'
});

const scholarshipSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }
}, {
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

const favoriteSchema = new mongoose.Schema({
  userEmail: { type: String, required: true, index: true },
  type: { type: String, required: true, enum: ['university', 'scholarship'] },
  itemId: { type: String, required: true },
  item: { type: mongoose.Schema.Types.Mixed, required: true },
  savedAt: { type: Date, default: Date.now }
}, {
  versionKey: false,
  collection: 'favorites'
});

favoriteSchema.index({ userEmail: 1, type: 1, itemId: 1 }, { unique: true });

const applicationSchema = new mongoose.Schema({
  userEmail: { type: String, required: true, index: true },
  targetType: { type: String, required: true, enum: ['university', 'scholarship'] },
  targetId: { type: String, required: true },
  title: { type: String, required: true },
  deadline: String,
  status: {
    type: String,
    enum: ['planning', 'preparing', 'submitted', 'accepted', 'rejected'],
    default: 'planning'
  },
  notes: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  versionKey: false,
  collection: 'applications'
});

export const University = mongoose.model('University', universitySchema);
export const Scholarship = mongoose.model('Scholarship', scholarshipSchema);
export const ExamContent = mongoose.model('ExamContent', examContentSchema);
export const Favorite = mongoose.model('Favorite', favoriteSchema);
export const Application = mongoose.model('Application', applicationSchema);
