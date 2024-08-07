var billData;
$.get(
  "https://api.congress.gov/v3/bill?api_key=O4qhb9hRP8dwqw9yr7TPkAUeeJyXGb2Y37ntvfzA",
  (data) => {
    console.log(data);
    for (let i = 0; i < data["bills"].length; i++) {
      //   let billListCard = document.createElement("div");
      var billSummary;
      let billInfoURL =
        "https://api.congress.gov/v3/bill/" +
        data["bills"][i]["congress"] +
        "/" +
        data["bills"][i]["type"].toLowerCase() +
        "/" +
        data["bills"][i]["number"] +
        "/summaries?api_key=O4qhb9hRP8dwqw9yr7TPkAUeeJyXGb2Y37ntvfzA";
      let sponsorURL =
        "https://api.congress.gov/v3/bill/" +
        data["bills"][i]["congress"] +
        "/" +
        data["bills"][i]["type"].toLowerCase() +
        "/" +
        data["bills"][i]["number"] +
        "?api_key=O4qhb9hRP8dwqw9yr7TPkAUeeJyXGb2Y37ntvfzA";
      $.get(sponsorURL, (res) => {
        billData = res;
        console.log("bill data variable", billData);
        console.log("inside sponsor URL get req");
        console.log(res);
        let sponsorId = res["bill"]["sponsors"][0].bioguideId;
        console.log("sponsor ID: ", sponsorId);
        let sponsorImgURL =
          "https://api.congress.gov/v3/member/" +
          sponsorId +
          "?api_key=O4qhb9hRP8dwqw9yr7TPkAUeeJyXGb2Y37ntvfzA";
        $.get(sponsorImgURL, (r) => {
          var sponsorImg = r["member"]["depiction"].imageUrl;
          $.get(billInfoURL, (resp) => {
            console.log(resp["summaries"]);
            if (resp["summaries"][0]) {
              billSummary = resp["summaries"][0]["text"];
            } else if (resp["summaries"]) {
              billSummary = resp["summaries"]["text"];
            }
            console.log("Bill summary: " + billSummary);
            console.log("Bill summary available here: " + billSummary);

            if (billSummary === undefined) {
              billSummary = "No summary available. ";
            }
            console.log("billData var", billData);
            let cardHtml =
              '<div class="card m-3" style="width: auto"> \
            <div class="card-body"><div class=""><div class="d-flex align-items-center">\
                <img src="' +
              sponsorImg +
              '" alt="Profile Picture" class="sponsor-img" style="object-fit:cover;width: 50px;height: 50px;border-radius: 50%; margin-right: 10px;">\
                <div>' +
              '<div class="bill-title" style="font-weight: bold;"><h5 class="card-title" style="display:inline;">' +
              data["bills"][i]["title"] +
              '</h5>\
                  </div>\
                        <div class="latest-action"><span class="d-inline-flex mb-3 px-2 py-1 fw-semibold text-warning-emphasis bg-warning-subtle border border-warning-subtle rounded-2">LATEST ACTION (' +
              data["bills"][i]["latestAction"]["actionDate"] +
              "): " +
              data["bills"][i]["latestAction"]["text"] +
              '</span></div></div></div>\
              <p class="card-text mt-2">' +
              billSummary +
              '</p> \
              <span class="badge rounded-pill text-bg-secondary">' +
              data["bills"][i]["originChamberCode"] +
              data["bills"][i]["number"] +
              '</span> \
              <a id="' +
              data["bills"][i]["congress"] +
              "-" +
              data["bills"][i]["type"].toLowerCase() +
              "-" +
              data["bills"][i]["number"] +
              '" class="btn btn-primary btn-sm ms-3">More info</a>\
            </div> \
          </div>';
            // (' +
            //   data["bills"][i]["congress"] +
            //   ",0" +
            //   "," +
            //   data["bills"][i]["number"] +
            //   ')"
            console.log("here");

            $("#column-1").append(cardHtml);
            console.log(
              "#" +
                data["bills"][i]["congress"] +
                "-" +
                data["bills"][i]["type"].toLowerCase() +
                "-" +
                data["bills"][i]["number"]
            );
            $(
              "#" +
                data["bills"][i]["congress"] +
                "-" +
                data["bills"][i]["type"].toLowerCase() +
                "-" +
                data["bills"][i]["number"]
            ).on("click", function (e) {
              console.log();
              let params = e.target.id.split("-");
              let congressNum = params[0];
              let billType = params[1];
              let billNum = params[2];
              let apiUrl =
                "https://api.congress.gov/v3/bill/" +
                congressNum +
                "/" +
                billType +
                "/" +
                billNum +
                "?api_key=O4qhb9hRP8dwqw9yr7TPkAUeeJyXGb2Y37ntvfzA";
              $.get(apiUrl, function (resp) {
                openBillModal(resp);
              });
            });
          });
        });
      });

      //   billListItem.innerHTML = data["bills"][i]["title"];
      //   $("#top-bills").append(billListCard);
    }
  }
);

