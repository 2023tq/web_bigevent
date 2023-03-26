$(function () {
  var layer = layui.layer
  var form = layui.form
  var laypage = layui.laypage

  template.defaults.imports.dataFormat = function (data) {
    const dt = new Date(data)

    var y = dt.getFullYear()
    var m = padZero(dt.getMonth() + 1)
    var d = padZero(dt.getDate())

    var hh = padZero(dt.getHours())
    var mm = padZero(dt.getMinutes())
    var ss = padZero(dt.getSeconds())

    return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
  }

  // 定义补零的函数
  function padZero(n) {
    return n > 9 ? n : '0' + n
  }

  var q = {
    pagenum: 1, // 页码值，默认请求第一页的数据
    pagesize: 2, // 每页显示几条数据，默认每页显示2条
    cate_id: '', // 文章分类的 Id
    state: '' // 文章的发布状态
  }
  getList()

  function getList() {
    $.ajax({
      method: 'GET',
      url: '/my/article/list',
      data: q,
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('获取文章列表失败！')
        }

        var list = template('table', res)
        $('tbody').html(list)

        pageRender(res.total)

      }
    })
  }


  function pageRender(total) {

    laypage.render({
      elem: 'page',
      count: total,
      limit: q.pagesize, // 每页显示几条数据
      curr: q.pagenum, // 设置默认被选中的分页
      layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
      limits: [2, 3, 5, 10],
      jump: function (obj, first) {
        q.pagenum = obj.curr
        q.pagesize = obj.limit

        if (!first) {
          getList()
        }
      }

    })

  }


  CaFilter()
  function CaFilter() {
    $.ajax({
      method: 'GET',
      url: '/my/article/cates',
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('获取分类数据失败！')
        }
        var ca = template('lay-filter', res)
        $('[name=cate_id]').html(ca)

        form.render()
      }
    })
  }

  $('#ca_filter').on('submit', function (e) {
    e.preventDefault()

    q.cate_id = $('[name=cate_id]').val()
    q.state = $('[name=state]').val()

    getList()
  })


  $('tbody').on('click', '.btn-delete', function () {

    var len = $('.btn-delete').length

    var id = $(this).attr('data-id')

    layer.confirm('确定是否要删除?', { icon: 3, title: '提示' }, function (index) {
      //do something
      $.ajax({
        method: 'GET',
        url: '/my/article/delete/' + id,
        success: (res) => {
          if (res.status !== 0) {
            return layer.msg('删除文章失败！')
          }
          layer.msg('删除文章成功！')
          if (len === 1) {
            q.pagenum = q.pagenum === 1 ? 1 : pagenum--
          }
          getList()
        }
      })

      layer.close(index);
    });

  })

})