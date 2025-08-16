$(document).ready(() => {
  $(".btn").click(function () {
    const images = [
      "images/1.jpg",
      "images/2.jpg",
      "images/3.jpg",
      "images/4.jpg",
      "images/5.jpg",
      "images/6.jpg",
      "images/7.jpg",
      "images/8.jpg",
    ];
    const content = $("#content");
    let buttonText = $(this).val().toLowerCase();
    let html = null;
    switch (buttonText) {
      case "about":
        html = `
          <div class="about-content">
        <p>The cat pressed the red button, thinking it was a toy.</p>
        <p>Now the moon blinks every night.</p>
          </div>
        `;
        content.addClass("content").hide().html(html).fadeIn(500);
        if (!$(".submenu").is(":hidden")) {
          $(".submenu").slideUp(300);
        }
        break;
      case "gallery":
        const galleryIndex = 0;
        html = `
          <div class="gallery">
        <img class="gallery-nav" data-dir="left" width="50" height="50" src="images/left.png" />
        <img class="gallery-img" width="300" src="${images[galleryIndex]}" />
        <img class="gallery-nav" data-dir="right" width="50" height="50" src="images/right.png" />
          </div>
        `;
        content.addClass("content").hide().html(html).fadeIn(500);
        content.find(".gallery-nav").click(() => {
          const img = content.find(".gallery-img");
          let currentIndex = images.indexOf(img.attr("src"));
          const dir = $(this).data("dir");
          currentIndex =
            dir === "left"
              ? (currentIndex - 1 + images.length) % images.length
              : (currentIndex + 1) % images.length;
          img.attr("src", images[currentIndex]);
        });

        if (!$(".submenu").is(":hidden")) {
          $(".submenu").slideUp(300);
        }
        break;
      case "services":
        content.hide();
        $(".submenu").slideToggle(300);
        break;
      case "complain":
        let formData = { name: "", email: "", message: "" };

        function renderForm() {
          html = `
            <label>
              Name: <input type="text" id="name" value="${formData.name}" />
            </label>
            <label>
              Email: <input type="email" id="email" value="${formData.email}" />
            </label>
            <label>
              Message: <textarea id="message" rows="3">${formData.message}</textarea>
            </label>
            <button id="send">Send</button>
          `;
          content.addClass("content complain").hide().html(html).fadeIn(500);
        }

        function renderComplain() {
          const complainContent = `
            <p>Name: ${formData.name}</p>
            <p>Email: ${formData.email}</p>
            <p>Message: ${formData.message}</p>
            <button id="edit">Edit complain</button>
          `;
          content.html(complainContent);
        }

        renderForm();

        content.on("click", "#send", () => {
          formData.name = $("#name").val();
          formData.email = $("#email").val();
          formData.message = $("#message").val();
          if (formData.name && formData.email && formData.message) {
            renderComplain();
          } else {
            alert("Please fill in all fields.");
          }
        });

        content.on("click", "#edit", () => {
          renderForm();
          $("#name").val(formData.name);
          $("#email").val(formData.email);
          $("#message").val(formData.message);
        });

        if (!$(".submenu").is(":hidden")) {
          $(".submenu").slideUp(300);
        }
        break;
    }
  });
});
