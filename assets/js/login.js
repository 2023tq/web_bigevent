$(function () {

  $('#link-registry').on('click', function () {
    $('.login').hide()
    $('.registry').show()

  })


  $('#link-login').on('click', function () {
    $('.login').show()
    $('.registry').hide()

  })

  var form = layui.form

  var layer = layui.layer

  form.verify({
    pass: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ],

    repass: function (val) {
      var pass = $('.registry [name=password]').val()

      if (pass !== val) return '两次密码输入不一致！'
    }
  })



  $('#re_form').on('submit', function (e) {

    e.preventDefault()

    $.post(
      '/api/reguser',
      { username: $('#re_form [name=username]').val(), password: $('#re_form [name=password]').val() }, function (res) {
        layer.msg(res.message)
        $('#link-login').click()
      }
    )
  })

  $('#login_form').submit(function (e) {

    e.preventDefault()

    $.ajax({
      url: '/api/login',
      method: 'POST',
      data: $(this).serialize(),
      success: function (res) {

        if (res.status !== 0) {
          return layer.msg(res.message)
        }

        localStorage.setItem('token', res.token)

        location.href = '/index.html'
      }
    })
  })

})