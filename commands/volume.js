const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("volume")
    .setDescription("Turns on/off earrape mode")
    .addSubcommand((subcommand) =>
      subcommand.setName("normal").setDescription("Turns off earrape mode")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("hardcore").setDescription("Turns on earrape mode")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("set")
        .setDescription("Sets the volume of the current song, 100 is default. (1-1000)")
        .addIntegerOption((option) =>
          option
            .setName("volume")
            .setDescription("The volume to set the song to")
            .setRequired(true)
        )
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

    if (interaction.options.getSubcommand() === "normal") {
      // Toggle the loop
      queue.setVolume(10);

      // Return an embed to the user saying the song has been skipped
      await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(`Earrape mode has been turned off!`)
        ],
      });
    } else if (interaction.options.getSubcommand() === "hardcore") {
      // Toggle the loop
      queue.setVolume(1000);

      // Return an embed to the user saying the song has been skipped
      await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(`Earrape mode has been turned on!`)
        ],
      });
    } else if (interaction.options.getSubcommand() === "volume") {
        // Get the volume
        const volume = interaction.options.getInteger("volume");

        // Set the volume
        queue.setVolume(volume);

        // Return an embed to the user saying the song has been skipped
        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`Volume has been set to ${volume}!`)
            ],
        });
      }
  },
};
