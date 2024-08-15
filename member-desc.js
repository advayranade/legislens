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
      if (data["member"].terms[term].endYear) {
        var endYearVariable = data["member"].terms[term].endYear;
      } else {
        var endYearVariable = "Present";
      }
      let termHTML =
        "<div class='card my-2' style='width:75%'>\
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

    $("#memberName").append(memberName);
    $("#memberInfoWrapper").append(memberInfoHtml);
    $("#memberImg").append(memberImgTag);
  }
);
