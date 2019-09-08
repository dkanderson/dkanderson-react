require('dotenv').config(); //read env files

const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const { unlink } = require('fs');


var User = require('./lib/user');

const { getArtwork, getBlog, 
        getUsers, getComment, 
        getWork, addNewUser, 
        addNewComment, addNewArtwork,
        addNewBlog, addNewWork,
        updateArtwork, updateUser, 
        updateBlog, updateWork,
        deleteArtwork, deleteBlog, 
        deleteWork, deleteComment, deleteUser } = require('./lib/service');

// const dbUrl = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds251598.mlab.com:41699/dkanderson`;
const dbUrl = `mongodb://localhost/dkanderson`;

mongoose.Promise = Promise;

const app = express();
const port = process.env.PORTNUMBER || 3333;

app.use(express.json());
app.use(fileUpload());


// Handle errors
const errorHandler = (err, req, res) => {
    if (err.response) {
        res.status(403).send({ title: 'Server responded with an error', message: err.message });
    } else if (err.request) {
        res.status(503).send({ title: 'Unable to communicate with the server', message: err.message });
    } else {
        res.status(500).send({ title: 'An unexpected error occured', message: err.message });
    }
};


// Use sessions
app.use(session({
    name: 'artshop',
    secret: 'davinci',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 3 * 60 * 60 * 1000
    },
    // store: new MongoStore({
    //     mongooseConnection: mongoose.connection
    // })
}));


//---------------------------------------------------------------------------------------

//  Routes

//---------------------------------------------------------------------------------------


/*-------------------------------------------------------------------------------------
    Get: Artwork, Blog, Work, User, Comments | Authenticate User
======================================================================================*/

// Get Artwork
app.get('/api/artwork', async (req, res) => {

    try {
        const data = await getArtwork();

        if (data) {
            res.setHeader('Content-Type', 'application/json');
            res.send(data);
        } else {
            res.status(500).send({ title: 'An unexpected error occured', message: "No records found" });
        }

    } catch (error) {
        errorHandler(error, req, res);
    }
});

app.get('/api/blog', async (req, res) => {

    try {
        const data = await getBlog();

        if (data) {
            res.setHeader('Content-Type', 'application/json');
            res.send(data);
        } else {
            res.status(500).send({ title: 'An unexpected error occured', message: "No records found" });
        }

    } catch (error) {
        errorHandler(error, req, res);
    }
});

app.get('/api/work', async (req, res) => {

    try {
        const data = await getWork();

        if (data) {
            res.setHeader('Content-Type', 'application/json');
            res.send(data);
        } else {
            res.status(500).send({ title: 'An unexpected error occured', message: "No records found" });
        }

    } catch (error) {
        errorHandler(error, req, res);
    }
});

app.get('/api/work/:id', async (req, res) => {

    try {
        const data = await getWork(req.params.id);

        if (data) {
            res.setHeader('Content-Type', 'application/json');
            res.send(data);
        } else {
            res.status(500).send({ title: 'An unexpected error occured', message: "No records found" });
        }

    } catch (error) {
        errorHandler(error, req, res);
    }
});

// Get Blog by Slug
app.get('/api/blog/:slug', async (req, res) => {

    try {

        const data = await getBlog(req.params.slug);

        if (data.hasOwnProperty("type")) {

            throw data;

        } else {

            res.setHeader('Content-Type', 'application/json');
            res.send(data);
        }

    } catch (error) {
        errorHandler(error, req, res);
    }
});

// Get Artwork
app.get('/api/comment', async (req, res) => {

    try {
        const data = await getComment();

        if (data) {
            res.setHeader('Content-Type', 'application/json');
            res.send(data);
        } else {
            res.status(500).send({ title: 'An unexpected error occured', message: "No records found" });
        }

    } catch (error) {
        errorHandler(error, req, res);
    }
});

// Get Artwork by Title
app.get('/api/artwork/:id', async (req, res) => {

    try {

        const data = await getArtwork(req.params.id);

        if (data.hasOwnProperty("type")) {

            throw data;

        } else {

            res.setHeader('Content-Type', 'application/json');
            res.send(data);
        }

    } catch (error) {
        errorHandler(error, req, res);
    }
});

