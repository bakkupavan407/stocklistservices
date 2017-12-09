module.exports = {
    createobj: function(){
      return reobj = {
          status: "success",
          statusCode: 200,
          message: "Operation was successfull!"
      }
    },
    response: function(status, data) {
        if (status === "success") {
            var reobj = {
                status: "success",
                statusCode: 200,
                message: "Operation was successfull!"
            };
            if(data) {
              reobj.data = data
            }
            return reobj;
        } else if (status === "failure") {
        	return reobj = {
                status: "failure",
                statusCode: 500,
                message:  data.cmsg || (data && data.message) || "Something wrong with input data or server connection!"
            }
        }
    }
}
