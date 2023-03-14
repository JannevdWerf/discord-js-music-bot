const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("filter")
    .setDescription("Adds a filter to the current song")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("off")
        .setDescription("Removes all filters from the current song")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("add")
        .setDescription("Adds a filter to the current song")
        .addStringOption((option) =>
          option
            .setName("filter")
            .setDescription("The filter you want to add")
            .setRequired(true)
            .setAutocomplete(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("remove")
        .setDescription("Removes a filter from the current song")
        .addStringOption((option) =>
          option
            .setName("filter")
            .setDescription("The filter you want to remove")
            .setRequired(true)
            .setAutocomplete(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("list").setDescription("Lists all the filters")
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
      queue.setFilters({
        bassboost: false,
        vaporwave: false,
        nightcore: false,
        phaser: false,
        reverse: false,
        treble: false,
        normalizer: false,
        surrounding: false,
        subboost: false,
      });

    
      await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(`All filters have been removed!`)
            .setThumbnail(currentSong.thumbnail),
        ],
      });
    } else if (interaction.options.getSubcommand() === "add") {
      // Toggle the loop
      queue.setFilters({
        bassboost: interaction.options.getString("filter") === "bassboost",
        vaporwave: interaction.options.getString("filter") === "vaporwave",
        nightcore: interaction.options.getString("filter") === "nightcore",
        phaser: interaction.options.getString("filter") === "phaser",
        reverse: interaction.options.getString("filter") === "reverse",
        treble: interaction.options.getString("filter") === "treble",
        normalizer: interaction.options.getString("filter") === "normalizer",
        surrounding: interaction.options.getString("filter") === "surrounding",
        subboost: interaction.options.getString("filter") === "subboost",
      });

    
      await interaction.reply({
        embeds: [
          new EmbedBuilder().setDescription(
            `${interaction.options.getString("filter")} has been added!`
          ),
        ],
      });
    } else if (interaction.options.getSubcommand() === "remove") {
      // Toggle the loop
      queue.setFilters({
        bassboost: interaction.options.getString("filter") !== "bassboost",
        vaporwave: interaction.options.getString("filter") !== "vaporwave",
        nightcore: interaction.options.getString("filter") !== "nightcore",
        phaser: interaction.options.getString("filter") !== "phaser",
        reverse: interaction.options.getString("filter") !== "reverse",
        treble: interaction.options.getString("filter") !== "treble",
        normalizer: interaction.options.getString("filter") !== "normalizer",
        surrounding: interaction.options.getString("filter") !== "surrounding",
        subboost: interaction.options.getString("filter") !== "subboost",
      });

    
      await interaction.reply({
        embeds: [
          new EmbedBuilder().setDescription(
            `${interaction.options.getString("filter")} has been removed!`
          ),
        ],
      });
    } else if (interaction.options.getSubcommand() === "list") {
    
      await interaction.reply({
        embeds: [
          new EmbedBuilder().setDescription(
            `The list of all possible filters: \nbassboost, \n vaporwave, \n nightcore, \n phaser, \n reverse, \n treble, \n normalizer, \n surrounding, \n subboost`
          ),
        ],
      });
    }
  },
};
