import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        trim: true
    },
    courseCode: {
        type: String,
        unique: true,
        trim: true
    },
    subject:{
        type: String,
        trim: true
    }
}, {timestamps: true});

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        select: false, // Don't return password in queries
        required: function() {
            return !this.googleId && !this.facebookId; // Only required if no social login
        },
        minlength: 8
    },
    role: {
        type: String,
        enum: ['User', 'Admin', 'Owner'],
        default: 'User'
    },
    otp: {
        type: String,
        default: null
    },
    otpExpires: {
        type: Date,
        default: null
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    profilePic: {
        type: String,
        default: null
    },
    phone: {
        type: String,
    },
    bio: {
        type: String,
        default: null,
        trim: true
    },
    dob: {
        type: Date,
        default: null,
        validate: {
            validator: function(value) {
                return !value || value < new Date();
            },
            message: 'Date of birth must be in the past'
        }
    },
    googleId: String,
    facebookId: String,
    appleId: String,
    institutionName: {
        type: String,
        trim: true,
    },
    city: {
        type: String,
        trim: true,
    },
    state: {
        type: String,
        trim: true, 
    },
    level: {
        type: String,
        enum: ['HIGH-SCHOOL', 'DIPLOMA', 'UNDER-GRADUATE', 'DOCTORAL', 'POST-GRADUATE', 'PHD', 'PROFESSIONAL', 'OTHER'],
        default: 'UNDER-GRADUATE'

    },
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }],
    joinedGroups: [{
        groupId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Group'
        },
        role: {
            type: String,
            enum: ['ADMIN', 'MODERATOR', 'MEMBER'],
            default: 'MEMBER'
        },
        joinedAt: {
            type: Date,
            default: Date.now
        }
    }],
    notifications: {
        email: {
            type: Boolean,
            default: true
        },
        push: {
            type: Boolean,
            default: true
        },
        groupInvites: {
            type: Boolean,
            default: true
        },
        sessionReminders: {
            type: Boolean,
            default: true
        }
    },
    // last seen 
    lastActive: {
        type: Date,
        default: Date.now
    },
    profileCompletion: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    
    // Account status
    accountStatus: {
        type: String,
        enum: ['ACTIVE', 'SUSPENDED', 'DEACTIVATED'],
        default: 'ACTIVE'
    }
}, {timestamps: true});


export const Course = mongoose.models.Course || mongoose.model('Course', courseSchema);
export const User = mongoose.models.User || mongoose.model('User', userSchema);