const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("loop")
    .setDescription("Loops the current song")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("off")
        .setDescription("Stops looping the current songT")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("on").setDescription("Starts looping the current song")
    ),

  execute: async ({ client, interaction }) => {
    // Get the queue for the server
    const queue = client.player.getQueue(interaction.guildId);

    // If there is no queue, return
    if (!queue) {
      await interaction.reply("There are no songs in the queue");
      return;
    }

    // Get the current song
    const currentSong = queue.current;

    // If there is no current song, return
    if (!currentSong) {
      await interaction.reply("There is no song playing");
      return;
    }

    if (interaction.options.getSubcommand() === "off") {
      // Toggle the loop
      queue.setRepeatMode(0);

      // Return an embed to the user saying the song has been skipped
      await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(`${currentSong.title} has been unlooped!`)
            .setThumbnail(currentSong.thumbnail),
        ],
      });
    } else if (interaction.options.getSubcommand() === "on") {
      // Toggle the loop
      queue.setRepeatMode(1);

      // Return an embed to the user saying the song has been skipped
      await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(`${currentSong.title} has been looped!`)
            .setThumbnail(currentSong.thumbnail),
        ],
      });
    }
  },
};
