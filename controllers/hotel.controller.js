const db = require("../config/mongo.init");
const moment = require("moment");


exports.getAllHotels = (req, res) => {

    db.hotel.find().exec().then(r => {
        if (r.length !== 0) {

            res.status(200).send(JSON.stringify(r))
        } else {
            res.status(200).send({status: false, message: 'No hotel records are available'})
        }
    }).catch(e => {
        console.log('case', e)
    })
}
exports.getSearchParams = async (req, res) => {

    let filters = await db.hotel.find().select(['location','hotel', 'room', 'price', 'option_category1', 'option_category2', 'option_category3' ]).exec();
    let distinctlocation = [...new Set(filters.map(item => item.hotel))];
    let distincthotels = [...new Set(filters.map(item => item.hotel))];
    let distinctroom = [...new Set(filters.map(item => item.room))];
    let distinctprice = [...new Set(filters.map(item => item.price))];
    let option_category1 = [...new Set(filters.map(item => item.option_category1))];
    let option_category2 = [...new Set(filters.map(item => item.option_category2))];
    let option_category3 = [...new Set(filters.map(item => item.option_category3))];


    let hotels = []
    filters.forEach(item => {
        hotels = [...hotels, ...item.hotels]
    });

    res.status(200).send(JSON.stringify({
        location: location,
        hotel: distincthotels,
        arrivals: distinctroom,
        airlines: distinctprice,
        hotels: hotels,
        option1 : option_category1,
        option2 : option_category2,
        option3 : option_category3, 
    }))
}
exports.searchhotels = async (req, res) => {

    req.body.checkIn = moment(req.body.checkIn).utc().startOf("day").format("X");
    req.body.checkout = moment(req.body.checkout).utc().startOf("day").format("X");

    let hotels = await db.hotels.find({
        'checkIn': req.body.checkIn,
        'checkOut': req.body.checkOut,
        $or: [{"check_In": {$gt: req.body.checkIn}}, {"check_out": {$lt: req.body.checkOut}}, {"airline": req.body.airline}, {"cabins.name": req.body.cabin}]
    }).exec();
    if (hotels.length !== 0) {

        res.status(200).send({status: true,data:hotels})
    } else {
        res.status(200).send({status: false, message: 'No Hotel records are available'})
    }
}
exports.saveHotelReservation = async (req, res) => {

    const reservation = db.hotelReservation({
        hotel_id: req.body.hotel_id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        room_type: req.body.room_type,
        phone: req.body.phone,
        price: req.body.price,
        heads: req.body.heads,
        board_basis : req.body.board_basis,
        room_selection : req.body.room_selection,
    });
    const result = await reservation.save();

    if (result) {
        res.status(201).send({status: true, data: result})
    } else {
        res.status(200).send({status: false, message: 'Failed to save reservation'})
    }

}
