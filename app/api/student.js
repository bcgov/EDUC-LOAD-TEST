
  
async function postStudent(token, url) {
    try{
    const getDataConfig = {
        headers: {
        Authorization: `Bearer ${token}`,
        },
        data: {
        }
    };
    const response = await axios.post(url, getDataConfig);
    return response;
    } catch(e){
    console.log('Error posting to DigitalID API');
    }
};
  
const digitalId = {
    postStudent
};
  
module.exports = digitalId;
  