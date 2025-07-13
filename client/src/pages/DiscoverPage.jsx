const sendFlirt = async (receiverId) => {
  const user = JSON.parse(localStorage.getItem('user'));
  await axios.post('https://www.flirtingsingles.blog/api/flirts/send', {
    senderId: user._id,
    receiverId
  });
  alert('Flirt sent!');
};
<button onClick={() => sendFlirt(user._id)} className="text-pink-600 mt-1">
  💘 Flirt
</button>
