mongoose = require('mongoose');

const ProjectSchema = new.mongoose.Schema({
  projects: [
      {
      title: {
        type: String,
        required: true
      },
      website: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      helpneeded: {
        type: String,
        required: true
      },
      currentState: {
        type: Boolean,
        default: false
      }
  }]
})

module.exports = Projects = mongoose.model('project', ProjectSchema)