module.exports = function (router) {
    const userController = require('../controllers/user')
    const User = require('../models/user')
    const multer = require('multer');
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './uploads');
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname);
        }
    });

    const fileFilter = (req, file, cb) => {
        // reject a file
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(null, false);
        }
    };

    const upload = multer({
        storage: storage,
        limits: {
            fileSize: 1024 * 1024 * 5
        },
        fileFilter: fileFilter
    });

  

    /**
     * @typedef User
     * @property {string} name
     * @property {string} lastName.required
     * @property {string} email.required
     * @property {integer} sexe.required
     * @property {string} password.required
     * @property {string} tel.required
     * @property {date} birthday - Status values that need to be considered for filter - eg: 2019-12-31
     * @property {integer} doctor
     * @property {integer} provider - Status values that need to be considered for filter - eg: GOOGLE ou bien FACEBOOK
     * @property {integer} googleId
     * @property {integer} fbId
     */



    /**
    * @typedef filterDoctor
    * @property {Array<integer>} currentPosition  - eg: [201,555]
    * @property {string} cityId.required
    * @property {string} doctorSpecialtyId.required
    * @property {boolean} cnam.required
    * @property {number} pageIndex.required -start from 0
    */

    /**
     * @typedef UserUpdate
     * @property {string} name
     * @property {string} lastName.required
     * @property {string} email.required
     * @property {integer} sexe.required
     * @property {string} tel.required
     * @property {date} birthday - Status values that need to be considered for filter - eg: 2019-12-31
     * @property {string} ville
     * @property {string} address
     */
    /**
     * @typedef DoctorUpdate
     * @property {string} name
     * @property {string} lastName.required
     * @property {string} email.required
     * @property {integer} sexe.required
     * @property {string} tel.required
     * @property {date} birthday - Status values that need to be considered for filter - eg: 2019-12-31
     * @property {string} ville
     * @property {string} address
     * @property {string} longitude
     * @property {string} latitude
     * @property {string} doctorSpecialty
     * @property {string} city
     * @property {boolean} cnam
     */


    /**
     * @typedef UserLogin
     * @property {string} email.required
     * @property {string} password.required
     */

    /**
     * @typedef PasswordUpdate
     * @property {string} password.required
     * @property {string} id.required
     */

    /**
    * @typedef updateUserImg
    * @property {string} userUrl.required - this is a formData file where image name must be userUrl
    */

    /**
     * This function comment is parsed by doctrine
     * @route POST /api/users/register
     * @group user - Operations about user
     * @param {User.model} User.body.required - the new point
     * @returns {object} 200 - success
     * @returns {Error}  default - Unexpected error
     */
    router.post('/users/register', userController.register);


    /**
     * This function comment is parsed by doctrine
     * @route POST /api/users/login
     * @group user - Operations about user
     * @param {UserLogin.model} UserLogin.body.required - the new point
     * @returns {object} 200 - success
     * @returns {Error}  default - Unexpected error
     */
    router.post('/users/login', userController.loginWithPassword);


    /**
     * This function comment is parsed by doctrine
     * @route POST /api/users/login/social
     * @group user - Operations about user
     * @param {UserLogin.model} UserLogin.body.required - the new point
     * @returns {object} 200 - success
     * @returns {Error}  default - Unexpected error
     */
    router.post('/users/login/social', userController.loginWithSocail);

    /**
     * This function comment is parsed by doctrine
     * @route POST /api/users/doctors
     * @group doctors - Operations about doctors
     * @param {filterDoctor.model} filterDoctor.body.required - filterDoctor exple of  currentPosition [Longitude,Latitude]
     * @returns {object} 200 - success
     * @returns {Error}  default - Unexpected error
     */
    router.post('/users/doctors', userController.filterDoctors);


    /**
     * This function comment is parsed by doctrine
     * @route PUT /api/users/updateUser
     * @group user - Operations about user
     * @param {string} id.query.required - id required 
     * @param {UserUpdate.model} UserUpdate.body.required - the new point
     * @returns {object} 200 - success
     * @returns {Error}  default - Unexpected error
     */
    router.put('/users/updateUser', userController.updateUser);

    /**
     * This function comment is parsed by doctrine
     * @route PUT /api/users/updatePw
     * @group user - Operations about user
     * @param {string} id.query.required - id required 
     * @param {PasswordUpdate.model} PasswordUpdate.body.required - the new point
     * @returns {object} 200 - success
     * @returns {Error}  default - Unexpected error
     */
    router.put('/users/updatePw/:id', userController.updatePw);


    /**
     * This function comment is parsed by doctrine
     * @route PUT /api/users/editPhoto
     * @group user - Operations about user
     * @param {string} id.query.required - id required 
     * @param {updateUserImg.model} userUrl.body.required  - this is a formData file where file name must be userUrl
     * @returns {object} 200 - success
     * @returns {Error}  default - Unexpected error
     */
    router.put('/users/editPhoto', upload.fields([{ name: 'userUrl', maxCount: 1 }]), userController.updateUserPhoto);

    /**
     * This function comment is parsed by doctrine
     * @route GET /api/users?id=
     * @group user - Operations about user
     * @param {string} id.query.required - id required 
     * @returns {object} 200 - success
     * @returns {Error}  default - Unexpected error
     */
    router.get("/users", userController.getUserById)



    /**
   * This function comment is parsed by doctrine
   * @route PUT /api/users/updateDoctor
   * @group doctors - Operations about user
   * @param {string} id.query.required - id required 
   * @param {DoctorUpdate.model} DoctorUpdate.body.required - the new point
   * @returns {object} 200 - success
   * @returns {Error}  default - Unexpected error
   */
    router.put('/users/updateDoctor', userController.updateDoctor);








    /**
     * This function comment is parsed by doctrine
     * @route GET /api/doctors
     * @group doctors- autocomplete doctor by name   
     * @param {string} keyword.query.required - keyword is required 
     * @returns {object} 200 - success
     * @returns {Error}  default - Unexpected error
     */
    router.get('/doctors', userController.autoCompleteDoctor);















}