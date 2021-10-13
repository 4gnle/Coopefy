const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
      projectowner: {
        type: Schema.Types.ObjectId
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
        type: [String],
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
      projectlocation: {
        type: String
      },
      projectduration: {
        type: String
      },
      projectwebsite: {
        type: String
      },

      applications: [{
        applicantid: {
          type: Schema.Types.ObjectId
        },
        application: {
          type: String,
          required: true
        },
        applicantname: {
          type: String
        },
        applicationdate: {
          type: Date,
          default: Date.now
        }
    }]
})

module.exports = Projects = mongoose.model('projects', ProjectSchema)
