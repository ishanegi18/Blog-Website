const mongoose = require('mongoose')
// const Schema = mongoose.Schema;

// const BlogPostSchema = new Schema({
//     title: String,
//     body: String
// });

// const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

const schema = new mongoose.Schema({ 
    title: 'string', 
    body: 'string',
    // username: 'string',
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    datePosted: {
        type: 'date',
        default: new Date()
    },
    image : String
});
const BlogPost = mongoose.model('BlogPost', schema)

module.exports = BlogPost