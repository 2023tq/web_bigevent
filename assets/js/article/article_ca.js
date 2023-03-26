var layer = layui.layer
var form = layui.form

$(function () {

  getList()

  var indexAdd = ''
  $('#add').click(() => {
    indexAdd = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '添加文章分类',
      content: $('#template-add').html()
    });
  })

  $('body').on('submit', '#form-add', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST'
      , url: '/my/article/addcates'
      , data: $('#form-add').serialize()
      , success: function (res) {
        if (res.status !== 0) {
          console.log(res);
          return layer.msg('新增分类失败！')
        }
        getList()
        layer.close(indexAdd)
      }
    })
  })

  var indexEdit = ''
  $('tbody').on('click', '.edit', function () {

    indexEdit = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '修改文章分类',
      content: $('#template-edit').html()
    });

    var id = $('.edit').attr('data-id')

    $.ajax({
      method: 'GET'
      , url: '/my/article/cates/' + id
      , success: function (res) {

        form.val('form-edit', res.data)
      }
    })

  })

  $('body').on('submit', '#form-edit', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/article/updatecate',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          layer.msg(res.message)
        }
        getList()
        layer.close(indexEdit)
      }
    })
  })

  $('tbody').on('click', '.delete', function () {

    layer.confirm('确定要删除此分类?', { icon: 3, title: '提示' }, function (index) {
      //do something
      var id = $(this).attr('data-id')
      $.ajax({
        method: 'GET',
        url: '/my/article/deletecate/' + id,
        success: function (res) {
          if (res.status !== 0) {
            layer.msg(res.message)
          }
        }
      })
      layer.close(index);
    })


  })


})

function getList() {
  $.ajax({
    method: 'GEt',
    url: '/my/article/cates',
    success: (res) => {
      var list = template('table', res)
      $('tbody').html(list)
    }
  })

}