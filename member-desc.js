var memberID = window.location.search.split("=")[1];

const statesAbbreviations = {
  Alabama: "AL",
  Alaska: "AK",
  Arizona: "AZ",
  Arkansas: "AR",
  California: "CA",
  Colorado: "CO",
  Connecticut: "CT",
  Delaware: "DE",
  Florida: "FL",
  Georgia: "GA",
  Hawaii: "HI",
  Idaho: "ID",
  Illinois: "IL",
  Indiana: "IN",
  Iowa: "IA",
  Kansas: "KS",
  Kentucky: "KY",
  Louisiana: "LA",
  Maine: "ME",
  Maryland: "MD",
  Massachusetts: "MA",
  Michigan: "MI",
  Minnesota: "MN",
  Mississippi: "MS",
  Missouri: "MO",
  Montana: "MT",
  Nebraska: "NE",
  Nevada: "NV",
  "New Hampshire": "NH",
  "New Jersey": "NJ",
  "New Mexico": "NM",
  "New York": "NY",
  "North Carolina": "NC",
  "North Dakota": "ND",
  Ohio: "OH",
  Oklahoma: "OK",
  Oregon: "OR",
  Pennsylvania: "PA",
  "Rhode Island": "RI",
  "South Carolina": "SC",
  "South Dakota": "SD",
  Tennessee: "TN",
  Texas: "TX",
  Utah: "UT",
  Vermont: "VT",
  Virginia: "VA",
  Washington: "WA",
  "West Virginia": "WV",
  Wisconsin: "WI",
  Wyoming: "WY",
};

