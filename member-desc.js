console.log(window.location.search);
var memberID = window.location.search.split("=")[1];

$.get(
  "https://api.congress.gov/v3/member/" +
    memberID +
    "?api_key=O4qhb9hRP8dwqw9yr7TPkAUeeJyXGb2Y37ntvfzA",
  function (data) {
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
      "</a><br> <b>Terms:</b>";
    for (term in data["member"].terms) {
      console.log(term);
      if (data["member"].terms[term].endYear) {
        var endYearVariable = data["member"].terms[term].endYear;
      } else {
        var endYearVariable = "Present";
      }
      let termHTML =
        "<div class='card my-2'>\
  <h5 class='card-header'>" +
        data["member"].terms[term].startYear +
        " - " +
        endYearVariable +
        "</h5>\
  <div class='card-body'>\
    <h5 class='card-title'>" +
        data["member"].terms[term].chamber +
        "</h5>\
    <p class='card-text'><b>State: </b>" +
        data["member"].terms[term].stateName +
        "<br/><b>Congress Session: </b>" +
        data["member"].terms[term].congress +
        "</p>\
  </div>\
</div>";

      memberInfoHtml = memberInfoHtml + termHTML;
    }

    $.get(
      "https://api.congress.gov/v3/member/" +
        memberID +
        "/sponsored-legislation?api_key=O4qhb9hRP8dwqw9yr7TPkAUeeJyXGb2Y37ntvfzA",
      function (data) {
        console.log(data);
        let sponsoredLegislationHtml =
          "<p style='margin-top: 3.5em'><b>Sponsored Legislation (latest 250)</b></p>";
        for (legislation in data["sponsoredLegislation"]) {
          let currentLegislation = data["sponsoredLegislation"][legislation];
          let currentLegislationCategory =
            currentLegislation["policyArea"].name;
          if (currentLegislationCategory == null) {
            currentLegislationCategory = "No Category";
          }
          let newLegislationHtml =
            "<div class = 'card my-2'>\
          <h5 class='card-header'>" +
            currentLegislationCategory +
            "</h5>\
            <div class='card-body'>\
              <h5 class='card-title'>" +
            currentLegislation.title +
            "</h5>\
              <p class='card-text'><b>Latest Action (" +
            currentLegislation["latestAction"].actionDate +
            "): </b>" +
            currentLegislation["latestAction"].text +
            "\
              <br/><b>More Info: </b><a href=" +
            currentLegislation.url +
            ">Click Here<a/>\
              </p>\
            </div>\
          </div>";

          sponsoredLegislationHtml =
            sponsoredLegislationHtml + newLegislationHtml;
        }
        $("#sponsoredLegislationHtml").append(sponsoredLegislationHtml);
      }
    );

    $("#memberName").append(memberName);
    $("#memberInfoWrapper").append(memberInfoHtml);
    $("#memberImg").append(memberImgTag);

    /*
    1. Name
    2. Image
    3. Party
    4. State
    5. Current Chamber
    6. Make call for Sponsored Legislation
    8. All term history
    9. Website URL
    
    
    */

    console.log(data);
  }
);
