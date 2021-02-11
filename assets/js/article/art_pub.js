$(function () {
    //功能1 获取分类列表并渲染
    getFenLei()

    // 初始化富文本编辑器
    initEditor()

    //封面
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    //功能2 实现选择图片操作
    $('.btn_file').on('click', function () {
        $('#file').click()
    })


    //将选中的图片放入剪裁区域
    $('#file').on('change', function (e) {
        let files = e.target.files
        if (files.length === 0) {
            return
        }
        let newImgURL = URL.createObjectURL(files[0])
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    //功能2 区分发布于草稿
    let thisData = '已发布'
    $('#btn_caogao').on('click', function () {
        thisData = '草稿'
    })

    //功能3 处理FormData数据
    $('#form_pub').on('submit', function (e) {
        e.preventDefault()
        let fd = new FormData($(this)[0])

        fd.append('state', thisData)
        $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {
                // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                // 5. 将文件对象，存储到 fd 中
                fd.append('cover_img', blob)
                // 6. 发起 ajax 数据请求
                getFaBu(fd)
            })

    })

})
let layer = layui.layer
let form = layui.form

function getFenLei() {
    $.ajax({
        method: 'GET',
        url: '/my/article/cates',
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('获取文章分类列表失败!')
            }
            let htmlStr = template('tpl_fenlei', res)
            $('[name=cate_id]').html(htmlStr)
            form.render()
        }
    })
}

function getFaBu(fd) {
    $.ajax({
        method: 'POST',
        url: '/my/article/add',
        data: fd,
        contentType: false,
        processData: false,
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('发布文章失败!')
            }
            layer.msg('发布文章成功!', { time: 1000 }, function () {
                location.href = '/article/art_list.html'
            })
        }
    })
}