const mongoose = require('mongoose');

const TagsSystemReport = mongoose.model("TagsSystemReport",
    new mongoose.Schema(
        {
            guild: {
                type: String,
                required: true
            },
            channel: {
                type: String,
                required: true
            }
        }
    )
);

const TagsSystem = mongoose.model("TagsSystem",
    new mongoose.Schema(
        {
            guild: {
                type: String,
                required: true
            },
            author: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            language: {
                type: String,
                required: true
            },
            desc: {
                type: String,
                required: false
            },
            content: {
                type: String,
                required: true
            },
            createdAt: {
                type: String,
                required: true
            },
            visibility: {
                type: String,
                required: true
            },
            stars: {
                type: [Object],
                required: true
            },
            reported: {
                type: Boolean,
                required: false
            }
        }
    )
);

module.exports = { TagsSystemReport, TagsSystem };