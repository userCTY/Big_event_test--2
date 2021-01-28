$(function () {

    let layer = layui.layer
    let form = layui.form

    //功能1 实现登录/注册表单之间的相互切换
    $('#reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    $('#login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    //功能2 完成账号/密码验证
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function (value) {
            if (value !== $('.reg-box [name=password]').val()) {
                return '两次输入密码不一致!'
            }
        }
    })

    //功能3 完成注册操作
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('注册失败!')
                }
                layer.msg('注册成功!')
                $('#login').click();
            }
        })
    })

    //功能4 完成登录操作
    $('#form_login').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res){
                if(res.status !== 0){
                    return layer.msg('登录失败!')
                }
                layer.msg('登录成功!')
                localStorage.setItem('token',res.token)
                location.href = '/index.html'
            }
        })
    })
})