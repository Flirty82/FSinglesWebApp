const Room = require('./models/Room');

const predefinedRooms = [
    { name: 'Ages 18-25', description: 'Chat for ages 18 to 25' },
    { name: 'Ages 26-35', description: 'Chat for ages 26 to 35' },
    { name: 'Ages 36-45', description: 'Chat for ages 36 to 45' },
    { name: 'Ages 46+', description: 'Chat for anyone 46 or older' },
    { name: 'Country Vibes', description: 'Country living' },
    { name: 'Outdoor Lovers', description: 'Chat for anyone who enjoys being outdoors!' },
    { name: 'Casual Dating', description: 'Chill, no pressure dating' },
    { name: 'Hookups', description: 'One night stands' },
    { name: 'Music/Dance', description: 'Connect through music' },
    { name: 'B.F.Fs', description: 'Find your new bff!' },
    { name: 'Pet Lovers', description: 'Chat for those who share same passion for animals/pets' },
    { name: 'Dating Experiences', description: 'A chat where you can share your dating experiences'}
];

async function preloadRooms() {
    for (let room of predefinedRooms) {
        const exists = await Room.fingOne({ name: room.name });
        if (!exists) {
            await Room.create(room);
            console.log('Created room: ${room.name}');
        }
    }
}

module.exports = preloadRooms;