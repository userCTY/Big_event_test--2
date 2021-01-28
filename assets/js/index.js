$(function () {
    //功能1 获取用户数据渲染用户名及头像
    getUser()


    //功能2 实现退出功能
    $('#tuichu').on('click', function () {
        layer.confirm('确认退出?', { icon: 3, title: '提示' }, function (index) {
            //do something
            localStorage.removeItem('token')
            location.href = '/login.html'
            layer.close(index);
        });
    })
})

let layer = layui.layer
let form = layui.form

function getUser() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('获取用户信息失败!')
            }
            // layer.msg('获取用户信息成功!')
            renderAvatar(res.data)
        }
    })
}

function renderAvatar(user) {
    let uname = user.nickname || user.username
    $('#welcome').html('欢迎 &nbsp;' + uname)
    if (user.user_pic !== null) {
        //显示头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.head').hide()
    } else {
        //渲染文字头像
        let first = uname[0].toUpperCase()
        $('.layui-nav-img').hide()
        $('.head').html(first).show()
    }
}