{
  /* <div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">BILL TITLE</h5>
    <h6 class="card-subtitle mb-2 text-muted">LATEST ACTION (DATE): ACTION DESC</h6>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="card-link">Card link</a>
    <a href="#" class="card-link">Another link</a>
  </div>
</div> */
}

// {
//     "congress": 118,
//     "latestAction": {
//         "actionDate": "2024-08-01",
//         "text": "Placed on Senate Legislative Calendar under General Orders. Calendar No. 482."
//     },
//     "number": "3849",
//     "originChamber": "Senate",
//     "originChamberCode": "S",
//     "title": "Promoting United States Leadership in Standards Act of 2024",
//     "type": "S",
//     "updateDate": "2024-08-02",
//     "updateDateIncludingText": "2024-08-02T11:03:16Z",
//     "url": "https://api.congress.gov/v3/bill/118/s/3849?format=json"
// },

function openBillModal(data) {
  console.log("data inside openBillModal", data);
  var coSponsorData;
  var modalTest = "";
  var coSponsorHTML = "<ul>";
  if (data["bill"]["cosponsors"]) {
    var coSponsorURL =
      data["bill"]["cosponsors"].url +
      "&api_key=O4qhb9hRP8dwqw9yr7TPkAUeeJyXGb2Y37ntvfzA";
  } else {
    // var coSponsorURL =
    //   "https://api.congress.gov/v3/bill/" +
    //   data["request"].congress +
    //   "/" +
    //   data["request"].billType +
    //   "/" +
    //   data["request"].billNumber +
    //   "/cosponsors?api_key=O4qhb9hRP8dwqw9yr7TPkAUeeJyXGb2Y37ntvfzA";
    console.error("Error finding co-sponsors. Try again later Err 400");
    alert("Error opening bill. Try again later");
    return;
  }
  $.get(coSponsorURL, (response) => {
    for (let index = 0; index < response["cosponsors"].length; index++) {
      let coSponsorName = response["cosponsors"][index].fullName;
      let createdHTML = "<li>" + coSponsorName + "</li>";
      coSponsorHTML = coSponsorHTML + createdHTML;
    }
    if (data["bill"]["policyArea"]) {
      modalTest =
        '<div class="modal" role="dialog" id="myModal">\
  <div class="modal-dialog" role="document">\
    <div class="modal-content">\
      <div class="modal-header">\
        <h5 class="modal-title">' +
        data["bill"].title +
        '</h5>\
      </div>\
      <div class="modal-body">\
        <dl class="row">\
  <dt class="col-sm-4">Sponsor</dt>\
  <dd class="col-sm-7">' +
        data["bill"]["sponsors"][0].fullName +
        '</dd>\
  <dt class="col-sm-4">Bill #</dt>\
  <dd class="col-sm-7">\
      ' +
        data["bill"].number +
        '\
  </dd>\
  <dt class="col-sm-4">Introduced</dt>\
  <dd class="col-sm-7">' +
        data["bill"].introducedDate +
        '</dd>\
  <dt class="col-sm-4">Policy Area</dt>\
  <dd class="col-sm-7">' +
        data["bill"]["policyArea"].name +
        '</dd>\
  <dt class="col-sm-4">Co-Sponsors</dt>\
  <dd class="col-sm-7"><a data-bs-toggle="collapse" href="#coSponsorsList" role="button" aria-expanded="false" aria-controls="coSponsorsList">View</a></dd>\
</dl>\
<div class="collapse" id="coSponsorsList"><div class="card card-body">' +
        coSponsorHTML +
        '</ul></div></div></div>\
      <div class="modal-footer">\
        <button type="button" class="btn btn-secondary" data-dismiss="modal" id="modal-close">Close</button>\
      </div>\
    </div>\
  </div>\
</div>';
    } else {
      modalTest =
        '<div class="modal" role="dialog" id="myModal">\
  <div class="modal-dialog" role="document">\
    <div class="modal-content">\
      <div class="modal-header">\
        <h5 class="modal-title">' +
        data["bill"].title +
        '</h5>\
      </div>\
      <div class="modal-body">\
        <dl class="row">\
  <dt class="col-sm-4">Sponsor</dt>\
  <dd class="col-sm-7">' +
        data["bill"]["sponsors"][0].fullName +
        '</dd>\
  <dt class="col-sm-4">Bill #</dt>\
  <dd class="col-sm-7">\
      ' +
        data["bill"].number +
        '\
  </dd>\
  <dt class="col-sm-4">Introduced</dt>\
  <dd class="col-sm-7">' +
        data["bill"].introducedDate +
        '</dd>\
  <dt class="col-sm-4">Co-Sponsors</dt>\
  <dd class="col-sm-7"><a data-bs-toggle="collapse" href="#coSponsorsList" role="button" aria-expanded="false" aria-controls="coSponsorsList">View</a></dd>\
</dl>\
<div class="collapse" id="coSponsorsList"><div class="card card-body">' +
        coSponsorHTML +
        '</ul></div></div></div>\
      <div class="modal-footer">\
        <button type="button" class="btn btn-secondary" data-dismiss="modal" id="modal-close">Close</button>\
      </div>\
    </div>\
  </div>\
</div>';
    }

    $("#modal-wrapper").text("");
    $("#modal-wrapper").append(modalTest);
    $("#modal-close").on("click", function () {
      $("#myModal").hide();
    });
    $("#myModal").show();
    $("#myModal").focus();
  });
}

