const router = require("express").Router();
const mongoose = require("mongoose");

const Place = mongoose.model("TrekkingPlace");
const Description = mongoose.model("TrekkingDescription");

router.get("/", async (req, res) => {
  const places = await Place.find({}).sort('name');
  res.send(places);
});

router.get("/sort/:id", async (req, res) => {
  const places = await Place.find({}).sort(req.params.id);
  res.send(places);
});

router.get("/:placeId", async (req, res) => {
  const place = await Place.find({ _id: req.params.placeId }).populate(
    "descriptions"
  );
  res.send(place);
});

router.put("/:placeId", async (req, res) => {
  const place = await Place.findByIdAndUpdate(
    {
      _id: req.params.placeId
    },
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  res.send(place);
});

router.delete("/:placeId", async (req, res) => {
  const place = await Place.findByIdAndRemove({
    _id: req.params.placeId
  });
  res.send(place);
});

router.post("/", async (req, res) => {
  const place = new Place();
  place.name = req.body.name;
  place.location = req.body.location;
  place.imageURL = req.body.location;
  place.latitude = req.body.latitude;
  place.longitude = req.body.longitude;
  place.overallDetails = req.body.overallDetails;
  await place.save();
  res.send(place);
});

// /descriptions

// Create a Description
router.post("/:placeId/description", async (req, res) => {
  //Find a place
  const place = await Place.find({ _id: req.params.placeId });

  //Create a Description
  const description = new Description();
  description.qns = req.body.qns;
  description.ans = req.body.ans;
  description.place = place._id;
  await description.save();

  // Associate Place with description
  place.descriptions.push(description._id);
  await place.save();

  res.send(description);
});

//Read a Description
router.get("/:placeId/description", async (req, res) => {
  const place = await Place.find({ _id: req.params.placeId }).populate(
    "descriptions"
  );
  res.send(place);
});

//Edit a Description
router.put("/description/:descriptionId", async (req, res) => {
  const description = await Description.findOneAndUpdate(
    {
      _id: req.params.descriptionId
    },
    req.body,
    { new: true, runValidators: true }
  );

  res.send(description);
});

router.delete("/description/:descriptionId", async (req, res) => {
  await Description.findByIdAndRemove(req.params.descriptionId);
  res.send({ message: "Description Successfully Deleted" });
});

module.exports = router;
