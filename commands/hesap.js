const math = require("math-expression-evaluator");
const Discord = require("discord.js");

module.exports = {
    name: "hesap",
    description: "Hesap yapar",
    async execute(client, message, args, tools) {

        if (!args[0]) return message.channel.send("Bir değer giriniz!");
        let resp;
        try {
            resp = math.eval(args.join(''));
        } catch (e) {
            return message.channel.send("Geçerli bir değer giriniz!");
        }
        const embed = new Discord.RichEmbed()
            .setColor(0xffffff)
            .setTitle("Matematik hesaplaması")
            .addField("Girdi", `\`\`\`js\n${args.join('')}\`\`\``)
            .addField("Çıktı", `\`\`\`js\n${resp}\`\`\``)

        message.channel.send(embed);
    }
}