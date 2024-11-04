import { GoogleGenerativeAI } from "@google/generative-ai";
import { bioguideIdByName } from "/legislens/bioGuideIds.js";

let API_KEY = apiKeys.google;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

var billData;
// BioGuideIDs for all members of congress

// Latest bills call and attachement of event listeners
$.ajax({
  type: "GET",
  url: "https://api.congress.gov/v3/bill?api_key=" + apiKeys.congress,
  beforeSend: function () {
    $("#column-1").html(
      "<div class='spinner-border m-3' id='bills-spinner' role='status'>\
  <span class='visually-hidden'>Loading...</span>\
</div>"
    );
  },
  success: function (data) {
    $("#bills-spinner").remove();
    for (let i = 0; i < data["bills"].length; i++) {
      var billSummary;
      let billInfoURL =
        "https://api.congress.gov/v3/bill/" +
        data["bills"][i]["congress"] +
        "/" +
        data["bills"][i]["type"].toLowerCase() +
        "/" +
        data["bills"][i]["number"] +
        "/summaries?api_key=" +
        apiKeys.congress;
      let sponsorURL =
        "https://api.congress.gov/v3/bill/" +
        data["bills"][i]["congress"] +
        "/" +
        data["bills"][i]["type"].toLowerCase() +
        "/" +
        data["bills"][i]["number"] +
        "?api_key=" +
        apiKeys.congress;
      $.get(sponsorURL, (res) => {
        billData = res;
        let sponsorId = res["bill"]["sponsors"][0].bioguideId; 
        let sponsorImgURL =
          "https://api.congress.gov/v3/member/" +
          sponsorId +
          "?api_key=" +
          apiKeys.congress;
        $.get(sponsorImgURL, (r) => {
          var sponsorImg = r["member"]["depiction"].imageUrl;
          $.get(billInfoURL, (resp) => {
            if (resp["summaries"][0]) {
              billSummary = resp["summaries"][0]["text"];
            } else if (resp["summaries"]) {
              billSummary = resp["summaries"]["text"];
            }

            if (billSummary === undefined) {
              billSummary = "<div class='spinner-border mt-1 spinner-border-sm text-secondary' id='bills-spinner' role='status'>\
              <span class='visually-hidden'>Loading...</span>\
            </div>";
            }
            if (data["bills"][i]["latestAction"]["actionDate"]) {
              var actionDate =
                data["bills"][i]["latestAction"]["actionDate"];
            }
            let month = actionDate[5] + actionDate[6];
            if (month[0] == 0) {
              month = month[1];
            }
            let day = actionDate[8] + actionDate[9];
            if (day[0] == 0) {
              day = day[1];
            }
            let year =
              actionDate[0] + actionDate[1] + actionDate[2] + actionDate[3];
            actionDate = month + "/" + day + "/" + year;
            let cardHtml =
              '<div class="card m-3" style="width: auto"> \
              <div class="card-body"><div class=""><div class="d-flex align-items-center">\
                  <a href="/legislens/member-desc.html?id=' +
              r["member"].bioguideId +
              '"><img src="' +
              sponsorImg +
              '" class="sponsor-img" style="object-fit:cover;width: 50px;height: 50px;border-radius: 50%; margin-right: 10px;"></a>\
                  <div>' +
              '<div class="bill-title" style="font-weight: bold;"><h5 class="card-title" style="display:inline;">' +
              data["bills"][i]["title"] +
              '</h5>\
                    </div>\
                          <div class="latest-action"><small class="d-inline-flex mb-3 px-2 py-1 fw-semibold text-warning-emphasis bg-warning-subtle border border-warning-subtle rounded-2">LATEST ACTION (' +
              actionDate +
              "): " +
              data["bills"][i]["latestAction"]["text"] +
              '</small></div></div></div>\
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

            $("#column-1").append(cardHtml);
            $(
              "#" +
                data["bills"][i]["congress"] +
                "-" +
                data["bills"][i]["type"].toLowerCase() +
                "-" +
                data["bills"][i]["number"]
            ).on("click", function (e) {
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
                "?api_key=" +
                apiKeys.congress;
              $.get(apiUrl, function (resp) {
                openBillModal(resp);
              });
            });
          });
        });
      });
    }
    let dataset = [];
    for (let i = 0; i < data["bills"].length; i++) {
      let currentBill = data["bills"][i];
      let currentDataset = {};
      currentDataset["billName"] = currentBill["title"];
      currentDataset["billNumber"] = currentBill["number"];
      currentDataset["congressSession"] = currentBill["congress"];
      currentDataset["summary"] = "<SUMMARIZE THIS BILL>";
      dataset.push(currentDataset);
    }
    let dataset1 = dataset.slice(0, Math.round(dataset.length / 4));
    let dataset2 = dataset.slice(
      Math.round(dataset.length / 4),
      Math.round(dataset.length / 2)
    );
    let dataset3 = dataset.slice(
      Math.round(dataset.length / 2),
      Math.round((dataset.length / 4) * 3)
    );
    let dataset4 = dataset.slice(
      Math.round((dataset.length / 4) * 3),
      dataset.length
    );
    let prompt =
      "\
    Provide a detailed 5-8 sentence paragraph summary for each of the following congressional bills. Return the summaries in a json array\n\n";
    Promise.all([
      model.generateContent(prompt + JSON.stringify(dataset1)),
      model.generateContent(prompt + JSON.stringify(dataset2)),
      model.generateContent(prompt + JSON.stringify(dataset3)),
      model.generateContent(prompt + JSON.stringify(dataset4)),
    ])
      .then(([result1, result2, result3, result4]) => {
        $("#bills-spinner").remove();
        $("#column-1").html("")
        let stringedResponses = [
          result1.response.text(),
          result2.response.text(),
          result3.response.text(),
          result4.response.text(),
        ]; // Convert both responses to text
        let cleanedResponseString1 = stringedResponses[0].replace(
          /```json|```/g,
          ""
        );
        let cleanedResponseString2 = stringedResponses[1].replace(
          /```json|```/g,
          ""
        );
        let cleanedResponseString3 = stringedResponses[2].replace(
          /```json|```/g,
          ""
        );
        let cleanedResponseString4 = stringedResponses[3].replace(
          /```json|```/g,
          ""
        );
        let response1;
        let response2;
        let response3;
        let response4;
        try {
          response1 = JSON.parse(cleanedResponseString1);
        } catch {
          response1 = [];
        }
        try {
          response2 = JSON.parse(cleanedResponseString2);
        } catch {
          response2 = [];
        }
        try {
          response3 = JSON.parse(cleanedResponseString3);
        } catch {
          response3 = [];
        }
        try {
          response4 = JSON.parse(cleanedResponseString4);
        } catch {
          response4 = [];
        }
        let finalResponse = response1
          .concat(response2)
          .concat(response3)
          .concat(response4);
        for (let i = 0; i < data["bills"].length; i++) {
          var billSummary;
          var color1 = "#000000";
          var color2 = "#000000";
          var generatedWithAISign = "";
          let billInfoURL =
            "https://api.congress.gov/v3/bill/" +
            data["bills"][i]["congress"] +
            "/" +
            data["bills"][i]["type"].toLowerCase() +
            "/" +
            data["bills"][i]["number"] +
            "/summaries?api_key=" +
            apiKeys.congress;
          let sponsorURL =
            "https://api.congress.gov/v3/bill/" +
            data["bills"][i]["congress"] +
            "/" +
            data["bills"][i]["type"].toLowerCase() +
            "/" +
            data["bills"][i]["number"] +
            "?api_key=" +
            apiKeys.congress;
          $.get(sponsorURL, (res) => {
            billData = res;
            let sponsorId = res["bill"]["sponsors"][0].bioguideId;
            let sponsorImgURL =
              "https://api.congress.gov/v3/member/" +
              sponsorId +
              "?api_key=" +
              apiKeys.congress;
            $.get(sponsorImgURL, (r) => {
              var sponsorImg = r["member"]["depiction"].imageUrl;
              $.get(billInfoURL, (resp) => {
                if (data["bills"][i]["latestAction"]["actionDate"]) {
                  var actionDate =
                    data["bills"][i]["latestAction"]["actionDate"];
                }
                let month = actionDate[5] + actionDate[6];
                if (month[0] == 0) {
                  month = month[1];
                }
                let day = actionDate[8] + actionDate[9];
                if (day[0] == 0) {
                  day = day[1];
                }
                let year =
                  actionDate[0] + actionDate[1] + actionDate[2] + actionDate[3];
                actionDate = month + "/" + day + "/" + year;
                if (resp["summaries"][0]) {
                  billSummary = resp["summaries"][0]["text"];
                } else if (resp["summaries"]) {
                  billSummary = resp["summaries"]["text"];
                }

                if (billSummary === undefined) {
                  color1 = "#6090FF";
                  color2 = "#FF76A1";
                  for (let bill in finalResponse) {
                    let currentBill = finalResponse[bill];
                    if (
                      currentBill["billNumber"] == data["bills"][i]["number"]
                    ) {
                      billSummary = currentBill["summary"];
                      break;
                    }
                  }
                  if (billSummary == undefined) {
                    generatedWithAISign = "";
                    billSummary = "No Summary Found";
                    color1 = "#000000";
                    color2 = "#000000";
                  } else {
                    generatedWithAISign =
                      '<span class="badge rounded-pill" style="background:linear-gradient(to right, ' +
                      color1 +
                      ", " +
                      color2 +
                      ')"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-stars" viewBox="0 0 16 16">\
  <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.73 1.73 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.73 1.73 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.73 1.73 0 0 0 3.407 2.31zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z"/>\
</svg>Generated with AI</span>';
                  }
                }

                let cardHtml =
                  '<div class="card m-3" style="width: auto"> \
                <div class="card-body"><div class=""><div class="d-flex align-items-center">\
                    <a href="/legislens/member-desc.html?id=' +
                  r["member"].bioguideId +
                  '"><img src="' +
                  sponsorImg +
                  '" class="sponsor-img" style="object-fit:cover;width: 50px;height: 50px;border-radius: 50%; margin-right: 10px;"></a>\
                    <div>' +
                  '<div class="bill-title" style="font-weight: bold;"><h5 class="card-title" style="display:inline;">' +
                  data["bills"][i]["title"] +
                  '</h5>\
                      </div>\
                            <div class="latest-action"><small class="d-inline-flex mb-3 px-2 py-1 fw-semibold text-warning-emphasis bg-warning-subtle border border-warning-subtle rounded-2">LATEST ACTION (' +
                  actionDate +
                  "): " +
                  data["bills"][i]["latestAction"]["text"] +
                  "</small></div></div></div>" +
                  generatedWithAISign +
                  '\
                  <p class="card-text mt-2" style="background: linear-gradient(to right, ' +
                  color1 +
                  ", " +
                  color2 +
                  '); -webkit-background-clip: text; -webkit-text-fill-color: transparent">' +
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

                $("#column-1").append(cardHtml);
                $(
                  "#" +
                    data["bills"][i]["congress"] +
                    "-" +
                    data["bills"][i]["type"].toLowerCase() +
                    "-" +
                    data["bills"][i]["number"]
                ).on("click", function (e) {
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
                    "?api_key=" +
                    apiKeys.congress;
                  $.get(apiUrl, function (resp) {
                    openBillModal(resp);
                  });
                });
                $("#bills-spinner").remove();
              });
            });
          });
        }
      })
      .catch((error) => {
        $("#bills-spinner").remove();
        $("#column-1").html("")
        for (let i = 0; i < data["bills"].length; i++) {
          var billSummary;
          let billInfoURL =
            "https://api.congress.gov/v3/bill/" +
            data["bills"][i]["congress"] +
            "/" +
            data["bills"][i]["type"].toLowerCase() +
            "/" +
            data["bills"][i]["number"] +
            "/summaries?api_key=" +
            apiKeys.congress;
          let sponsorURL =
            "https://api.congress.gov/v3/bill/" +
            data["bills"][i]["congress"] +
            "/" +
            data["bills"][i]["type"].toLowerCase() +
            "/" +
            data["bills"][i]["number"] +
            "?api_key=" +
            apiKeys.congress;
          $.get(sponsorURL, (res) => {
            billData = res;
            let sponsorId = res["bill"]["sponsors"][0].bioguideId;
            let sponsorImgURL =
              "https://api.congress.gov/v3/member/" +
              sponsorId +
              "?api_key=" +
              apiKeys.congress;
            $.get(sponsorImgURL, (r) => {
              var sponsorImg = r["member"]["depiction"].imageUrl;
              $.get(billInfoURL, (resp) => {
                if (resp["summaries"][0]) {
                  billSummary = resp["summaries"][0]["text"];
                } else if (resp["summaries"]) {
                  billSummary = resp["summaries"]["text"];
                }

                if (billSummary === undefined) {
                  billSummary = "No summary available. ";
                }
                if (data["bills"][i]["latestAction"]["actionDate"]) {
                  var actionDate =
                    data["bills"][i]["latestAction"]["actionDate"];
                }
                let month = actionDate[5] + actionDate[6];
                if (month[0] == 0) {
                  month = month[1];
                }
                let day = actionDate[8] + actionDate[9];
                if (day[0] == 0) {
                  day = day[1];
                }
                let year =
                  actionDate[0] + actionDate[1] + actionDate[2] + actionDate[3];
                actionDate = month + "/" + day + "/" + year;
                let cardHtml =
                  '<div class="card m-3" style="width: auto"> \
                  <div class="card-body"><div class=""><div class="d-flex align-items-center">\
                      <a href="/legislens/member-desc.html?id=' +
                  r["member"].bioguideId +
                  '"><img src="' +
                  sponsorImg +
                  '" class="sponsor-img" style="object-fit:cover;width: 50px;height: 50px;border-radius: 50%; margin-right: 10px;"></a>\
                      <div>' +
                  '<div class="bill-title" style="font-weight: bold;"><h5 class="card-title" style="display:inline;">' +
                  data["bills"][i]["title"] +
                  '</h5>\
                        </div>\
                              <div class="latest-action"><small class="d-inline-flex mb-3 px-2 py-1 fw-semibold text-warning-emphasis bg-warning-subtle border border-warning-subtle rounded-2">LATEST ACTION (' +
                  actionDate +
                  "): " +
                  data["bills"][i]["latestAction"]["text"] +
                  '</small></div></div></div>\
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

                $("#column-1").append(cardHtml);
                $(
                  "#" +
                    data["bills"][i]["congress"] +
                    "-" +
                    data["bills"][i]["type"].toLowerCase() +
                    "-" +
                    data["bills"][i]["number"]
                ).on("click", function (e) {
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
                    "?api_key=" +
                    apiKeys.congress;
                  $.get(apiUrl, function (resp) {
                    openBillModal(resp);
                  });
                });
              });
            });
          });
        }
      });
  },
  error: function (err) {
    console.error("ERROR: Please try again later. ", err.statusCode());
  },
});