const zipCodes = {
  "ocd-division/country:us/state:ma/cd:1": "01262",
  "ocd-division/country:us/state:ma/cd:2": "01301",
  "ocd-division/country:us/state:me/cd:2": "04607",
  "ocd-division/country:us/state:me/cd:1": "04568",
  "ocd-division/country:us/state:ct/cd:5": "06812",
  "ocd-division/country:us/state:ct/cd:4": "06907",
  "ocd-division/country:us/state:nj/cd:8": "07201",
  "ocd-division/country:us/state:nj/cd:11": "07035",
  "ocd-division/country:us/state:nj/cd:9": "07014",
  "ocd-division/country:us/state:nj/cd:7": "07065",
  "ocd-division/country:us/state:nj/cd:10": "07033",
  "ocd-division/country:us/state:ny/cd:17": "10993",
  "ocd-division/country:us/state:ny/cd:18": "10996",
  "ocd-division/country:us/state:ny/cd:4": "11516",
  "ocd-division/country:us/state:ny/cd:3": "11362",
  "ocd-division/country:us/state:ny/cd:7": "11237",
  "ocd-division/country:us/state:ny/cd:9": "11230",
  "ocd-division/country:us/state:ny/cd:11": "11228",
  "ocd-division/country:us/state:ny/cd:10": "11232",
  "ocd-division/country:us/state:ny/cd:8": "11239",
  "ocd-division/country:us/state:ny/cd:14": "11356",
  "ocd-division/country:us/state:ny/cd:6": "11367",
  "ocd-division/country:us/state:ny/cd:5": "11412",
  "ocd-division/country:us/state:ny/cd:24": "13166",
  "ocd-division/country:us/state:ny/cd:22": "13363",
  "ocd-division/country:us/state:ny/cd:19": "13124",
  "ocd-division/country:us/state:ny/cd:21": "13410",
  "ocd-division/country:us/state:pa/cd:12": "15290",
  "ocd-division/country:us/state:pa/cd:17": "15237",
  "ocd-division/country:us/state:pa/cd:14": "15443",
  "ocd-division/country:us/state:pa/cd:10": "17370",
  "ocd-division/country:us/state:pa/cd:13": "17353",
  "ocd-division/country:us/state:pa/cd:11": "17518",
  "ocd-division/country:us/state:pa/cd:4": "19564",
  "ocd-division/country:us/state:pa/cd:6": "19611",
  "ocd-division/country:us/state:pa/cd:9": "19567",
  "ocd-division/country:us/state:de/cd:at-large": "19952",
  "ocd-division/country:us/district:dc/cd:at-large": "20002",
  "ocd-division/country:us/state:va/cd:7": "22948",
  "ocd-division/country:us/state:va/cd:1": "22578",
  "ocd-division/country:us/state:va/cd:6": "22820",
  "ocd-division/country:us/state:va/cd:10": "22747",
  "ocd-division/country:us/state:va/cd:5": "22903",
  "ocd-division/country:us/state:wv/cd:1": "25309",
  "ocd-division/country:us/state:nc/cd:1": "27967",
  "ocd-division/country:us/state:nc/cd:3": "27976",
  "ocd-division/country:us/state:nc/cd:8": "28009",
  "ocd-division/country:us/state:nc/cd:10": "28021",
  "ocd-division/country:us/state:sc/cd:5": "29364",
  "ocd-division/country:us/state:sc/cd:6": "29162",
  "ocd-division/country:us/state:sc/cd:2": "29212",
  "ocd-division/country:us/state:sc/cd:7": "29161",
  "ocd-division/country:us/state:sc/cd:3": "29355",
  "ocd-division/country:us/state:sc/cd:4": "29301",
  "ocd-division/country:us/state:ga/cd:9": "30643",
  "ocd-division/country:us/state:ga/cd:10": "30683",
  "ocd-division/country:us/state:ga/cd:14": "30756",
  "ocd-division/country:us/state:ga/cd:12": "30833",
  "ocd-division/country:us/state:ga/cd:8": "31017",
  "ocd-division/country:us/state:ga/cd:2": "31028",
  "ocd-division/country:us/state:fl/cd:2": "32462",
  "ocd-division/country:us/state:fl/cd:1": "32583",
  "ocd-division/country:us/state:fl/cd:3": "34482",
  "ocd-division/country:us/state:fl/cd:6": "32617",
  "ocd-division/country:us/state:fl/cd:7": "32773",
  "ocd-division/country:us/state:fl/cd:11": "34787",
  "ocd-division/country:us/state:fl/cd:10": "32789",
  "ocd-division/country:us/state:fl/cd:12": "34691",
  "ocd-division/country:us/state:fl/cd:13": "34698",
  "ocd-division/country:us/state:fl/cd:9": "34773",
  "ocd-division/country:us/state:fl/cd:21": "34990",
  "ocd-division/country:us/state:al/cd:6": "35005",
  "ocd-division/country:us/state:al/cd:7": "35020",
  "ocd-division/country:us/state:al/cd:3": "35032",
  "ocd-division/country:us/state:tn/cd:4": "37345",
  "ocd-division/country:us/state:tn/cd:7": "37238",
  "ocd-division/country:us/state:tn/cd:6": "37216",
  "ocd-division/country:us/state:tn/cd:5": "37220",
  "ocd-division/country:us/state:tn/cd:3": "37370",
  "ocd-division/country:us/state:ms/cd:3": "39665",
  "ocd-division/country:us/state:ms/cd:4": "39595",
  "ocd-division/country:us/state:ms/cd:2": "39645",
  "ocd-division/country:us/state:ms/cd:1": "39773",
  "ocd-division/country:us/state:ky/cd:2": "42784",
  "ocd-division/country:us/state:ky/cd:1": "42758",
  "ocd-division/country:us/state:oh/cd:12": "43105",
  "ocd-division/country:us/state:oh/cd:15": "45363",
  "ocd-division/country:us/state:oh/cd:4": "45334",
  "ocd-division/country:us/state:oh/cd:3": "43081",
  "ocd-division/country:us/state:oh/cd:2": "45245",
  "ocd-division/country:us/state:oh/cd:1": "45267",
  "ocd-division/country:us/state:oh/cd:8": "45390",
  "ocd-division/country:us/state:oh/cd:10": "45409",
  "ocd-division/country:us/state:in/cd:9": "47467",
  "ocd-division/country:us/state:in/cd:8": "47838",
  "ocd-division/country:us/state:mi/cd:2": "49639",
  "ocd-division/country:us/state:mi/cd:4": "49453",
  "ocd-division/country:us/state:mi/cd:3": "49548",
  "ocd-division/country:us/state:mi/cd:1": "49676",
  "ocd-division/country:us/state:ia/cd:4": "51654",
  "ocd-division/country:us/state:ia/cd:3": "51656",
  "ocd-division/country:us/state:ia/cd:2": "52158",
  "ocd-division/country:us/state:ia/cd:1": "52071",
  "ocd-division/country:us/state:wi/cd:3": "54773",
  "ocd-division/country:us/state:wi/cd:7": "54870",
  "ocd-division/country:us/state:mn/cd:8": "56669",
  "ocd-division/country:us/state:mn/cd:7": "56594",
  "ocd-division/country:us/state:nd/cd:at-large": "58856",
  "ocd-division/country:us/state:il/cd:16": "61364",
  "ocd-division/country:us/state:il/cd:17": "61282",
  "ocd-division/country:us/state:il/cd:12": "62999",
  "ocd-division/country:us/state:mo/cd:2": "63089",
  "ocd-division/country:us/state:mo/cd:8": "65775",
  "ocd-division/country:us/state:mo/cd:3": "63030",
  "ocd-division/country:us/state:mo/cd:1": "63121",
  "ocd-division/country:us/state:mo/cd:7": "65807",
  "ocd-division/country:us/state:mo/cd:4": "65764",
  "ocd-division/country:us/state:ks/cd:3": "66083",
  "ocd-division/country:us/state:ne/cd:3": "68665",
  "ocd-division/country:us/state:ne/cd:1": "68653",
  "ocd-division/country:us/state:la/cd:5": "71483",
  "ocd-division/country:us/state:la/cd:4": "71497",
  "ocd-division/country:us/state:ar/cd:4": "71937",
  "ocd-division/country:us/state:ar/cd:1": "71678",
  "ocd-division/country:us/state:ok/cd:4": "73573",
  "ocd-division/country:us/state:ok/cd:2": "73461",
  "ocd-division/country:us/state:ok/cd:3": "73835",
  "ocd-division/country:us/state:tx/cd:36": "75979",
  "ocd-division/country:us/state:tx/cd:25": "76077",
  "ocd-division/country:us/state:tx/cd:24": "76248",
  "ocd-division/country:us/state:tx/cd:6": "76084",
  "ocd-division/country:us/state:tx/cd:26": "76238",
  "ocd-division/country:us/state:tx/cd:12": "76135",
  "ocd-division/country:us/state:tx/cd:33": "76115",
  "ocd-division/country:us/state:tx/cd:13": "76351",
  "ocd-division/country:us/state:tx/cd:27": "78616",
  "ocd-division/country:us/state:tx/cd:15": "78576",
  "ocd-division/country:us/state:tx/cd:34": "78599",
  "ocd-division/country:us/state:tx/cd:28": "78591",
  "ocd-division/country:us/state:tx/cd:31": "78633",
  "ocd-division/country:us/state:tx/cd:11": "78609",
  "ocd-division/country:us/state:tx/cd:17": "78615",
  "ocd-division/country:us/state:co/cd:3": "81654",
  "ocd-division/country:us/state:co/cd:7": "81251",
  "ocd-division/country:us/state:co/cd:2": "81657",
  "ocd-division/country:us/state:wy/cd:at-large": "82430",
  "ocd-division/country:us/state:az/cd:2": "86324",
  "ocd-division/country:us/state:az/cd:9": "85396",
  "ocd-division/country:us/state:az/cd:1": "85377",
  "ocd-division/country:us/state:az/cd:8": "85381",
  "ocd-division/country:us/state:az/cd:6": "85658",
  "ocd-division/country:us/state:az/cd:7": "85624",
  "ocd-division/country:us/state:ca/cd:44": "90731",
  "ocd-division/country:us/state:ca/cd:42": "90831",
  "ocd-division/country:us/state:ca/cd:28": "91125",
  "ocd-division/country:us/state:ca/cd:30": "91506",
  "ocd-division/country:us/state:ca/cd:32": "91436",
  "ocd-division/country:us/state:ca/cd:26": "91360",
  "ocd-division/country:us/state:ca/cd:27": "91355",
  "ocd-division/country:us/state:ca/cd:29": "91405",
  "ocd-division/country:us/state:ca/cd:31": "91731",
  "ocd-division/country:us/state:ca/cd:35": "91764",
  "ocd-division/country:us/state:ca/cd:8": "94805",
  "ocd-division/country:us/state:ca/cd:2": "94973",
  "ocd-division/country:us/state:ca/cd:17": "95050",
  "ocd-division/country:us/state:ca/cd:19": "95123",
  "ocd-division/country:us/state:ca/cd:18": "95116",
  "ocd-division/country:us/state:ca/cd:16": "95030",
  "ocd-division/country:us/state:ca/cd:9": "95203",
  "ocd-division/country:us/state:or/cd:4": "97498",
  "ocd-division/country:us/state:or/cd:2": "97830",
  "ocd-division/country:us/state:ak/cd:at-large": "99929",
};

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
        for (term in officials) {
          let nameByLocation = officials[term]["name"].split(" ");
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
            let channels = officials[term]["channels"];
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
            let url = officials[term]["urls"][1];
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
        for (term in data["member"].terms) {
          let termArray = data["member"]["terms"];
          let currentTerm = termArray[termArray.length - term - 1];
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
            for (legislation in data["sponsoredLegislation"]) {
              let currentLegislation =
                data["sponsoredLegislation"][legislation];
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
