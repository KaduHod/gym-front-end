 async function  getProfile (id)  {
    const pro = await axios.get(`http://localhost:9999/profile/${id}` )
    return pro.data.profile
} 

export default  getProfile;

