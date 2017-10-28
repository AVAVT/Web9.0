$("#test_form").on("submit", event => {
  event.preventDefault();
  $.ajax({
    url: "/api/answer",
    type: "post",
    data: $("#test_form").serialize()
  })
    .then(result => {
      $("#success_notification")
        .html(`Test completed! Your score is ${result.score}.`)
        .removeClass("d-none");
        $("html, body").animate({ scrollTop: 0 }, "fast");
    })
    .fail(err => {
      alert("An error occured, please try again later");
      console.error(err);
    });
});