// Get Users
app.get('/api/users', async (req, res) => {

    try {
        const data = await getUsers();
        if (data) {
            res.setHeader('Content-Type', 'application/json');
            res.send(data);
        } else if (data.hasOwnProperty("type")) {
            throw data;
        } else {
            res.status(500).send({ title: 'An unexpected error occured', message: `No Records Found` });
        }

    } catch (error) {
        errorHandler(error, req, res);
    }
});

// Get user by username
app.get('/api/users/:username', async (req, res) => {

    try {
        const data = await getUsers(req.params.username);
        
        if(data){
            res.setHeader('Content-Type', 'application/json');
            res.send(data);
        } else {
            res.json({'error': 'No records found'});
        }
        

    } catch (error) {
        errorHandler(error, req, res);
    }
});

// Authenticate User
app.get('/api/authenticate', (req, res, next) => {

    if (req.session && req.session.userId) {

        res.json({message: "authenticated", username: req.session.username});

    } else {

        let err = new Error("You must be logged in to view this page");
        err.status = 401;
        return next(err);
    }

});

/*-------------------------------------------------------------------------------------
    Add New: Artwork, Blog, Work, User, image | Login / Logout
======================================================================================*/

// Add new artwork
app.post('/api/artwork', async (req, res) => {

    try {

        const response = await addNewArtwork(req.body);

        if (response) {

            if (response.hasOwnProperty('type')) {
                
                throw response;

            } else {

                res.send({status: 200, message: 'Uploaded Successfully', res: req.body});
            }


        } else {

            res.send({status: 200, message: 'Uploaded Successfully!', res: req.body});
        }

    } catch (error) {

        errorHandler(error, req, res);

    }
});

// Add new Blog Post
app.post('/api/blog', async (req, res) => {

    try {

        const response = await addNewBlog(req.body);

        if (response) {

            if (response.hasOwnProperty('type')) {

                throw response;

            } else {

                res.setHeader('Content-Type', 'application/json');
                res.send(response);
            }


        } else {

            res.send('Added successfully');
        }

    } catch (error) {

        errorHandler(error, req, res);

    }
});

// Add new Comment 
app.post('/api/comment', async (req, res) => {

    try {

        const response = await addNewComment(req.body);

        if (response) {

            if (response.hasOwnProperty('type')) {

                throw response;

            } else {
                console.log(res);
                res.setHeader('Content-Type', 'application/json');
                res.send(response);
            }

        } else {

            res.send('Added successfully');
            console.log('success');
        }

    } catch (error) {

        errorHandler(error, req, res);

    }
});

// Add new Work
app.post('/api/work', async (req, res) => {

    try {

        const response = await addNewWork(req.body);

        if (response) {

            if (response.hasOwnProperty('type')) {

                throw response;

            } else {

                res.send({status: 200, message: 'Uploaded Successfully!', res: req.body});
            }


        } else {

            res.send({status: 200, message: 'Uploaded Successfully!', res: req.body});
        }

    } catch (error) {

        errorHandler(error, req, res);

    }
});


// Upload artwork image
app.post('/api/upload', (req, res) => {

    if (Object.keys(req.files).length === 0) {

        return res.status(400).send('No files uploaded. ');

    }

    let artworkFile = req.files.artwork;

    artworkFile.mv(`${__dirname}/public/images/uploads/${req.files.artwork.name}`, (err, x) => {

        if (err) {
            return res.status(500).send({ title: 'An unexpected error occured', message: err.message });
        } else {
            res.send({ status: 200, message: 'File was uploaded successfully!', fileName: artworkFile.name });
        }

    });


});

// Add new user
app.post('/api/users', async (req, res) => {

    try {
        const response = await addNewUser(req.body);
        console.log(response);
   
        if (response) {

            if (response.hasOwnProperty('type')) {
                
                throw response;

            } else {

                res.send({status: 200, message: 'Uploaded Successfully', res: req.body});
            }


        } else {

            res.send({status: 200, message: 'Uploaded Successfully!', res: req.body});
        }

    } catch (error) {

        errorHandler(error, req, res);

    }
});