// "openModal(' +
//           data["bills"][i]["congress"].toString() +
//           ", " +
//           data["bills"][i]["type"].toString() +
//           ", " +
//           data["bills"][i]["number"].toString() +
//           ')"

$("#member-submit").on("click", function (e) {
  // https://api.congress.gov/v3/member/MI?api_key=[INSERT_KEY]
  e.preventDefault();
  if ($("#stateCode").val() === "" || $("#districtCode").val() === "") {
    var noValueCheck = prompt(
      "There is no value detected in the state code and/or the district number. Due to an incomplete form, the results may be inaccurate. Please enter 'yes' to continue the request. Enter 'no' to block this. "
    );
  }
  if (noValueCheck || noValueCheck === undefined) {
    $("#memberWrapper").text("");
    let findMemberURL =
      "https://api.congress.gov/v3/member/" +
      $("#stateCode").val() +
      "/" +
      $("#districtCode").val() +
      "?api_key=O4qhb9hRP8dwqw9yr7TPkAUeeJyXGb2Y37ntvfzA";
    console.log(findMemberURL);
    // fetch(findMemberURL, (data) => {
    //   console.log(data);
    // })
    console.log("here");
    $.get(findMemberURL, (data) => {
      console.log(data);

      // console.log(dummyData);
      if (data["members"].length === 0) {
        var memberCardHTML =
          "<h5 class='mt-3'>This state or district is invalid. Please try again.</h5>";
        $("#memberWrapper").append(memberCardHTML);
      }

      for (let i = 0; i < data["members"].length; i++) {
        // console.log("Member: " + dummyData["members"][i]);
        console.log(
          "End Year:",
          data["members"][i]["terms"]["item"][0].endYear
        );
        memberCardHTML = "";
        if (data["members"][i]["terms"]["item"][0].endYear === undefined) {
          if (data["members"][i].district) {
            memberCardHTML =
              "<div class='card m-3' style='width: 20rem;' id=" +
              data["members"][i].bioguideId +
              ">\
  <img src='" +
              data["members"][i].depiction.imageUrl +
              "' class='card-img-top'>\
  <div class='card-body'>\
    <h5 class='card-title'>" +
              data["members"][i].name +
              "</h5>\
    <p class='card-subtitle'><b>Party:</b> " +
              data["members"][i].partyName +
              "<br/><b>State:</b> " +
              data["members"][i].state +
              "<br/><b>Term Start:</b> " +
              data["members"][i]["terms"]["item"][0].startYear +
              "<br/><b>Chamber: </b>" +
              data["members"][i]["terms"]["item"][0].chamber +
              "<br/><b>District #: </b>" +
              data["members"][i].district +
              "</p>\
    <a href='#' class='btn btn-secondary btn-sm mt-2'>Learn more</a>\
  </div>\
</div>";
          } else {
            emberCardHTML =
              "<div class='card m-3' style='width: 20rem;' id=" +
              data["members"][i].bioguideId +
              ">\
  <img src='" +
              data["members"][i].depiction.imageUrl +
              "' class='card-img-top'>\
  <div class='card-body'>\
    <h5 class='card-title'>" +
              data["members"][i].name +
              "</h5>\
    <p class='card-subtitle'><b>Party:</b> " +
              data["members"][i].partyName +
              "<br/><b>State:</b> " +
              data["members"][i].state +
              "<br/><b>Term Start:</b> " +
              data["members"][i]["terms"]["item"][0].startYear +
              "<br/><b>Chamber: </b>" +
              data["members"][i]["terms"]["item"][0].chamber +
              "<br/></p>\
    <a href='#' class='btn btn-secondary btn-sm mt-2'>Learn more</a>\
  </div>\
</div>";
          }
        }

        //
        $("#memberWrapper").append(memberCardHTML);
      }
    });
  } else {
    return;
  }
  // $.ajax({
  //   type: "GET",
  //   url: findMemberURL,
  // })
  //   .done(function (data) {
  //     console.log(data);
  //   })
  //   .fail(function (jqXHR, textStatus, errorThrown) {
  //     alert("AJAX call failed: " + textStatus + ", " + errorThrown);
  //   });
  // $.get(findMemberURL, (data, status) => {
  //   console.log("here ");
  //   console.log(data);
  // });
});
