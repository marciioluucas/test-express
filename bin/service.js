const moment = require("moment");

const axios = require("./axios");

let profiles = [];
let posts = [];
let lastGet;


const service = async () => {
  //fiz um pseudo-cache aqui pra n ficar tendo que consultar la no jsonplaceholder td hr
  if (posts.length === 0 || moment.duration(moment().diff(lastGet)).minutes() >= 5) {
    lastGet = moment();
    profiles = (await axios.get('/users')).data;
    posts = (await axios.get('/posts')).data;
    console.log(`Log: ultima requisição feita em ${lastGet.format("DD/MM/YYYY H:mm:ss")}`)
  }
  profiles = profiles.filter(item => item.company && item.company.name.toLowerCase().includes("group")).map(user => {
    const p = posts.filter(post => post.userId === user.id);

    return {
      ...user,
      posts: p
    }
  });
  return {posts, profiles};
}

module.exports = service;