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
              data["bills"][i]["latestAction"]["actionDate"] +
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
  console.log(data)
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
          <dt class="col-sm-4">More Info</dt>\
      <dd class="col-sm-7">\
      <a href="https://congress.gov/bill/' +
          data["bill"].congress +
          '/' +
          data["bill"].type.toLowerCase() +
          '/' +
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
          data["bill"].introducedDate +
          '</dd>\
          <dt class="col-sm-4">More Info</dt>\
      <dd class="col-sm-7">\
      <a href="https://congress.gov/bill/' +
          data["bill"].congress +
          '/' +
          data["bill"].type.toLowerCase() +
          '/' +
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
      data["bill"].introducedDate +
      '</dd>\
      <dt class="col-sm-4">Policy Area</dt>\
      <dd class="col-sm-7">' +
      data["bill"]["policyArea"].name +
      '</dd>\
      <dt class="col-sm-4">More Info</dt>\
      <dd class="col-sm-7">\
      <a href="https://congress.gov/bill/' +
      data["bill"].congress +
      '/' +
      data["bill"].type.toLowerCase() +
      '/' +
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
  if ($("#stateCode").val() === "" || $("#districtCode").val() === "") {
    var noValueCheck = confirm(
      "There is no value detected in the state code and/or the district number. Due to an incomplete form, the results may be inaccurate. "
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
    $.get(findMemberURL, (data) => {
      if (data["members"].length === 0) {
        var memberCardHTML =
          "<h5 class='mt-3'>This state or district is invalid. Please try again.</h5>";
        $("#memberWrapper").append(memberCardHTML);
      }

      for (let i = 0; i < data["members"].length; i++) {
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
              "<br/></p>\
    <a href='#' class='btn btn-secondary btn-sm mt-2'>Learn more</a>\
  </div>\
</div>";
          }
        }
        $("#memberWrapper").append(memberCardHTML);
      }
    });
  } else {
    return;
  }
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
          <a target='_blank' style='color:#A0B6C6; text-decoration:none;' href='" +
        response["articles"][i].url +
        "'><h5 st >" +
        response["articles"][i].title +
        "</h5></a>\
          <p style='color:#A0B6C6;'>" +
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
