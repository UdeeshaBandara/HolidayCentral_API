const hotelModel = require("../model/hotel.model");
const hotelReservationModel = require("../model/hotel.reservation.model");

exports.validateHotelSearchParams = (req, res, next) => {
    const {error} = hotelModel.joihotelSearch.validate({
        location: req.bod.location,
        hotel: req.body.hotel,
        checkIn: req.body.checkIn,
        checkOut: req.body.checkOut,
        room: req.body.room,
        heads: req.body.heads,
        option1: req.body.opton1,
        option2: req.body.opton2,
        option3: req.body.opton3,
    
    });
    if (error) return res.status(400).json({error: error.details[0].message});
    return next();
}

exports.validateHoteltSave = (req, res, next) => {
    const {error} = hotelReservationModel.joiFlightReservationSave.validate({
        location: req.bod.location,
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
    if (error) return res.status(400).json({error: error.details[0].message});
    return next();
}
