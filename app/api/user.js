const User = require('../models').User;
const Helper = require('../helper/helper');

module.exports = {

  getProfile(req, res) {
    return User
      .findOne({
        where:{
          nik:req.nik
        },
      })
      .then(resp => {
        
        res.status(200).send(Helper.response(200,"Berhasil",resp));
      })
      .catch((error) => {
        res.status(400).send(Helper.response(400,"Bad Request",null));
      });
  },

}
