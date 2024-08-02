

$.get(
  "https://api.congress.gov/v3/bill?api_key=O4qhb9hRP8dwqw9yr7TPkAUeeJyXGb2Y37ntvfzA",
  (data) => {
    // if (status == 200) {
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
          <a onclick="openModal(0,0,0)" class="card-link">More Info</a> \
        </div> \
      </div>';

        if (i % 4 === 0) {
          console.log(i);
          $("#column-4").append(cardHtml);
        } else if (i % 3 === 0) {
          $("#column-3").append(cardHtml);
        } else if (i % 2 === 0) {
          $("#column-2").append(cardHtml);
        } else {
          $("#column-1").append(cardHtml);
        }
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

function openModal(congressNumber, billType, billNumber) {
  //   debugger;
  console.log(congressNumber, billType, billNumber);
  const modalTest =
    '<div class="modal" tabindex="-1">\
    <div class="modal-dialog">\
      <div class="modal-content">\
        <div class="modal-header">\
          <h5 class="modal-title">Modal title</h5>\
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>\
        </div>\
        <div class="modal-body">\
          <p>Modal body text goes here.</p>\
        </div>\
        <div class="modal-footer">\
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>\
          <button type="button" class="btn btn-primary">Save changes</button>\
        </div>\
      </div>\
    </div>\
  </div>';
  $("#modal-wrapper").append(modalTest);
}
// "openModal(' +
//           data["bills"][i]["congress"].toString() +
//           ", " +
//           data["bills"][i]["type"].toString() +
//           ", " +
//           data["bills"][i]["number"].toString() +
//           ')"
