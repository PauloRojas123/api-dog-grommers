import mongoose from 'mongoose';
const { Schema, model } = mongoose;


const addressSchema = new Schema({
    street: {
        type: String,
        required: true,
    },
    number: {
        type: Number,
        require: true,
    },
    postalCode: {
        type: String,
        require: true,
    },
    city: {
        type: String,
        require: true,
    },
    country: {
        type: String,
        require: true,
    }
});


const dogGrommerSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    address: addressSchema,
    
    phone: {
        type: String,
        require: true,
    },
    email: {
        type: String,
    },
    avatar:{
        type: String,
        require: true
    },
    service: [{
        ref: 'Service',
        type: Schema.Types.ObjectId,
        require: true,
    }]
}, {
    timestamps: true,
    versionKey: false,
}
);

export default model('Dog', dogGrommerSchema)