// Open modal on click of more info button
function openBillModal(data) {
  var coSponsorData;
  var modalTest = "";
  var coSponsorHTML = "<ul>";
  var policyArea = "No Policy Area Found";
  if (data["bill"].hasOwnProperty("policyArea")) {
    if (data["bill"]["policyArea"].hasOwnProperty("name")) {
      policyArea = data["bill"]["policyArea"]["name"];
      if (!policyArea) {
        policyArea = "No Policy Area Found";
      }
    }
  }
  var introducedDate = "No Introduced Date Found";
  if (data["bill"].hasOwnProperty("introducedDate")) {
    introducedDate = data["bill"]["introducedDate"];
    if (!introducedDate) {
      introducedDate = "No Introduced Date Found";
    } else {
      let month = introducedDate[5] + introducedDate[6];
      if (month[0] == 0) {
        month = month[1];
      }
      let day = introducedDate[8] + introducedDate[9];
      if (day[0] == 0) {
        day = day[1];
      }
      let year =
        introducedDate[0] +
        introducedDate[1] +
        introducedDate[2] +
        introducedDate[3];
      introducedDate = month + "/" + day + "/" + year;
    }
  }
  if (data["bill"]["cosponsors"]) {
    var coSponsorURL =
      data["bill"]["cosponsors"].url +
      "&api_key=O4qhb9hRP8dwqw9yr7TPkAUeeJyXGb2Y37ntvfzA";
    $.get(coSponsorURL, (response) => {
      for (let index = 0; index < response["cosponsors"].length; index++) {
        let coSponsorName = response["cosponsors"][index].fullName;
        let createdHTML = "<li>" + coSponsorName + "</li>";
        coSponsorHTML = coSponsorHTML + createdHTML;
      }

      if (data["bill"]["policyArea"]) {
        modalTest =
          '<div class="modal" role="dialog" id="billModal">\
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
          introducedDate +
          '</dd>\
      <dt class="col-sm-4">Policy Area</dt>\
      <dd class="col-sm-7">' +
          data["bill"]["policyArea"].name +
          '</dd>\
          <dt class="col-sm-4">More Info</dt>\
      <dd class="col-sm-7">\
      <a href="https://congress.gov/bill/' +
          data["bill"].congress +
          "/" +
          data["bill"].type.toLowerCase() +
          "/" +
          data["bill"].number +
          ' " target="_blank">View</a>\
      </dd>\
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
          introducedDate +
          '</dd>\
          <dt class="col-sm-4">More Info</dt>\
      <dd class="col-sm-7">\
      <a href="https://congress.gov/bill/' +
          data["bill"].congress +
          "/" +
          data["bill"].type.toLowerCase() +
          "/" +
          data["bill"].number +
          ' " target="_blank">View</a>\
      </dd>\
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
      introducedDate +
      '</dd>\
      <dt class="col-sm-4">Policy Area</dt>\
      <dd class="col-sm-7">' +
      policyArea +
      '</dd>\
      <dt class="col-sm-4">More Info</dt>\
      <dd class="col-sm-7">\
      <a href="https://congress.gov/bill/' +
      data["bill"].congress +
      "/" +
      data["bill"].type.toLowerCase() +
      "/" +
      data["bill"].number +
      ' " target="_blank">View</a>\
      </dd>\
      <dt class="col-sm-4">Co-Sponsors</dt>\
      <dd class="col-sm-7">No Cosponsors Found</dd>\
    </dl>\
    <div class="collapse" id="coSponsorsList"><div class="card card-body" style="text-decoration:underline;">NO COSPONSORS' +
      '</ul></div></div></div>\
          <div class="modal-footer">\
            <button type="button" class="btn btn-secondary" data-dismiss="modal" id="modal-close">Close</button>\
          </div>\
        </div>\
      </div>\
    </div>';
    $("#modal-wrapper").text("");
    $("#modal-wrapper").append(modalTest);
    $("#modal-close").on("click", function () {
      $("#myModal").hide();
    });
    $("#myModal").show();
    $("#myModal").focus();
  }
}


// Find your member functionality
$("#member-submit").on("click", function (e) {
  e.preventDefault();
  $("#memberWrapper").text("");
  let findMemberURL =
    "https://www.googleapis.com/civicinfo/v2/representatives?address=" +
    $("#zipCode").val() +
    "&key=" +
    apiKeys.google +
    "&levels=country&roles=legislatorLowerBody&roles=legislatorUpperBody";
  $.ajax({
    type: "GET",
    url: findMemberURL,
    beforeSend: function () {
      let loadingHTML =
        "<div class='spinner-border m-3' role='status'>\
  <span class='visually-hidden'>Loading...</span>\
</div>";
      $("#memberWrapper").append(loadingHTML);
    },
    success: function (data) {
      $("#memberWrapper").html("");
      if (data.officials.length === 0) {
        var memberCardHTML =
          "<h5 class='d-inline-flex mt-3 px-2 py-1 text-danger-emphasis bg-danger-subtle border border-danger-subtle rounded-2'>This state or district is invalid. Please try again.</h5>";
        $("#memberWrapper").append(memberCardHTML);
      }
      var officeIndex = 0;
      for (let i = 0; i < data.officials.length; i++) {
        let civicAPIMemberNameArray = data["officials"][i]["name"].split(" ");
        let civicAPIMemberName =
          civicAPIMemberNameArray[0] +
          " " +
          civicAPIMemberNameArray[civicAPIMemberNameArray.length - 1];
        let bioguideID = bioguideIdByName[civicAPIMemberName];
        memberCardHTML = "";
        if (0 == 0) {
          let districtIdSplit = data["offices"][1]
            ? data["offices"][1].divisionId.split(":")
            : data["offices"][0].divisionId.split(":");
          let districtNum = districtIdSplit[districtIdSplit.length - 1];
          let chamber = "";
          if (data["offices"][0]["officialIndices"].includes(i)) {
            chamber = data["offices"][0].name;
          }

          if (
            data["offices"][1] &&
            data["offices"][1]["officialIndices"].includes(i)
          ) {
            chamber = data["offices"][1].name;
          }

          if (chamber.toLowerCase() == "u.s. representative") {
            memberCardHTML =
              "<div class='card m-3' style='width: 20rem;' class='rep'" +
              ">" +
              "<div class='card-body'>\
        <h5 class='card-title'>" +
              data["officials"][i].name +
              "</h5>\
        <p class='card-subtitle'><b>Party:</b> " +
              data["officials"][i].party +
              "<br/><b>State:</b> " +
              data["normalizedInput"].state +
              "<br/><b>Office of </b>" +
              chamber +
              "<br/><b>District #: </b>" +
              districtNum +
              "</p>\
        <a  href='/member-desc.html?id=" +
              bioguideID +
              "' class='btn btn-secondary btn-sm mt-2'>Learn more</a>\
      </div>\
    </div>";
          } else {
            memberCardHTML =
              "<div class='card m-3' style='width: 20rem;' class='rep'" +
              ">" +
              "<div class='card-body'>\
      <h5 class='card-title'>" +
              data["officials"][i].name +
              "</h5>\
      <p class='card-subtitle'><b>Party:</b> " +
              data["officials"][i].party +
              "<br/><b>State:</b> " +
              data["normalizedInput"].state +
              "<br/><b>Office of </b>" +
              chamber +
              "<br/>" +
              "</p>\
      <a href='/member-desc.html?id=" +
              bioguideID +
              "' class='btn btn-secondary btn-sm mt-2'>Learn more</a>\
    </div>\
    </div>";
          }
        }
        $("#memberWrapper").append(memberCardHTML);
        if (officeIndex !== 1) {
          officeIndex++;
        }
      }
    },
    error: function (err) {
      $("#memberWrapper").html("");
      $("#memberWrapper").html(
        "<h5 class='d-inline-flex mt-3 px-2 py-1 text-danger-emphasis bg-danger-subtle border border-danger-subtle rounded-2'>This zip code/address is invalid. Please try again.</h5>"
      );
      console.error(err.statusText, err);
    },
  });
});

// NewsAPI call
$.ajax({
  type: "GET",
  url: "https://newsapi.org/v2/everything?q=congress&apiKey=" + apiKeys.newsApi,
  beforeSend: function () {
    let loadingHTML =
      "<div class='spinner-border m-3' role='status'>\
<span class='visually-hidden'>Loading...</span>\
</div>";
    $("#carouselInner").append(loadingHTML);
  },
  success: function (response) {
    $("#carouselInner").html("");
    let newsUrl;

    for (let i = 0; i < 6; i++) {
      if (response["articles"][i].title === "[Removed]") {
        continue;
      }
      // var index = i;
      if (i === 0) {
        var carouselItemClassCheck = "carousel-item active";
      } else {
        var carouselItemClassCheck = "carousel-item";
      }
      if (response["articles"][i].urlToImage) {
        newsUrl = response["articles"][i].urlToImage;
      } else {
        newsUrl =
          "https://www.shutterstock.com/image-vector/newspaper-line-vector-illustration-isolated-600nw-1928795186.jpg";
        // break;
      }
      let color = "#F7F5F5";
      let carouselItem =
        "<div class='" +
        carouselItemClassCheck +
        "'>\
          <img style='filter: grayscale(100%) blur(1px);' src='" +
        newsUrl +
        "' class='d-block w-100' alt='image'>\
        <div class='carousel-caption d-none d-md-block'>\
          <a target='_blank' style='color:" +
        color +
        "; text-decoration:none; text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5)' href='" +
        response["articles"][i].url +
        "'><h5 st >" +
        response["articles"][i].title +
        "</h5></a>\
          <p class='news-desc limited-text'>" +
        response["articles"][i].description +
        "</p>\
          </div>\
        </div>";

      $("#carouselInner").append(carouselItem);
    }
  },
});

$(".carousel").dataInterval = 2000;
