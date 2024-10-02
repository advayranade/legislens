var billData;
$.get(
  "https://api.congress.gov/v3/bill?api_key=O4qhb9hRP8dwqw9yr7TPkAUeeJyXGb2Y37ntvfzA",
  (data) => {
    for (let i = 0; i < data["bills"].length; i++) {
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
        let sponsorId = res["bill"]["sponsors"][0].bioguideId;
        let sponsorImgURL =
          "https://api.congress.gov/v3/member/" +
          sponsorId +
          "?api_key=O4qhb9hRP8dwqw9yr7TPkAUeeJyXGb2Y37ntvfzA";
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
              var actionDate = data["bills"][i]["latestAction"]["actionDate"];
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
                <a href="/member-desc.html?id=' +
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
                "?api_key=O4qhb9hRP8dwqw9yr7TPkAUeeJyXGb2Y37ntvfzA";
              $.get(apiUrl, function (resp) {
                openBillModal(resp);
              });
            });
          });
        });
      });
    }
  }
);

function openBillModal(data) {
  var coSponsorData;
  var modalTest = "";
  var coSponsorHTML = "<ul>";
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
      let introducedDate = data["bill"]["introducedDate"];
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
      <dd class="col-sm-7">NO COSPONSORS</dd>\
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

$("#member-submit").on("click", function (e) {
  e.preventDefault();
  $("#memberWrapper").text("");
  let findMemberURL =
    "https://www.googleapis.com/civicinfo/v2/representatives?address=" +
    $("#zipCode").val() +
    "&key=AIzaSyDM7m2BD0BPO3a1yd48NKZbqXZrIqaYssg&levels=country&roles=legislatorLowerBody&roles=legislatorUpperBody";
  $.get(findMemberURL, (data) => {
    console.log(data);
    if (data.officials.length === 0) {
      var memberCardHTML =
        "<h5 class='mt-3'>This state or district is invalid. Please try again.</h5>";
      $("#memberWrapper").append(memberCardHTML);
    }
    var officeIndex = 0;
    for (let i = 0; i < data.officials.length; i++) {
      debugger;
      console.log(i);
      memberCardHTML = "";
      if (0 == 0) {
        let districtIdSplit = data["offices"][1].divisionId.split(":");
        let districtNum = districtIdSplit[districtIdSplit.length - 1];
        let chamber = "";
        if (data["offices"][0]["officialIndices"].includes(i)) {
          debugger;
          chamber = data["offices"][0].name;
        }

        if (
          data["offices"][1] &&
          data["offices"][1]["officialIndices"].includes(i)
        ) {
          debugger;
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
            "<br/><b>Chamber: </b>" +
            chamber +
            "<br/><b>District #: </b>" +
            districtNum +
            "</p>\
    <a href='#' class='btn btn-secondary btn-sm mt-2'>Learn more</a>\
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
            "<br/><b>Chamber: </b>" +
            chamber +
            "<br/>" +
            "</p>\
  <a href='#' class='btn btn-secondary btn-sm mt-2'>Learn more</a>\
</div>\
</div>";
        }
      }
      $("#memberWrapper").append(memberCardHTML);
      if (officeIndex !== 1) {
        officeIndex++;
      }
    }
  });
});

$.get(
  "https://newsapi.org/v2/everything?q=congress&apiKey=a089e6f8b3f84c50844552105d6fe419",
  (response) => {
    let newsUrl;
    for (let i = 0; i < 6; i++) {
      if (i === 0) {
        var carouselItemClassCheck = "carousel-item active";
      } else {
        var carouselItemClassCheck = "carousel-item";
      }

      // https://www.shutterstock.com/image-vector/newspaper-line-vector-illustration-isolated-600nw-1928795186.jpg

      if (response["articles"][i].urlToImage) {
        newsUrl = response["articles"][i].urlToImage;
      } else {
        newsUrl =
          "https://www.shutterstock.com/image-vector/newspaper-line-vector-illustration-isolated-600nw-1928795186.jpg";
      }

      let carouselItem =
        "<div class='" +
        carouselItemClassCheck +
        "'>\
        <img style='filter: grayscale(100%) blur(10px);' src='" +
        newsUrl +
        "' class='d-block w-100' alt='image'>\
      <div class='carousel-caption d-none d-md-block'>\
        <a target='_blank' style='color:#FFD700; text-decoration:none;' href='" +
        response["articles"][i].url +
        "'><h5 st >" +
        response["articles"][i].title +
        "</h5></a>\
        <p style='color:#FFD700;'>" +
        response["articles"][i].description +
        "</p>\
        </div>\
      </div>";
      //       let carouselItem =
      //         "<div class='card'>\
      //   <img src='" +
      //         newsUrl +
      //         "' class='card-img-top' alt='news-image'>\
      //   <div class='carousel-caption d-none d-md-block card-body'>\
      //     <h5 class='card-title'>" +
      //         response["articles"][i].title +
      //         "</h5>\
      //     <p class='card-text'>" +
      //         response["articles"][i].description +
      //         "</p>\
      //     <a href='" +
      //         newsUrl +
      //         "' target='_blank' >Learn more</a>\
      //   </div>\
      // </div>";

      $("#carouselInner").append(carouselItem);
    }
  }
);
$(".carousel").dataInterval = 2000;
