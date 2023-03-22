const expres = require('express');
const router = expres.Router();
const asyncHandler = require('express-async-handler');
const {verifyTokenAndAdmin} = require('../middlewares/verifyToken')
const { Author, validationCreateAuthor, validationUpdateAuthor } = require('../models/Author')



/**
 *   @desc    Get all authors
 *   @route   /api/authors
 *   @method  GET
 *   @access  public
 */

router.get('/', asyncHandler(
    async (req, res) => {
            const authorList = await Author.find();
            res.status(200).json(authorList)
    }
))



/**
 *   @desc    Get authors by id
 *   @route   /api/authors
 *   @method  GET
 *   @access  public
 */

router.get('/:id', asyncHandler(
    async (req, res) => {
            const author = await Author.findById(req.params.id);
        
            if (author) {
                res.status(200).json(author)
            } else {
                res.status(404).json({message: 'author is not found'})
            }
    }
));


/**
 *   @desc    Create New authors
 *   @route   /api/authors
 *   @method  POST
 *   @access  private (only admin)
 */


router.post('/', verifyTokenAndAdmin, asyncHandler( 
    async (req, res) => {
    const { error } = validationCreateAuthor(req.body)

    if (error) {
        return res.status(400).json({ messag: error.details[0].message })
    }


        
    const author = new Author({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        nationality: req.body.nationality,
        image: req.body.image
    }) 

    const result = await author.save();
    res.status(201).json(result);
}));




/**
 *   @desc    Update a authors
 *   @route   /api/authors
 *   @method  PUT
 *   @access  private (only admin)
 */


router.put('/:id', verifyTokenAndAdmin, asyncHandler(
    async (req, res) => {
        const { error } = validationUpdateAuthor(req.body);

        if (error) {
            return res.status(400).json({message: error.details[0].message})
        }

        const author = await Author.findByIdAndUpdate(req.params.id, {
            $set: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                nationality: req.body.nationality,
                image: req.body.image,
            }
        }, {new: true});
        res.status(200).json(author);
    }
));


/**
 *   @desc    Delete a authors
 *   @route   /api/authors
 *   @method  DELETE
 *   @access  private (only admin)
 */



router.delete('/:id', verifyTokenAndAdmin, asyncHandler(
    async (req, res) => {
        const author = await Author.findById(req.params.id);

            
        if (author) {
            await Author.findByIdAndDelete(req.params.id)
            res.status(200).json({message: 'author has been deleted'});
        } else {
            res.status(404).json({ message: 'author not found' })
        }
    }
));




module.exports = router;