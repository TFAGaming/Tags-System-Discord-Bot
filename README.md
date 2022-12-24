# Before getting started...

## Copyright warning
Everyone must understand that this project is owned by me (T.F.A#7524), and if I see anybody making a YouTube video about this project without linking this GitHub repository in the description, their video will be taken down by me. Learn [YouTube copyright](https://www.youtube.com/howyoutubeworks/policies/copyright/) and do not steal anybody's projects. Thank you for reading this.<br>
List of the developers are linked in this [file](https://github.com/TFAGaming/Tags-System-Discord-Bot/blob/main/AUTHORS.md).

CHANGING MY NAME (T.F.A#7524) TO ANY OTHER USERNAME IS GOING TO BE AN INSTANT COPYRIGHT STRIKE. BE CAREFUL FROM GETTING A STRIKE FROM ME.

## The project
The project is not 100% finished, some features could be add in the future and bugs may occurs anywhere. Please do **not** create an issue saying "It's broken", "not working at all", or other similar comments. Thank you.

# Tags System Discord Bot (version 2.0)
A bot that allows you and your server members to create tags and share them to the public or make them private for them only! (Bot especially for programming servers). The project is made with javascript, [discord.js](https://www.npmjs.com/package/discord.js), and with my package [super-djs](https://www.npmjs.com/package/super-djs). The bot can support multiple servers but you need to have a super big MongoDB URI database! If you are using a free cluster, I suggest you to use your bot only in **one** server, and not for other servers.

# Features
- Report system<br><img src="https://media.discordapp.net/attachments/996343173922168872/1048654110183936111/2022-12-03_18_34_09-Window.png">
- Starring system (Like GitHub) & code block/file button changer<br><img src="https://media.discordapp.net/attachments/996343173922168872/1048654110553022524/2022-12-03_18_34_23-Window.png">
- Detailed informations<br><img src="https://media.discordapp.net/attachments/996343173922168872/1048654110985048174/2022-12-03_18_36_00-Window.png"><img src="https://media.discordapp.net/attachments/996343173922168872/1048654111291220070/2022-12-03_18_36_15-Window.png"><img src="https://media.discordapp.net/attachments/996343173922168872/1048655499027038269/2022-12-03_18_42_23-Window.png">

# Setup
## Dependencies installation:
Run the command below in your IDE's shell or terminal to install all the required packages:

```shell
npm i discord.js@14 discord.js-v14-helper fs mathjs mongoose ms node-fetch@cjs os super-djs
```

## Start the project:
The setup for now is for [Visual Studio Code](https://code.visualstudio.com/) users only. If you are a repl.it user and non-beginner programmer, you can read the setup below but you have to edit the Environment processing for MongoDB and the bot token.
- 1. Install [Visual Studio Code](https://code.visualstudio.com/).
- 2. Install [node.js](https://nodejs.org/en/download/).
- 3. Open command propmt (WIND ICON + R → "cmd") and then type `node -v`. If it responds with a version v"16.9.0" or above, you're OK to continue to the next step.
- 4. [Download the project](https://github.com/TFAGaming/Tags-System-Discord-Bot/archive/refs/heads/main.zip) and extract the folder from .zip folder to a normal folder.
- 5. Open the folder on a new VSCode tab.
- 6. Go to `config` folder and edit the properties of each file. (I made a configuration organized)
- 7. Open terminal and then type `node index.js` or `node .`.
- 8. Enjoy.
