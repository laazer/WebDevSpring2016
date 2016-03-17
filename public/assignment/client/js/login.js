$(document).ready(function(){
    $('#btn-login').on('click', function(event) {
        event.preventDefault(); // To prevent following the link (optional)
        location.href = "./profile.html";
    });
});