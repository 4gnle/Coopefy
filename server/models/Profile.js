const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },

  // Main info for Every user
  profilename: {
    type: String,
    require: true
  },
  profileimage: {
    type: Buffer
  },
  bio: {
    type: String,
  },
  status: {
    type: String,
    require: true
  },
  location: {
    type: String,
  },
  skills: {
    type: [String],
  },
  work: {
    type: String
    },
  website: {
    type: String
    },

// EXPERIENCE DATA
experience:  [{
    title: {
      type: String,
      required: true
    },
    company: {
      type: String,
      required: true
    },
    location: {
      type: String
    },
    from: {
      type: Date,
      required: true
    },
    to: {
      type: Date
    },
    current: {
      type: Boolean,
      default: false
    },
    description: {
      type: String
    }
  }],

  // Social Media DATA for USERS
  sociallinks:  {
      twitter: {
        type: String
      },
      facebook: {
        type: String
      },
      instagram: {
        type: String
      },
      youtube: {
        type: String
      },
      linkedin: {
        type: String
      },
      github: {
        type: String
      },
      behance: {
        type: String
      },
      dribbble: {
        type: String
      },
      producthunt: {
        type: String
      },
    }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
