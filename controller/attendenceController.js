const { Attendence } = require("../model/index");
const fetch = require("node-fetch");
const { json } = require("body-parser");
const takeAttend = (req, res) => {
  if (!req.body) {
    return res.status(404).json({
      msg: "Request not fund",
    });
  }
  const data = {
    userid: req.body.userid,
    img: req.body.img,
    date: req.body.date,
  };
  console.log({ data });
  //Calling FaceAPI
  const apidata = {
    path: data.img,
  };
  fetch("http://a9510a61882a.ngrok.io/getAttendence", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(apidata),
  })
    .then((reps) => reps.json(reps))
    .then((att) => {
      console.log(att.stlist);
      const newlist = att.stlist.map((item) => {
        return {
          name: item[1],
          roll_no: item[0],
        };
      });

      // console.log("newList", JSON.parse(newlist));
      const newentry = new Attendence({
        userid: data.userid,
        img: data.img,
        date: data.date,
        data: newlist,
      });
      return newentry.save();
    })
    .then((user1) => {
      return res.status(200).json({
        msg: "success",
        data: user1,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(402).json({ msg: err });
    });
};

const getAttend = (req, res) => {
  console.log(req.body);
  if (!req.body) {
    return res.status(404).json({
      msg: "Request not found",
    });
  }
  const data = {
    date: req.body.date,
    userid: req.body.userid,
  };

  Attendence.find({ date: data.date, userid: data.userid }, (err, data) => {
    if (err) {
      res.status(401).json({
        msg: "ERRROR",
        err: err,
      });
    }
    return res.status(200).json({
      msg: "Fetched Successfully",
      data,
    });
  });
};
module.exports = {
  takeAttend,
  getAttend,
};
