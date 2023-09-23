window.addEventListener("DOMContentLoaded", function() {    
  var form = document.getElementById("contact-form");
  var button = document.getElementById("contact-form-button");
  var status = document.getElementById("contact-form-status");
  var captchaImg = document.getElementById('spamschutz');
  var captchaAudio = document.getElementById('spamschutzAudio');

  function formSubmitSuccess() {
    form.reset();
    status.innerHTML = "Danke! Das Kontaktformular wurde erfolgreich übermittelt.";
    button.innerHTML = "Senden";
  }

  function formSubmitError(errorCode, response) {
    var responseData = JSON.parse(response)
    console.log(responseData)
    if (responseData.error == "captcha verify failed") {
      status.innerHTML = "Spamschutz-Überprüfung fehlgeschlagen. Bitte versuche es erneut";
    } else {
      status.innerHTML = "Hoppla! Beim Absenden der Formulardaten ist ein Problem aufgetreten. Bitte versuche es erneut";
    }
    button.innerHTML = "Senden";
  }

  function captchaLoadSuccess(response) {
    var responseData = JSON.parse(response)
    form.elements['code'].value = responseData.code;
    captchaImg.src = responseData.visual_aid;
    captchaAudio.src = responseData.audio_aid;
  }

  function captchaLoadError() {
    status.innerHTML = "Hoppla! Der Anti-Spam-Schutz konnte nicht initialisiert werden.";
  }
  
  if (captchaImg) {
    captchaImg.addEventListener('click', function() {
      captchaAudio.play();
    });
  }

  if (form) {
    // load captcha
    var data = new FormData(form);
    ajax('GET', 'https://fdv3wodlk2mtxhxnyqdmtneybi0peaol.lambda-url.eu-central-1.on.aws/', data, captchaLoadSuccess, captchaLoadError);

    // handle the form submission event
    form.addEventListener("submit", function(ev) {
      ev.preventDefault();
      button.innerHTML = "Senden läuft...";

      var data = new FormData(form);
      ajax(form.method, form.action, data, formSubmitSuccess, formSubmitError);
    });
  }  
});

// helper function for sending an AJAX request

function ajax(method, url, data, success, error) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader("Accept", "application/json");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function() {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;
    if (xhr.status === 200) {
      success(xhr.response, xhr.responseType);
    } else {
      error(xhr.status, xhr.response, xhr.responseType);
    }
  };
  xhr.send(JSON.stringify(Object.fromEntries(data)));
}
