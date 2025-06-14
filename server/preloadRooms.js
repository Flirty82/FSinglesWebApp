const Room = require('./models/Room');

const predefinedRooms = [
    { name: 'Ages 18-25', description: 'Chat for ages 18 to 25' },
    { name: 'Ages 26-35', description: 'Chat for ages 26 to 35' },
    { name: 'Ages 36-45', description: 'Chat for ages 36 to 45' },
    { name: 'Ages 45+', dscription: 'Chat for ages 45 and older' },
    { name: 'Country Vibes', description: 'Country lifestyle and love' },
    { name: 'Hookups', description: 'One time flings!' },
    { name: 'Outdoor Lovers', description: 'For anyone who loves and enjoys hikers, camping, or just being out' },
    { name: 'B.F.Fs', description: 'For anyone looking for just friendship' },
    { name: 'Dating Experiences', description: 'Share your dating stories, experiences & more' }
];

async function preloadRooms() {
    for (let room of predefinedRooms) {
        const exists = await Room.findOne({ name: room.name });
        if (!exists) {
            await Room.create(room);
            console.log('Created room: ${room.name}');
        }
    }
}

module.exports = preloadRooms;