$(function () {
    //功能1 获取文章分类列表并渲染
    getFenLei()

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
            // layer.msg('获取文章分类列表成功!')
            let htmlStr = template('tpl_leib', res)
            $('tbody').html(htmlStr)
        }
    })
}

//功能2 实现添加类别功能
let tanChu1 = null
$('#cont_tj').on('click', function () {
    tanChu1 = layer.open({
        type: 1,
        area: ['500px', '250px'],
        title: '添加文章分类',
        content: $('#tpl_tanc').html()
    });
    getTianJia()
})

function getTianJia() {
    $('body').on('submit', '#cont_form', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('添加类别失败!')
                }
                getFenLei()
                layer.msg('添加类别成功!')
                layer.close(tanChu1)
            }
        })
    })
}

//功能3 实现删除功能
$('tbody').on('click', '.btn_delete', function () {
    let id = $(this).data('id')
    // console.log(id);
    layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
        //do something
        $.ajax({
            method: 'GET',
            url: '/my/article/deletecate/' + id,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('删除文章分类失败!')
                }
                layer.msg('删除成功!')
                layer.close(index);
                getFenLei()
            }
        })
    })
})

//功能4 实现编辑功能
let tanChu2 = null
$('tbody').on('click', '.btn_edteb', function () {
    let id = $(this).data('id')
    tanChu2 = layer.open({
        type: 1,
        area: ['500px', '250px'],
        title: '编辑文章分类',
        content: $('#tpl_bianj').html()
    })
    getBianJi(id)
})

function getBianJi(id) {
    $.ajax({
        method: 'GET',
        url: '/my/article/cates/' + id,
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('获取文章分类列表失败!')
            }
            form.val('bianj_form', res.data)
        }
    })
}

$('body').on('submit','#bianj_form',function(e){
    e.preventDefault()
    $.ajax({
        method: 'POST',
        url: '/my/article/updatecate',
        data: $(this).serialize(),
        success: function(res){
            if(res.status !== 0){
                return layer.msg('修改失败!')
            }
            layer.msg('修改成功!')
            layer.close(tanChu2)
            getFenLei()
        }
    })
})