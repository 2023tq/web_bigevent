var layer = layui.layer

$(function () {
  getUserInfo()

  $('#logout').on('click', () => {

    layer.confirm('请确认是否退出?',
      { icon: 3, title: '提示' },
      function (index) {
        //do something
        localStorage.removeItem('token')
        location.href = '/login.html'

        layer.close(index);
      });

  })
})



function getUserInfo() {
  $.ajax({
    url: '/my/userinfo',

    method: 'Get',

    // headers: {
    //   Authorization: localStorage.getItem('token') || ''
    // },

    success: function (res) {
      if (res.status !== 0) {
        return layer.msg(res.message)
      }

      render(res.data)
    },

    // complete: (res) => {

    //   if (res.responseJSON.status === 1) {
    //     localStorage.removeItem('token')
    //     location.href = '/login.html'
    //   }
    // }
  })
}

function render(data) {

  const name = data.username || data.nickname

  $('#welcome').html('欢迎 &nbsp;&nbsp;' + name)

  if (data.user_pic) {
    $('.layui-nav-img')
      .attr('src', data.user_pic)
      .show()

    $('.text-avatar').hide()

  } else {
    $('.layui-nav-img').hide()

    const n = name[0].toUpperCase()
    $('.text-avatar').html(n).show()
  }

}