const { MessageEmbed } = require("discord.js");
const nodeFetch = require("node-fetch");
require("dotenv").config();
module.exports = {
  name: "reddit",
  async execute(client, message, args) {
    const targetURL = `https://reddit.com/r/${args[0]}/.json?limit=100`;
    const resp = await nodeFetch(targetURL, {
      Header: { "user-agent": process.env.USERAGENT },
    });
    const body = await resp.json();
    const allowed = message.channel.nsfw
      ? body.data.children.filter((child) => child.data.media === null)
      : body.data.children.filter(
          (child) => !child.data.over_18 && child.data.media === null
        );
    if (!allowed.length) {
      return message.channel.send(
        "It seems we are out of fresh memes!, Try again later."
      );
    }
    const randomNumber = Math.floor(Math.random() * allowed.length);
    const post = allowed[randomNumber].data;

    const embed = new MessageEmbed()
      .setTitle(post.title)
      .setImage(post.url.replace(".gifv", ".gif"))
      .setFooter({ text: `r/${args[0]}` });
    console.log(post);
    message.channel.send({ embeds: [embed] });
  },
};
