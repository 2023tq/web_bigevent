$(function () {

  var layer = layui.layer
  var form = layui.form


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

  initEditor()

  // 1. 初始化图片裁剪器
  var $image = $('#image')

  // 2. 裁剪选项
  var options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview'
  }

  // 3. 初始化裁剪区域
  $image.cropper(options)

  $('#choose').click(() => {
    $('[type=file]').click()
  })

  $('[type=file]').change((e) => {

    console.log('choose');
    var file = e.target.files[0]
    var newImgURL = URL.createObjectURL(file)
    $image
      .cropper('destroy')      // 销毁旧的裁剪区域
      .attr('src', newImgURL)  // 重新设置图片路径
      .cropper(options)        // 重新初始化裁剪区域
  })

  var state = '已发布'

  $('.save').click(() => {
    state = '草稿'
  })

  $('form').submit(function (e) {

    e.preventDefault()

    var fd = new FormData($('form')[0])


    fd.append('state', state)

    $image
      .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 400,
        height: 280
      })
      .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
        // 得到文件对象后，进行后续的操作
        fd.append('cover_img', blob)

        // fd.forEach(function (v, k) {
        //   console.log(k, v);
        // })
      })



    pub(fd)
  })

  function pub(fd) {

    $.ajax({
      method: 'POST',
      url: '/my/article/add',
      data: fd,
      contentType: false,
      processData: false,
      error: function () {
        return layer.msg('发布文章失败！')
      },
      success: (res) => {
        if (res.status !== 0) {
          console.log('11');
          return layer.msg('发布文章失败！')
        }
        layer.msg('发布文章成功！')
        location.href = '/article/article_list.html'
      }
    })

  }




})