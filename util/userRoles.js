const Discord = require("discord.js");
const qVars = require("./qVariables.js");

var userReactRoles = function(message, user, reaction, isSet) {
  if (message.channel.id == '745160938692280360') {
    // Max of two majors using auto-roles
    if(isSet && getNumOfMajors(message, user.id) >= 2) {
      // DM user
      qVars.CLIENT.users.cache.get(user.id).send("You may only set up to two majors at a time using auto-roles. If you would like more, please DM a mod (anyone on the server with the @ESC or @mod roles) for assistance.");
      return;
    }

    var locOfEmoji = qVars.LETTEREMOJIS.indexOf(reaction.emoji.name);

    if (message.id == '745162331662843984') {
      // Year
      if(locOfEmoji == -1 || locOfEmoji > qVars.YEARS.length - 1)
        return;

      if (isSet) {
        if(message.guild.member(user.id).roles.cache.find(r => r.name === "Prospective Student"))
          editRoles(message, user.id, "Prospective Student", false);

        for(let i = 0; i < qVars.YEARS.length; i++) {
          if(message.guild.member(user.id).roles.cache.find(r => r.name === qVars.YEARS[i])) {
            qVars.CLIENT.users.cache.get(user.id).send("You may only have a single graduation year. Please de-select the other year before setting a new one.");
            return;
          }
        }
      }

      editRoles(message, user.id, qVars.YEARS[locOfEmoji], isSet);
    } else if (message.id == '745162371848208384') {
      // Location
      if(locOfEmoji == -1 || locOfEmoji > qVars.LOCATION.length - 1)
        return;

      if (isSet) {
        for(let i = 0; i < qVars.LOCATION.length; i++) {
          if(message.guild.member(user.id).roles.cache.find(r => r.name === qVars.LOCATION[i])) {
            qVars.CLIENT.users.cache.get(user.id).send("You may only have a single location. Please de-select the other location before setting a new one.");
            return;
          }
        }
      }

      editRoles(message, user.id, qVars.LOCATION[locOfEmoji], isSet);
    } else if (message.id == '745162420456259614') {
      // Pronouns
      if(locOfEmoji == -1 || locOfEmoji > qVars.PRONOUNS.length - 1)
        return;

      editRoles(message, user.id, qVars.PRONOUNS[locOfEmoji], isSet);
    } else if (message.id == '745162473275129869') {
        // Staying
        if(locOfEmoji == -1 || locOfEmoji > qVars.LIVINGLOC.length - 1)
          return;

        if (isSet) {
          for(let i = 0; i < qVars.LOCATION.length; i++) {
            if(message.guild.member(user.id).roles.cache.find(r => r.name === qVars.LIVINGLOC[i])) {
              qVars.CLIENT.users.cache.get(user.id).send("You may only have a single living location. Please de-select the other living location before setting a new one.");
              return;
            }
          }
        }

        editRoles(message, user.id, qVars.LIVINGLOC[locOfEmoji], isSet);
    } else if (message.id == '745162532401971270') {
      // ACES 1
      // Handle special case roles
      switch(locOfEmoji) {
        case -1:
          return;

        case 0:
          editRoles(message, user.id, qVars.COLLEGES[0], isSet);
          editRoles(message, user.id, "Undeclared", isSet)
          return;

        case 5:
          editRoles(message, user.id, qVars.COLLEGES[0], isSet);
          editRoles(message, user.id, "Advertising", isSet);
          editRoles(message, user.id, qVars.COLLEGES[0], isSet);
          editRoles(message, user.id, qVars.ACESMAJORS[26], isSet);
          return;

        case 6:
          editRoles(message, user.id, qVars.COLLEGES[0], isSet);
          editRoles(message, user.id, "Journalism", isSet);
          editRoles(message, user.id, qVars.ACESMAJORS[26], isSet);
          return;

        default:
          break;
      }

      if(locOfEmoji > 6)
        locOfEmoji -= 3;
      else
        locOfEmoji--;

      editRoles(message, user.id, qVars.COLLEGES[0], isSet);
      editRoles(message, user.id, qVars.ACESMAJORS[locOfEmoji], isSet);
    } else if (message.id == '745162562588639261') {
      // ACES 2
      locOfEmoji += 18;
      editRoles(message, user.id, qVars.COLLEGES[0], isSet);
      editRoles(message, user.id, qVars.ACESMAJORS[locOfEmoji], isSet);
    } else if (message.id == '745162595991814155') {
      // Health Sciences
      if(locOfEmoji == -1 || locOfEmoji > 5)
        return;

      editRoles(message, user.id, qVars.COLLEGES[1], isSet);
      editRoles(message, user.id, qVars.HEALTHMAJORS[locOfEmoji], isSet);
    } else if (message.id == '745162634554376242') {
      // Education
      if(locOfEmoji == -1 || locOfEmoji > 4)
        return;

      editRoles(message, user.id, qVars.COLLEGES[2], isSet);
      editRoles(message, user.id, qVars.EDUCATIONMAJORS[locOfEmoji], isSet);
    } else if (message.id == '745162672320020490') {
      // Fine/Applied Arts 1
      if(locOfEmoji == -1 || locOfEmoji > 19)
        return;

      editRoles(message, user.id, qVars.COLLEGES[3], isSet);
      editRoles(message, user.id, qVars.ARTMAJORS[locOfEmoji], isSet);
    } else if (message.id == '745162688476217375') {
      // Fine/Applied Arts 2
      if(locOfEmoji == -1 || locOfEmoji > 8)
        return;

      locOfEmoji += 20;
      editRoles(message, user.id, qVars.COLLEGES[3], isSet);
      editRoles(message, user.id, qVars.ARTMAJORS[locOfEmoji], isSet);
    } else if (message.id == '745162728934735884') {
      // LAS 1
      if(locOfEmoji == -1 || locOfEmoji > 19)
        return;

      editRoles(message, user.id, qVars.COLLEGES[4], isSet);
      editRoles(message, user.id, qVars.LASMAJORS[locOfEmoji], isSet);
    } else if (message.id == '745162751248171059') {
      // LAS 2
      if(locOfEmoji == -1 || locOfEmoji > 19)
        return;

      locOfEmoji += 20;
      editRoles(message, user.id, qVars.COLLEGES[4], isSet);
      editRoles(message, user.id, qVars.LASMAJORS[locOfEmoji], isSet);
    } else if (message.id == '745162770617598032') {
      // LAS 3
      if(locOfEmoji == -1 || locOfEmoji > 17)
        return;

      editRoles(message, user.id, qVars.COLLEGES[4], isSet);

      if(locOfEmoji > 8) {
        // add CS role
        editRoles(message, user.id, "CompSci + X", isSet);
        locOfEmoji -= 8;

        switch(locOfEmoji) {
          // add +x role
          case 1:
            editRoles(message, user.id, "Geography", isSet);
            break;
          case 2:
            editRoles(message, user.id, "Philosophy", isSet);
            break;
          case 3:
            editRoles(message, user.id, "Anthro", isSet);
            break;
          case 4:
            editRoles(message, user.id, "Astronomy", isSet);
            break;
          case 5:
            editRoles(message, user.id, "Chemistry", isSet);
            break;
          case 6:
            editRoles(message, user.id, "Econ", isSet);
            break;
          case 7:
            editRoles(message, user.id, "Linguistics", isSet);
            break;
          case 8:
            editRoles(message, user.id, "Statistics", isSet);
            break;
          case 9:
            editRoles(message, user.id, "Math", isSet);
            break;
        }

        return;
      }

      locOfEmoji += 20;

      editRoles(message, user.id, qVars.LASMAJORS[locOfEmoji], isSet);
    } else if (message.id == '745162802137792655') {
      // Media
      if(locOfEmoji == -1 || locOfEmoji > qVars.MEDIAMAJORS.length - 1)
        return;

      editRoles(message, user.id, qVars.COLLEGES[5], isSet);
      editRoles(message, user.id, qVars.MEDIAMAJORS[locOfEmoji], isSet);
    } else if (message.id == '745162844579823637') {
      // DGS
      if(locOfEmoji == -1 || locOfEmoji > qVars.DGSMAJORS.length - 1)
        return;

      editRoles(message, user.id, qVars.COLLEGES[6], isSet);
      editRoles(message, user.id, qVars.DGSMAJORS[locOfEmoji], isSet);
    } else if (message.id == '745162874434879549') {
      // Gies
      if(locOfEmoji == -1 || locOfEmoji > qVars.GIESMAJORS.length - 1)
        return;

      editRoles(message, user.id, qVars.COLLEGES[7], isSet);
      editRoles(message, user.id, qVars.GIESMAJORS[locOfEmoji], isSet);
    } else if (message.id == '745162909335814145') {
      // Grainger
      if(locOfEmoji == -1 || locOfEmoji > qVars.GRAINGERMAJORS.length - 1)
        return;

      editRoles(message, user.id, qVars.COLLEGES[8], isSet);
      editRoles(message, user.id, qVars.GRAINGERMAJORS[locOfEmoji], isSet);
    } else if (message.id == '745162937890635896') {
      // Info Sci
      if(locOfEmoji == -1 || locOfEmoji > qVars.INFOSCIMAJORS.length - 1)
        return;

      editRoles(message, user.id, qVars.COLLEGES[9], isSet);
      editRoles(message, user.id, qVars.INFOSCIMAJORS[locOfEmoji], isSet);
    } else if (message.id == '745162964973125672') {
      // Social Work
      if(locOfEmoji == -1 || locOfEmoji > qVars.SOCIALMAJORS.length - 1)
        return;

      editRoles(message, user.id, qVars.COLLEGES[1], isSet);
      editRoles(message, user.id, qVars.SOCIALMAJORS[locOfEmoji], isSet);
    } else if (message.id == '745162998473162852') {
      // Special Roles
      if(locOfEmoji == -1 || locOfEmoji > qVars.SPECIALROLES.length - 1)
        return;

      editRoles(message, user.id, qVars.SPECIALROLES[locOfEmoji], isSet);
    }

    return;
  }
};

var editRoles = function(message, userId, roleName, isSet) {
  var currRole = message.guild.roles.cache.find(role => role.name === roleName);

  if(isSet)
    message.guild.member(userId).roles.add(currRole);
  else
    message.guild.member(userId).roles.remove(currRole);
};

var getNumOfMajors = function(message, userId) {
  var amnt = 0;

  var allMajors = [
    qVars.ACESMAJORS,
    qVars.HEALTHMAJORS,
    qVars.EDUCATIONMAJORS,
    qVars.ARTMAJORS,
    qVars.LASMAJORS,
    qVars.MEDIAMAJORS,
    qVars.DGSMAJORS,
    qVars.GIESMAJORS,
    qVars.GRAINGERMAJORS,
    qVars.INFOSCIMAJORS,
    qVars.SOCIALMAJORS,
  ];

  for(let i = 0; i < allMajors.length; i++) {
    for(let j = 0; j < allMajors[i].length; j++) {
      if(message.guild.member(userId).roles.cache.find(r => r.name === allMajors[i][j]))
        amnt++;

      if(amnt >= 2)
        return amnt;
    }
  }

  return amnt;
};

module.exports = {
  userReactRoles,
};