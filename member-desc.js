import { statesAbbreviations } from "/statesAbbreviations.js";
import { zipCodes } from "/zipCodes.js";

var memberID = window.location.search.split("=")[1];

$.ajax({
  type: "GET",
  url:
    "https://api.congress.gov/v3/member/" +
    memberID +
    "?api_key=" +
    apiKeys.congress,
  success: function (data) {
    // Check for zipcode
    try {
      var zipcode = data["member"]["state"];
      if (
        data["member"]["terms"][data["member"]["terms"].length - 1][
          "chamber"
        ].toLowerCase() == "house of representatives"
      ) {
        let state = data["member"]["state"];
        state = statesAbbreviations[state].toLowerCase();
        let district;
        if (data["member"].hasOwnProperty("district")) {
          district = data["member"]["district"];
        } else {
          district = "at-large";
        }
        let ocdID =
          "ocd-division/country:us/state:" + state + "/cd:" + district;
        zipcode = zipCodes[ocdID];
        if (!zipcode) {
          zipcode = "94087";
        }
      }
    } catch (error) {
      zipcode = "94087";
    }
    $.ajax({
      type: "GET",
      url:
        "https://www.googleapis.com/civicinfo/v2/representatives?key=" +
        apiKeys.google +
        "&address=" +
        zipcode,
      success: function (dataByLocation) {
        let officials = dataByLocation.officials;
        var channelsHTML = "";
        var wikipedia = "";
        for (let official in officials) {
          let nameByLocation = officials[official]["name"].split(" ");
          if (
            (
              nameByLocation[0] +
              " " +
              nameByLocation[nameByLocation.length - 1]
            ).toLowerCase() ==
            (
              data["member"]["firstName"] +
              " " +
              data["member"]["lastName"]
            ).toLowerCase()
          ) {
            let channels = officials[official]["channels"];
            for (number in channels) {
              let type = channels[number].type;
              let id = channels[number].id;
              if (!type) {
                type = "Not Found";
              }
              if (!id) {
                id = "Not Found";
              }
              let currentChannelHTML =
                "<b>" + type + ": </b>" + "@" + id + "<br>";
              channelsHTML += currentChannelHTML;
            }
            let url = officials[official]["urls"][1];
            if (url) {
              wikipedia =
                "<b>Wikipedia: </b><a href='" +
                url +
                "' target='_blank'>" +
                "Wikipedia" +
                "</a><br>";
            }
          }
        }
        document.title = data["member"].directOrderName;
        let phoneNumber;
        let officeAddress;
        if (data.hasOwnProperty("member")) {
          if (data.member.hasOwnProperty("addressInformation")) {
            if (data.member.addressInformation.hasOwnProperty("phoneNumber")) {
              phoneNumber = data.member.addressInformation.phoneNumber;
              if (!phoneNumber) {
                phoneNumber = "Not Found";
              }
            }
            if (
              data.member.addressInformation.hasOwnProperty("officeAddress")
            ) {
              officeAddress = data.member.addressInformation.officeAddress;
              if (!officeAddress) {
                officeAddress = "Not Found";
              }
            }
          }
        }
        let memberImgTag =
          "<img src='" +
          data["member"]["depiction"].imageUrl +
          "' style='width:100%'>";
        let memberName = data["member"].directOrderName;
        let memberInfoHtml =
          "<b>Party: </b>" +
          data["member"]["partyHistory"][0].partyName +
          "<br/><b>State: </b>" +
          data["member"].state +
          "<br/><b>Current Chamber: </b>" +
          data["member"]["terms"][data["member"]["terms"].length - 1].chamber +
          "<br/><b>Website: </b><a href=" +
          data["member"].officialWebsiteUrl +
          " target='_blank'>" +
          data["member"].officialWebsiteUrl +
          "</a><br>" +
          wikipedia +
          "<b>Phone: </b>" +
          phoneNumber +
          "<br>\
      <b>Office Address: </b>" +
          officeAddress +
          "<br>" +
          channelsHTML +
          "\
      <b>Terms:</b>\
      <div style='overflow-y: auto; height: 32.5rem;'>";
        for (let singleTerm in data["member"].terms) {
          let termArray = data["member"]["terms"];
          let currentTerm = termArray[termArray.length - singleTerm - 1];
          if (currentTerm.endYear) {
            var endYearVariable = currentTerm.endYear;
          } else {
            var endYearVariable = "Present";
          }
          let termHTML =
            "<div class='card my-2'>\
  <h5 class='card-header'>" +
            currentTerm.startYear +
            " - " +
            endYearVariable +
            "</h5>\
  <div class='card-body'>\
    <h5 class='card-title'>" +
            currentTerm.chamber +
            "</h5>\
    <p class='card-text'><b>State: </b>" +
            currentTerm.stateName +
            "<br/><b>Congress Session: </b>" +
            currentTerm.congress +
            "</p>\
  </div>\
</div>";

          memberInfoHtml += termHTML;
        }
        memberInfoHtml += "</div>";
        $.ajax({
          type: "GET",
          url:
            "https://api.congress.gov/v3/member/" +
            memberID +
            "/sponsored-legislation?api_key=" +
            apiKeys.congress,
          success: function (data) {
            let sponsoredLegislationHtml =
              "<p style='margin-top: 3.5em'><b>Sponsored Legislation (latest 250)</b></p><div style='overflow-y:auto; height:45rem;'>";
            for (let singleLegislation in data["sponsoredLegislation"]) {
              let currentLegislation =
                data["sponsoredLegislation"][singleLegislation];
              let currentLegislationCategory = "No Category Found";
              if (currentLegislation.hasOwnProperty("policyArea")) {
                if (currentLegislation["policyArea"].hasOwnProperty["name"]) {
                  currentLegislationCategory =
                    currentLegislation["policyArea"]["name"];
                  if (currentLegislationCategory == null) {
                    currentLegislationCategory = "No Category Found";
                  }
                }
              }
              let currentLegislationTitle = "No Title Found";
              if (currentLegislation.hasOwnProperty("title")) {
                currentLegislationTitle = currentLegislation.title;
                if (currentLegislationTitle == null) {
                  currentLegislationTitle = "No Title Found";
                }
              }
              let currentLegislationActionDate = "No Action Date Found";
              let currentLegislationLatestAction = "No Latest Action Found";
              if (currentLegislation.hasOwnProperty("latestAction")) {
                if (currentLegislation["latestAction"] !== null) {
                  if (
                    currentLegislation["latestAction"].hasOwnProperty(
                      "actionDate"
                    )
                  ) {
                    currentLegislationActionDate =
                      currentLegislation["latestAction"].actionDate;
                    if (currentLegislationActionDate == null) {
                      currentLegislationActionDate = "No Action Date Found";
                    } else {
                      let month =
                        currentLegislationActionDate[5] +
                        currentLegislationActionDate[6];
                      if (month[0] == 0) {
                        month = month[1];
                      }
                      let day =
                        currentLegislationActionDate[8] +
                        currentLegislationActionDate[9];
                      if (day[0] == 0) {
                        day = day[1];
                      }
                      let year =
                        currentLegislationActionDate[0] +
                        currentLegislationActionDate[1] +
                        currentLegislationActionDate[2] +
                        currentLegislationActionDate[3];
                      currentLegislationActionDate =
                        month + "/" + day + "/" + year;
                    }
                  }
                  if (
                    currentLegislation["latestAction"].hasOwnProperty("text")
                  ) {
                    currentLegislationLatestAction =
                      currentLegislation["latestAction"].text;
                    if (currentLegislationLatestAction == null) {
                      currentLegislationLatestAction = "No Latest Action Found";
                    }
                  }
                }
              }
              let newLegislationHtml =
                "<div class = 'card my-2'>\
          <h5 class='card-header'>" +
                currentLegislationCategory +
                "</h5>\
            <div class='card-body'>\
              <h5 class='card-title'>" +
                currentLegislationTitle +
                "</h5>\
              <p class='card-text'><b>Latest Action (" +
                currentLegislationActionDate +
                "): </b>" +
                currentLegislationLatestAction +
                "\
              <br/><b>More Info: </b><a href='https://congress.gov/bill/" +
                currentLegislation.congress +
                "/" +
                currentLegislation.type +
                "/" +
                currentLegislation.number +
                "' target='_blank'>View</a>\
              </p>\
            </div>\
          </div>";

              sponsoredLegislationHtml += newLegislationHtml;
            }
            sponsoredLegislationHtml += "</div>";
            $("#sponsoredLegislationHtml").append(sponsoredLegislationHtml);
          },
        });

        // Add all information to DOM
        $("#memberName").append(memberName);
        $("#memberInfoWrapper").append(memberInfoHtml);
        $("#memberImg").append(memberImgTag);
      },
    });
  },
});
