$('#login-button').click(function (event) {
    let userName = document.getElementById("userName").value;
    let pwd = document.getElementById("pwd").value;
    if (userName == "文翊" && pwd == "0801") {
        $('#h').text("欢迎你回来！");
        event.preventDefault();
        $('form').fadeOut(500);
        $('.wrapper').addClass('form-success');
        setTimeout(function () {
            location.href = "ready.html";
        }, 4000);
    } else {
        alert("用户名和密码是你的名字和生日！");
    }
});
