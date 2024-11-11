if (window.location.pathname == '/auth/signup') {
    $('#signupForm').on('submit', (e) => {
        e.preventDefault();

        const data = {
            name: $('#name').val(),
            username: $('#username').val(),
            email: $('#email').val(),
            password: $('#password').val()
        }

        $.ajax({
            url: "/auth/signup",
            type: "POST",
            dataType: 'json',
            data: data,

            success: function (response) {
                if (response.response == 'success') {
                    window.location.href="/auth/login"
                }
            },
            error: function (error) {
                console.log(error)
            }
        })
    })
}