var layer = layui.layer
var form = layui.form

$(function () {

  form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return '昵称长度必须在 1 ~ 6 个字符之间！'

      }
    }
  })

  initUserInfo()


  $('#reset').click((e) => {
    e.preventDefault()
    initUserInfo()
  })


  $('.layui-form').submit(function (e) {

    e.preventDefault()

    $.ajax({
      method: 'POST',
      url: '/my/userinfo',
      data: $(this).serialize(),
      success: function (res) {

        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        window.parent.getUserInfo()
      }
    })
  })

})

function initUserInfo() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    success: function (res) {
      if (res.status !== 0) {
        return layer.msg('res.message')

      }
      form.val('filter', res.data)
    }
  })
}