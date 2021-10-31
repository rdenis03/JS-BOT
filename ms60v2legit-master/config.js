let version = "1.0.0";
let botName = "MS-60";
let owners = ["626813704616411160"];
let author = ["Denis"];
let links = {
    discord: "https://discord.gg/",
    website: "https://bluefoxhost.com",
}

// Your api keys
let api = {
    statcord: "", // https://statcord.com/
    pastebin: "" // https://pastebin.com/doc_scraping_api
}

// Token
let token = "NzI0OTMzNDczMDA1MDc2NTUw.XvHY6A.w26T-UYSVBNXBpI5r_kRYofn9lU";

// Time format for console logging
let timeFormat = "D MMM YYYY HH:mm:ss";

// Prefix for bot dms
let dmPrefix = "-";

// Default embed options
let embed = {
    color: "BLUE",
    footer: "ms-60"
}

// Toggle command trigger message
let deleteCommands = false;

// If a command is disabled the bot will ignore it
let disabledCommands = [];

// Toggle logging messages in console
let log = {
    commands: true,
    errors: true,
}

module.exports = {
    version,
    author,
    botName,
    owners,
    token,
    timeFormat,
    dmPrefix,
    links,
    api,
    embed,
    deleteCommands,
    disabledCommands,
    log,
}