const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
      projectowner: {
      type: Schema.Types.ObjectId,
      ref: 'projectowner'
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
      projectwebsite: {
        type: String
      },
})

module.exports = Projects = mongoose.model('projects', ProjectSchema)
