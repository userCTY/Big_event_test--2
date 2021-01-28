$(function(){
    let form = layui.form
    let layer = layui.layer
    //功能1 验证密码的合法性
    form.verify({
        pwd: [/^[\S]{6,12}$/ , '密码必须6到12位，且不能出现空格'],
        newPwd: function(value){
            if(value === $('[name=oldPwd]').val()){
                return '新旧密码不能相同!'
            }
        },
        rePwd: function(value){
            if(value !== $('[name=newPwd]').val()){
                return '两次输入密码不一致!'
            }
        }
    })

    //功能2 实现修改密码操作
    $('#form_pwd').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res){
                if(res.status !== 0){
                    return layer.msg('修改密码失败!')
                }
                layer.msg('修改密码成功!')
                $('#form_pwd')[0].reset()
            }
        })
    })
})