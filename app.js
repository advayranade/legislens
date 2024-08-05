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
        let test =
          data["bills"][i]["congress"] +
          "," +
          data["bills"][i]["number"] +
          "," +
          data["bills"][i]["type"];
        console.log(test);
        let cardHtml =
          '<div class="card m-3" style="width: auto"> \
        <div class="card-body"> \
          <h5 class="card-title">' +
          data["bills"][i]["title"] +
          '</h5> \
          <h6 class="card-subtitle mb-2 text-muted">LATEST ACTION (' +
          data["bills"][i]["latestAction"]["actionDate"] +
          "): " +
          data["bills"][i]["latestAction"]["text"] +
          '</h6> \
          <p class="card-text">' +
          billSummary +
          '</p> \
          <a href="#" class="card-link">' +
          data["bills"][i]["originChamberCode"] +
          data["bills"][i]["number"] +
          '</a> \
          <a onclick="openModal()" class="btn btn-primary btn-sm ms-3">More info</a>\
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

function openModal(t, e) {
  // console.log(congressNumber, billType, billNumber);
  console.log(e);
  const modalTest =
    '<div class="modal" role="dialog" id="myModal">\
  <div class="modal-dialog" role="document">\
    <div class="modal-content">\
      <div class="modal-header">\
        <h5 class="modal-title">Modal title</h5>\
      </div>\
      <div class="modal-body">\
        <p>Modal body text goes here.</p>\
      </div>\
      <div class="modal-footer">\
        <button type="button" class="btn btn-secondary" data-dismiss="modal" id="modal-close">Close</button>\
      </div>\
    </div>\
  </div>\
</div>';
  $("#modal-wrapper").append(modalTest);
  $("#modal-close").on("click", function () {
    $("#myModal").hide();
  });
  $("#myModal").show();
  $("#myModal").focus();
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

    for (let i = 0; i < data["members"].length; i++) {
      // console.log("Member: " + dummyData["members"][i]);
      console.log("End Year:", data["members"][i]["terms"]["item"][0].endYear);
      let memberCardHTML = "";
      if (data["members"][i]["terms"]["item"][0].endYear === undefined) {
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
          "</p>\
    <a href='#' class='btn btn-secondary btn-sm mt-2'>Learn more</a>\
  </div>\
</div>";
      }

      //
      $("#memberWrapper").append(memberCardHTML);
    }
  });
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
