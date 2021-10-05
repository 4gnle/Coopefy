mongoose = require('mongoose');

const ProjectSchema = new.mongoose.Schema({
  projects: [
      {
      project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'project'
      },
      projectname: {
        type: String,
        required: true
      },
      projectdescription: {
        type: String,
        required: true
      },
      projectskills: {
        type: String,
        required: true
      },
      projectstate: {
        type: String,
        default: false
      },
      projectreward: {
        type: String
      },
      projectamount: {
        type: String
      },
      projectwebsite: {
        type: String
      },
  }]
})

module.exports = Projects = mongoose.model('project', ProjectSchema)
