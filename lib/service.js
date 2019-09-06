require('dotenv').config();
var User = require('./user');
var Artwork = require('./artwork');
var Blog = require('./blog');
var Work = require('./work');
var Comment = require('./comments');


/* jshint ignore:start */

/*-------------------------------------------------------------------------------------
    Get: Artwork, Blog, Work, User, Comments
======================================================================================*/

// Get Artwork request
const getArtwork = async (id) => {

    let error = undefined;

    if (id) {

        const data = await Artwork.findOne({ id: id }, (err) => {

            if (err) {
                error = err;
                error.type = "error";
            }
            
        });

        return error ? error : data;

    } else {

        const data = await Artwork.find({}, (err) => {
            
            if (err) {
                error = err;
                error.type = "error";
            }

        });

        return error ? error : data;
    }
};

// Get Work request
const getWork = async (id) => {

    let error = undefined;

    if (id) {

        const data = await Work.findOne({ id: id }, (err) => {

            if (err) {
                error = err;
                error.type = "error";
            }
        });

        return error ? error : data;

    } else {

        const data = await Work.find({}, (err) => {
            
            if (err) {
                error = err;
                error.type = "error";
            }

        });

        return error ? error : data;
    }
};

// Get Blog
const getBlog = async (slug) => {

    let error = undefined;

    if (slug) {

        const data = await Blog.findOne({ slug: slug }, (err) => {

            if (err) {
                error = err;
                error.type = "error";
            }
        });

        return error ? error : data;

    } else {

        const data = await Blog.find({}, (err) => {
            
            if (err) {
                error = err;
                error.type = "error";
            }

        }).sort({id: -1});

        return error ? error : data;
    }
};


// Get users
const getUsers = async (username) => {

    let error = undefined;

    if (username) {

        const data = await User.findOne({ username: username }, (err) => {

            if (err) {
                error = err;
                error.type = "error";
            }

        });

        return error ? error : data;

    } else {

        const data = await User.find({}, (err) => {
            
            if (err) {
                error = err;
                error.type = "error";
            }

        });

        return error ? error : data;
    }
};

// Get Comment request
const getComment = async (slug) => {

    let error = undefined;

    if (slug) {

        const data = await Comment.find({ blog_slug: slug }, (err) => {

            if (err) {
                error = err;
                error.type = "error";
            }

        });

        return error ? error : data;

    } else {

        const data = await Comment.find({}, (err) => {
            
            if (err) {
                error = err;
                error.type = "error";
            }

        });

        return error ? error : data;
    }
};



/*-------------------------------------------------------------------------------------
    Add New: Artwork, Blog, Work, User
======================================================================================*/

const addNewArtwork = async (data) => {

    let error = undefined;

    const response = await Artwork.create(data, function(err) {

        if (err) {
            error = err;
            error.type = "error";
        } else {
            error = undefined;
        }
    })

    return error ? error : response;    
};

// Add new Project
const addNewWork = async (data) => {

    let error = undefined;

    const response = await Work.create(data, function(err) {

        if (err) {
            error = err;
            error.type = "error";
        }

    });

    return error ? error : response;
};


// Add New Blog Post
const addNewBlog = async (data) => {

    let error = undefined;

    const response = await Blog.create(data, function(err) {

        if (err) {
            error = err;
            error.type = "error";
        }

    });

    return error ? error : response;
};

// Add New User
const addNewUser = async (data) => {
    
    let error = undefined;

    const response = await User.create(data, (err) => {

        if (err) {
            error = err;
            error.type = "error";
            console.log(error);
        }
    });

    return error ? error : response;
};

// Add new comment
const addNewComment = async (data) => {

    let error = undefined;

    const response = await Comment.create(data, function(err) {

        if (err) {
            error = err;
            error.type = "error"
        }

    });

    return error ? error : response;
};


/*-------------------------------------------------------------------------------------
    Update: Artwork, Blog, Work
======================================================================================*/


// Update Artwork
const updateArtwork = async (data, id) => {

    let error = undefined;

    const response = await Artwork.updateOne({ id: id }, data, (err) => {

        if (err) {
            error = err;
            error.type = "error"
        }

    });

    return error ? error : response;
};


// Update Work
const updateWork = async (data, id) => {

    let error = undefined;

    const response = await Work.updateOne({ id: id }, data, (err) => {

        if (err) {
            error = err;
            error.type = "error"
        }

    });

    return error ? error : response;
};

// Update Blog
const updateBlog = async (data, slug) => {

    let error = undefined;

    const response = await Blog.updateOne({ slug: slug }, data, (err) => {

        if (err) {
            error = err;
            error.type = "error"
        }

    });

    return error ? error : response;
};

/*-------------------------------------------------------------------------------------
    Delete: Artwork, Blog, Work, Comments
======================================================================================*/

// Delete Artwork
const deleteArtwork = async (id) => {

    let error = undefined;

    const response = await Artwork.deleteOne({ id: id }, (err) => {
        if (err) {
            error = err;
            error.type = "error"
        }
    });

    return error ? error : response;
};

// Delete Blog
const deleteBlog = async (slug) => {

    let error = undefined;

    const response = await Blog.deleteOne({ slug: slug }, (err) => {
        if (err) {
            error = err;
            error.type = "error"
        }
    });

    return error ? error : response;
};

// Delete Work
const deleteWork = async (id) => {

    let error = undefined;

    const response = await Work.deleteOne({ id: id }, (err) => {
        if (err) {
            error = err;
            error.type = "error"
        }
    });

    return error ? error : response;
};

// Delete Comment 
const deleteComment = async (id) => {

    let error = undefined;

    const response = await Comment.deleteOne({ id: id }, (err) => {
        if (err) {
            error = err;
            error.type = "error"
        }
    });

    return error ? error : response;
};


/* jshint ignore:end */

module.exports = {
    getArtwork: title => getArtwork(title),
    getWork: title => getWork(title),
    getBlog: title => getBlog(title),
    getUsers: (username) => getUsers(username),
    getComment: (slug) => getComment(slug),
    addNewArtwork: data => addNewArtwork(data),
    addNewWork: data => addNewWork(data),
    addNewBlog: data => addNewBlog(data),
    addNewUser: data => addNewUser(data),
    addNewComment: data => addNewComment(data),
    updateArtwork: (data, title) => updateArtwork(data, title),
    updateWork: (data, title) => updateWork(data, title),
    updateBlog: (data, slug) => updateBlog(data, slug),
    deleteArtwork: (title) => deleteArtwork(title),
    deleteBlog: (slug) => deleteBlog(slug),
    deleteWork: (title) => deleteWork(title),
    deleteComment: (title) => deleteComment(title),
};