// Handle login
app.post('/api/login', async (req, res, next) => {

    User.authenticate(req.body.username, req.body.password, (error, user) => {
        if (error || !user) {
            let err = new Error('User login failed');
            err.status = 401;
            return next(err);
        } else {
            req.session.userId = user._id;
            req.session.username = user.username;
            res.send(user.username);
        }
    })
});

// Handle logout
app.post('/api/logout', (req, res, next) => {
    if (req.session) {
        req.session.destroy((err) => {
            if (err) {
                console.log(err);
                return next(err);
            } else {
                res.json({message: 'logged out successfully'});
            }
        });
    }
});

/*-------------------------------------------------------------------------------------
    Update: Artwork, Blog, Work, User
======================================================================================*/


// Update Artwork
app.put('/api/artwork/:id', async (req, res) => {

    try {

        const response = await updateArtwork(req.body, req.params.id);

        if (response.hasOwnProperty("type")) {
            throw response;
        } else {
            res.send({status: 200, message: 'Updated Successfully!', res: req.body});
        }

    } catch (error) {

        errorHandler(error, req, res);

    }
});

// Update Blog Post
app.put('/api/blog/:slug', async (req, res) => {

    try {

        const response = await updateBlog(req.body, req.params.slug);

        if (response.hasOwnProperty("type")) {
            throw response;
        } else {
            res.send({status: 200, message: 'Updated Successfully!', res: req.body});
        }

    } catch (error) {

        errorHandler(error, req, res);

    }
});

// Update Work
app.put('/api/work/:id', async (req, res) => {

    try {

        const response = await updateWork(req.body, req.params.id);

        if (response.hasOwnProperty("type")) {
            throw response;
        } else {
            res.send({status: 200, message: 'Updated Successfully!', res: req.body});
        }

    } catch (error) {

        errorHandler(error, req, res);

    }
});

// Update User
app.put('/api/users/:username', async (req, res) => {

    try {

        const response = await updateUser(req.body, req.params.username);

        if (response.hasOwnProperty("type")) {
            throw response;
        } else {
            res.send({status: 200, message: 'Updated Successfully!', res: req.body});
        }

    } catch (error) {

        errorHandler(error, req, res);

    }
});

/*-------------------------------------------------------------------------------------
    Delete: Artwork, Blog, Work, Comments
======================================================================================*/

// Delete artwork
app.delete('/api/artwork/:id', async (req, res) => {

    try {

        const response = await deleteArtwork(req.params.id);

        if (response.hasOwnProperty("type")) {
            throw response;
        } else {

            res.send('delete completed successfully');
        }

    } catch (error) {

        errorHandler(error, req, res);

    }
});

// Delete Blog
app.delete('/api/blog/:slug', async (req, res) => {

    try {

        const response = await deleteBlog(req.params.slug);

        if (response.hasOwnProperty("type")) {
            throw response;
        } else {

            res.send('delete completed successfully');
        }

    } catch (error) {

        errorHandler(error, req, res);

    }
});

// Delete Work
app.delete('/api/work/:slug', async (req, res) => {

    try {

        const response = await deleteWork(req.params.slug);

        if (response.hasOwnProperty("type")) {
            throw response;
        } else {

            res.send('delete completed successfully');
        }

    } catch (error) {

        errorHandler(error, req, res);

    }
});

// Delete Comment
app.delete('/api/comment/:id', async (req, res) => {

    try {

        const response = await deleteComment(req.params.id);

        if (response.hasOwnProperty("type")) {
            throw response;
        } else {

            res.send('delete completed successfully');
        }

    } catch (error) {

        errorHandler(error, req, res);

    }
});

// Update User
app.delete('/api/users/:username', async (req, res) => {

    try {

        const response = await deleteUser(req.params.username);

        if (response.hasOwnProperty("type")) {
            throw response;
        } else {
            res.send({status: 200, message: 'Deleted Successfully!', res: req.body});
        }

    } catch (error) {

        errorHandler(error, req, res);

    }
});







// Connect to mongoDB
mongoose.connect(dbUrl, { useNewUrlParser: true }, (err) => {
    console.log('mongo db connection', err)
});


// Start server
app.listen(port, () => {
    console.log('listening on %d', port);
});