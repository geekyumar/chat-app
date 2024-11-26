if (window.location.pathname == '/auth/login') {
    $('#loginForm').on('submit', (e) => {
        e.preventDefault();

        const data = {
            username: $('#username').val(),
            password: $('#password').val()
        }

        $.ajax({
            url: "/auth/login",
            type: "POST",
            dataType: 'json',
            data: data,

            success: function (response) {
                if (response.response == 'login_success') {
                    window.location.href="/chat"
                }
            },
            error: function (error) {
                console.log(error)
            }
        })
    })
}