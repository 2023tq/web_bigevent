var layer = layui.layer
var form = layui.form

$(function () {

  form.verify({
    newPwd: function (val) {
      if (val === $('[name=oldPwd]').val()) {
        return '新密码不能和原密码相同！'
      }
    }
    , rePwd: function (val) {
      if (val !== $('[name=newPwd]').val()) {
        return '两次密码输入不一致！'
      }
    }
    , pass: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ]


  })

  $('.layui-form').submit(function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST'
      , url: '/my/updatepwd'
      , data: $(this).serialize()
      , success: (res) => {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }

        layer.msg(res.message)
        $('.layui-form')[0].reset()
      }
    })
  })
})