$(initInquiryForm);
function initInquiryForm() {
  $("input,textarea").jqBootstrapValidation({
	preventSubmit: true,
    submitError: function($form, event, errors) {
      $('#validationFailed').modal("show");
    },
    submitSuccess: function($form, event) {
      event.preventDefault();
      $('#waitSending').removeClass("hide");
      $.ajax({
        url: '/inquiry.post',
        type: 'POST',
        dataType: 'text',
        data: $('#inquiryForm input, textarea').serialize(),
        success: function() {
          $('#messageSent').modal("show");
        },
        error: function() {
          $('#sendingFailed').modal("show");
        }
      });
      $('#waitSending').addClass("hide");
      $('#inquiryForm').trigger("reset");
    }
  });
}
